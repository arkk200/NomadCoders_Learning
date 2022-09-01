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
    for job_section in jobs:
        job_posts = job_section.find_all('li')
        job_posts.pop(-1) # 뒤에 항목은 view-all 버튼이므로 삭제함
        for post in job_posts:
            print(post)
            print("//////////////")