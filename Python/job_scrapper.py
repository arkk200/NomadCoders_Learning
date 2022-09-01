from requests import get
from bs4 import BeautifulSoup

base_url = "https://weworkremotely.com/remote-jobs/search?term="
search_term = "python"
response = get(f"{base_url}{search_term}")
if response.status_code != 200:
    print("Can't request website")
else:
    # .test을 이용하여 웹페이지의 html 코드를 가져올 수 있다.
    soup = BeautifulSoup(response.text, 'html.parser')
    # 파이썬에는 이미 class라는 키워드가 있기에 class_ 라고 쓴다.
    jobs = soup.find_all('section', class_="jobs")

def say_hello(name, age):
    print(f"Hello {name}, u r {age} years old")

say_hello("lmj", 17)
# 이렇게 값을 직접적으로 넣을 수 있다.
# 그러면 순서에 값이 들어가지 않음
say_hello(age = 12, name = "nico")