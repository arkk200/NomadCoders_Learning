from bs4 import BeautifulSoup
# webdriver로 파이썬에서 브라우저를 시작할 수 있다.
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
def get_page_count(keyword):
    browser = webdriver.Chrome(options=options)
    base_url = "https://kr.indeed.com/jobs?q="
    browser.get(f"{base_url}{keyword}")
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    pagination = soup.find("ul", class_="pagination-list")
    # 페이지 바가 없을 땐 페이지가 하나라는 의미니 1을 반환한다.
    if pagination == None:
        return 1
    pages = pagination.find_all("li", recursive=False)
    count = len(pages)
    if count >= 5:
        return 5
    else:
        return count
def extract_indeed_jobs(keyword):
    pages = get_page_count(keyword)
    print("Found", pages, "pages")
    results = []
    for page in range(pages):
        browser = webdriver.Chrome(options=options)
        base_url = "https://kr.indeed.com/jobs"
        final_url = f"{base_url}?q={keyword}&start={page * 10}"
        print("Requesting", final_url)
        browser.get(final_url)
        soup = BeautifulSoup(browser.page_source, 'html.parser')
        job_list = soup.find("ul", class_="jobsearch-ResultsList")
        # recursive를 False로 하면 자식 내 요소는 찾지 않는다.
        jobs = job_list.find_all('li', recursive=False)
        for job in jobs:
            zone = job.find("div", class_="mosaic-zone")
            if zone == None:
                # select는 CSS형식으로 태그를 가져올 수 있게 해준다.
                # select ≒ find_all, select_one ≒ find
                anchor = job.select_one("h2 a")
                title = anchor['aria-label']
                link = anchor['href']
                company = job.find("span", class_="companyName")
                location = job.find("div", class_="companyLocation")
                job_data = {
                    'link': f"https://kr.indeed.com{link}",
                    # csv 파일로 저장히가에 쉽표를 없앰
                    'company': company.string.replace(',', ' '),
                    'location': location.string.replace(',', ' '),
                    'position': title.replace(',', ' ')
                }
                results.append(job_data)
        for result in results:
            print(result, "\n/////////////////////////\n")
    return results