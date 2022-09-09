from extractors.indeed import extract_indeed_jobs
from extractors.wwr import extract_wwr_jobs

keyword = input("What do you want to search for?")

indeed = extract_indeed_jobs(keyword)
wwr = extract_wwr_jobs(keyword)
jobs = indeed + wwr

# open은 파일 만들거나 읽을 수 있게 해준다.
# csv는 comma-separated-value라는 파일 포맷이다.
file = open(f"{keyword}.csv", 'w', encoding="utf-8") # w: writing
# 파일 포맷 이름 그대로 쉼표로 열을 구분한다.
file.write("Position,Company,Location,URL\n")

for job in jobs:
    file.write(f"{job['position']},{job['company']},{job['location']},{job['link']}\n")

file.close() 
