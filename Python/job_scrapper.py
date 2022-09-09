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

browser.get(f"{base_url}{search_term}")

soup = BeautifulSoup(browser.page_source, 'html.parser')
job_list = soup.find("ul", class_="jobsearch-ResultsList")
# recursive를 False로 하면 자식 내 요소는 찾지 않는다.
jobs = job_list.find_all('li', recursive=False)
for job in jobs:
    # None도 변수에 넣을 수 있는 데이터 타입이다.
    # None은 무언가가 없을 때 쓴다.

    zone = job.find("div", class_="mosaic-zone")
    if zone == None:
        print("job li")