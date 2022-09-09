from requests import get
from bs4 import BeautifulSoup

def extract_wwr_jobs(keyword):
    base_url = "https://weworkremotely.com/remote-jobs/search?term="
    response = get(f"{base_url}{keyword}")
    if response.status_code != 200:
        print("Can't request website")
    else:
        results = []
        soup = BeautifulSoup(response.text, 'html.parser')
        jobs = soup.find_all('section', class_="jobs")
        for job_section in jobs:
            job_posts = job_section.find_all('li')
            job_posts.pop(-1)
            for post in job_posts:
                anchors = post.find_all('a')
                anchor = anchors[1]
                link = anchor['href']
                company, kind, region = anchor.find_all('span', class_="company")
                title = anchor.find('span', class_="title")
                # 데이터를 딕셔너리로 저장 후
                job_data = {
                    'link': f"https://weworkremotely.com{link}",
                    'company': company.string.replace(',', ' '),
                    'location': region.string.replace(',', ' '),
                    'position':  title.string.replace(',', ' ')
                }
                # 리스트에 추가해준다.
                results.append(job_data)
        print(" weworkremotely ".center(70, '-'))
        for result in results:
            print('link:', result['link'] + 
                ', company:', result['company'] + 
                ', location:', result['location'] + 
                ', position:', result['position'])
            print("///////////")
        return results