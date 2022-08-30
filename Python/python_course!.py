# input은 하나의 값만 받는다.
age = int(input("How old are you?"))

print("user answer", age)

# type()은 변수의 type을 알려주는 함수이다.
print(type(age))

# 입력 받은 값을 숫자와 비교하기 위해서 입력 받은 string을 int로 바꿔줘야한다.
if age < 18:
    print("You can't drink.")
    # and 연산자는 두 조건 중 하나라도 거짓이면 거짓이다.
elif age >= 18 and age <= 35:
    print("You drink beer!")
    # or 연산자는 두 조건 중 하나라도 참이면 참이다.
elif age == 60 or age == 70:
    print("Birithday party!")
elif age >= 75:
    print("Dangerous to drink beer")
else:
    print("Go ahead!")

True and True == True
True and False == False
False and True == False
False and False == False

True or True == True
True or False == True
False or True == True
False or False == False