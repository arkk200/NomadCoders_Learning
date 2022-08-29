my_name = "arkk"
my_age = 17
my_color_eyes = "dark_brown"

# f"문자열{변수명}" 형태로 문자열 안에 변수를 집어 넣을 수 있다.
# f를 빼면 중괄호, 변수명이 출력된다.
print(
    f"Hello, I'm {my_name}, I have {my_age} years in the earth, {my_color_eyes} is my eye color"
)

def make_juice(fruit):
    return f"{fruit} +🥤"
    # 함수에서 return을 만나면 값을 반환하고 빠져나온다.
    print("asdfasdfasdfasdf")

def add_ice(juice): 
    return f"{juice}+🧊"

def add_sugar(iced_juice):
    return f"{iced_juice}+🍬"

juice = make_juice("🍎")
print(juice)
cold_juice = add_ice(juice)
print(cold_juice)
perfect_juice = add_sugar(cold_juice)

print(perfect_juice)