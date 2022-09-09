from bs4 import BeautifulSoup
from selenium import webdriver;

def extract_remoteok_jobs(term):
    base_url = f"https://remoteok.com/remote-{term}-jobs"
    browser = webdriver.Chrome()
    browser.get(base_url)
    soup = BeautifulSoup(browser.page_source, "html.parser")
    table = soup.find('table', id="jobsboard")
    table_rows = table.find_all('tr')
    table_rows.pop(0)
    filtered_rows = []
    for table_row in table_rows:
        if not 'job' in table_row["class"]:
            continue
        filtered_rows.append(table_row)

    # Find Information Code
    results = []

    for info in filtered_rows:
        # Company Table Data
        company = info.find('td', class_="company")
        link = company.find('a', itemprop = "url")
        company = company.find('h3', itemprop="name")
        location = info.find('div', class_="location")
        title = link.find('h2')
        link = link["href"]

        job_data = {
                'link': f"https://remoteok.com/{link}",
                # csv 파일로 저장히가에 쉽표를 없앰
                'company': company.string.strip().replace(',', ' '),
                'location': location.string.replace(',', ' '),
                'position': title.string.strip().replace(',', ' ')
        }
        results.append(job_data)
    browser.close()
    print(" remoteok ".center(70, '-'))
    for result in results:
        print('link:', result['link'] + 
            ', company:', result['company'] + 
            ', location:', result['location'] + 
            ', position:', result['position'])
        print("///////////")
    return results