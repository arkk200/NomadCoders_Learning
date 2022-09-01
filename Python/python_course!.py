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
    status_code = response.status_code

    # 로그인 성공 등
    if status_code == 200:
        results[website] = "OK"
    # 회원가입 성공 / 글 작성 성공 등
    elif status_code == 201:
        results[website] = "Created"
    # 필수로 요구하는 Query Parameter를 누락했을 때 등
    elif status_code == 400:
        results[website] = "Bad Request"
    # 로그인하지 않은 상태에서 자신의 사용자 정보 요청 등
    elif status_code == 401:
        results[website] = "Unauthorized"
    # 로그인했지만 관리자용 API를 요청한 경우
    elif status_code == 403:
        results[website] = "Forobidden"
    # 존재하지 않는 Route에 요청을 보냈을 때
    elif status_code == 404:
        results[website] = "Not Found"
    # 어떤 리소스에 대해서 수정/삭제를 막고 가져오기만 허용하고 싶을 때
    elif status_code == 405:
        results[website] = "Method Not Allowed"
    # 중복 회원가입 요청이 발생했을 때
    elif status_code == 409:
        results[website] = "Conflict"
    # 전달받은 파일의 크기가 정의한 값보다 클 때
    elif status_code == 413:
        results[website] = "Payload Too Large"
    # 데이터베이스 오류, 예외처리하지 않은 오류 발생
    elif status_code == 500:
        results[website] = "Bad Gateway"
    # 기타
    else:
        results[website] = "ETC"

print(results)

# Response 옆에 숫자는 아래에 html status 코드를 보면 확인할 수 있다.
# https://developer.mozilla.org/ko/docs/Web/HTTP/Status