# 대수학처럼 a = 2, b = 3
# 이런식으로 변수를 선언하면 됨
a = 2
b = 3
print(a + b)

# 문자열은 작은 따옴표, 큰 따옴표로 감싸야 함
# 작은 따옴표에서 시작했으면 작은 따옴표로 닫아야 함
str = 'string'
num = 3
# 참일 때는 True, 거짓일 때는 False이다.
bool_true = True
bool_false = False
# 위에 num과 같은 숫자지만 flt는 소수가 있는 실수임
flt = 3.141592
none = None
print(type(none)) # None의 타입은 NoneType 이다.

# _는 파이썬에서 긴 변수명을 쓸 때 단어 사이마다 붙여주는 기호이다.
# 이를 snake_case 라고 하고 파이썬 유저 사이에 암묵적 규칙이다.
super_long_variable = None

# 파이썬에서 JS에서 쓰는 것처럼 써도 문제는 없다
# 그러나 파이썬 생태계에선 snake_case가 더 많이 쓰인다.
superLongVariable = None
print(superLongVariable)