from flask import Flask, render_template, request
# request는 요청에 대한 정보에 접근할 수 있게 해준다.
# URL, IP, Cokkies 정보 등등
from extractors.indeed import extract_indeed_jobs
from extractors.wwr import extract_wwr_jobs
from extractors.remoteok import extract_remoteok_jobs

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

@app.route("/search")
def search():
    # request.args로 url의 정보에 접근할 수 있다.
    # .get으로 키에 해당하는 값을 가져올 수 있다.
    keyword = request.args.get("keyword")
    # print(keyword)
    indeed = extract_indeed_jobs(keyword)
    wwr = extract_wwr_jobs(keyword)
    remoteok = extract_remoteok_jobs(keyword)
    jobs = indeed + wwr + remoteok
    return render_template("search.html", keyword = keyword, jobs = jobs)

app.run("127.0.0.1")