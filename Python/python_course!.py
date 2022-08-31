from random import randint

print("Welcome to Python Casino")
pc_choice = randint(1, 100)

playing = True

while playing:
    user_choice = int(input("Choose number (1-100): "))
    if user_choice == pc_choice:
        print("You won!")
        playing = False # 이겼다면 playing에 False를 대입해서 while문 빠져나옴
    elif user_choice > pc_choice:
        print("Lower!")
    elif user_choice < pc_choice:
        print("Higher!")