# pypi에 있는 라이브러리를 설치하면 이런식으로 쓸 수 있다.
from requests import get

websites = (
    "google.com",
    "airbnb.com",
    "https://twitter.com",
    "facebook.com",
    "https://youtube.com"
)

results = {}

for website in websites:
    if not website.startswith("https://"):
        website = f"https://{website}"
    response = get(website)
    if response.status_code == 200:
        results[website] = "OK"
    else:
        results[website] = "FAILED"
print(results)

# Response 옆에 숫자는 아래에 html status 코드를 보면 확인할 수 있다.
# https://developer.mozilla.org/ko/docs/Web/HTTP/Status