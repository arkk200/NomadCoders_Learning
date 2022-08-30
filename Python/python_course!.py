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