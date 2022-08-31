days_of_week = ["Mon", "Tue", "Wed", "Thur", "Fri"]

print(days_of_week)

# append는 리스트에 값을 뒤에서부터 추가해준다.
days_of_week.append("Sat")
print(days_of_week)

days_of_week.append("Sun")
print(days_of_week)

# remove는 특정값을 삭제해준다.
days_of_week.remove("Fri")
print(days_of_week)

# reverse는 리스트 요소의 순서를 뒤집는다.
days_of_week.reverse()
print(days_of_week)

# 인덱스로 데이터 접근
# 리스트는 0부터 숫자를 센다.
print(days_of_week[2]) # 3번째 요소가 출력된다.

# clear는 리스트의 전체 요소를 삭제한다.
days_of_week.clear()
print(days_of_week)

# 리스트엔 다양한 자료형을 담을 수 있다. 심지어 리스트안에 리스트도 담을 수 있음
various_types = [1, 2, 3, True, False, "hi", "Black", [1, 2, 3, [False, True]]]