from requests import get
from bs4 import BeautifulSoup
# 파이썬 파일을 따로 만들고 거기서 함수를 불러올 수도 있다.
from extractors.wwr import extract_wwr_jobs
# webdriver로 파이썬에서 브라우저를 시작할 수 있다.
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

browser = webdriver.Chrome(options=options)

base_url = "https://kr.indeed.com/jobs?q="
search_term = "python"

# indeed라는 웹사이트가 request를 막았기에 대신에 셀리니움을 쓴다.
browser.get(f"{base_url}{search_term}")

# .page_source로 페이지의 html을 가져올 수 있다.
print(browser.page_source)

# if response.status_code != 200:
#     print("Can't request page :", response.status_code)
# else:
#     soup = BeautifulSoup(response.text, 'html.parser')
#     job_list = soup.find("ul", class_="jobsearch-ResultsList")
#     # recursive를 False로 하면 자식 내 요소는 찾지 않는다.
#     jobs = job_list.find_all('li', recursive=False)
#     for job in jobs:
#         print(job)
#         print("////////////////")