from requests import get
from bs4 import BeautifulSoup
# 파이썬 파일을 따로 만들고 거기서 함수를 불러올 수도 있다.
from extractors.wwr import extract_wwr_jobs

jobs = extract_wwr_jobs("python")
print(jobs)