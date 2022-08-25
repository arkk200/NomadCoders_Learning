def say_hello(user_name, user_age): # 변수처럼 쓰면 된다. 이게 전달인자(parameter)이다.
    # 쉼표(,)를 이용하여 문자열 사이에 데이터를 삽입할 수 있다.
    print("hello", user_name)
    print("you are", user_age, "years old")

# 함수에 들어가는 데이터를 인자(argument)라고 한다.
say_hello("arkk", 12)

# 인자가 전달되는 순서가 중요하다.
say_hello(20, "john", 1)