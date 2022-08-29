def tax_calc(money):
    # tax_calc는 money매개변수를 통해 값을 받고
    # 그 값에 0.35를 곱한 값을 반환한다.
    return money * 0.35

def pay_tax(tax):
    # 인자로 받은 값을 출력한다.
    print("thank you for paying", tax)

# 0.35를 곱한 값을 반환받고
# 그 값을 변수 to_pay 집어 넣는다.
to_pay = tax_calc(150000000)
# 그 값을 pay_tax의 인자로 전달함
pay_tax(to_pay)