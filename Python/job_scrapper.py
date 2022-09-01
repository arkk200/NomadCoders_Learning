from requests import get

base_url = "https://weworkremotely.com/remote-jobs/search?term="
search_term = "python"
# https://weworkremotely.com/remote-jobs/search?term=
response = get(f"{base_url}{search_term}")
if response.status_code != 200:
    print("Can't request website")
else:
    # .test을 이용하여 웹페이지의 html 코드를 가져올 수 있다.
    print(response.text)