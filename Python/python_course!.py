# 튜플이나 리스트를 만들 때 복수형을 쓴다.

websites = (
    "google.com",
    "airbnb.com",
    "https://twitter.com",
    "facebook.com",
    "https://youtube.com"
)

for website in websites:
    # not은 참, 거짓을 반전시킨다.
    # 이 조건문은 'https://' 로 시작하지 않는 url에만 작동한다.
    if not website.startswith("https://"):
        website = f"https://{website}"
    print(website)
print(websites)