from flask import Flask

app = Flask("JobScrapper")

# @가 붙은 이걸 decorator라고 한다.
# decorator 밑에 바로 함수가 작성돼 있어야 한다.
@app.route("/")
def home():
    # Flask는 이렇게 return만 해주면 page에 띄워준다.
    return 'Hello, Flask!'

app.run("127.0.0.1")