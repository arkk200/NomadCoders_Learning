password_correct = False

if password_correct:
    print("Here is your money")
else: # else는 선택사항이다.
    print("Wrong password")


winner = 10

# if나 elif의 조건이 True라면 그 뒤에 나오는 조건은 확인하지 않는다.
if winner > 10:
    print("Winner is greater than 10")
# elif는 코드에 또다른 대안과 조건을 넣을 수 있게 해준다.
elif winner < 10:
    print("Winner is less than 10")
else:
    print("Winner is 10")