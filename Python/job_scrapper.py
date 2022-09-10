from flask import Flask, render_template, request, redirect, send_file
# request는 요청에 대한 정보에 접근할 수 있게 해준다.
# URL, IP, Cokkies 정보 등등
from extractors.indeed import extract_indeed_jobs
from extractors.wwr import extract_wwr_jobs
from extractors.remoteok import extract_remoteok_jobs
from file import save_to_file

app = Flask("JobScrapper")

# @가 붙은 이걸 decorator라고 한다.
# decorator 밑에 바로 함수가 작성돼 있어야 한다.
@app.route("/")
def home():
    # Flask는 이렇게 return만 해주면 page에 띄워준다.
    # templates라는 폴더내에 (꼭 templates폴더여야함)
    # html 파일을 만들어서 반환해줄 수 도 있다.
    # 뒤에 인자로 html에 변수를 보낼 수 있다.
    # 즉, 변수를 여러개 보낼 수 있다.
    return render_template("home.html", name="nico")

db = {}

@app.route("/search")
def search():
    # request.args로 url의 정보에 접근할 수 있다.
    # .get으로 키에 해당하는 값을 가져올 수 있다.
    keyword = request.args.get("keyword")
    print(keyword) # 사용자가 아무것도 작성하지 않았을 때 keyword는 None이다.
    if keyword == None:
        # return redirect로 페이지를 이동시킬 수 있다.
        return redirect("/")
    if keyword in db: # db에 있는 키워드라면 db에서 정보를 가져옴
        jobs = db[keyword]
    else: # db에 없는 키워드라면 extract함
        indeed = extract_indeed_jobs(keyword)
        wwr = extract_wwr_jobs(keyword)
        remoteok = extract_remoteok_jobs(keyword)
        jobs = indeed + wwr + remoteok
        db[keyword] = jobs
    return render_template("search.html", keyword = keyword, jobs = jobs)

@app.route('/export')
def export():
    keyword = request.args.get("keyword")
    if keyword == None: # 얘도 키워드가 없으면 홈으로 redirect한다.
        return redirect("/")
    if keyword not in db: # 검색한 키워드가 아니라면 검색창으로 이동해줌
        return redirect(f"/search?keyword={keyword}")
    # save_to_file로 서버의 파일 시스텝에 파일을 저장
    save_to_file(keyword, db[keyword])
    # send_file()을 반환한다.
    # as_attachment를 True로 하면 다운로드할 수 있게 해준다.
    return send_file(f"{keyword}.csv", as_attachment=True)


app.run("127.0.0.1")