from random import randint
# 외부 라이브러리를 불러오려면 import 라는 명령어를 써야한다.

user_choice = int(input("Choose number:"))
# randint(a, b)는 a와 b사이에 정수 중 임의의 값 하나를 반환해준다.
pc_choice = randint(1, 50)

if user_choice == pc_choice:
    print("You won!")
elif user_choice > pc_choice:
    print("Lower! Computer chose", pc_choice)
elif user_choice < pc_choice:
    print("Higher! Computer chose", pc_choice)

# while은 조건이 안 맞을 때까지 계속 출력하는 if 같은거다

distance = 0
# 0부터 1씩 증가하면서 출력하다가 값이 20이상이면 반복문을 끝낸다.
while distance < 20:
    print("I'm running:", distance, "km")
    distance = distance + 1