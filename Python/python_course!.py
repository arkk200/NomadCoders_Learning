# 데이터에 결합된 함수는 메소드라고 부른다.

# 리스트
nums = [5, 3, 1, 5, 7, 3, "True", True, 12]

# 리스트에 .을 찍으면 리스트에서 쓸 수 있는 모든 메서드를 볼 수 있다.
nums.append(["🍜", "🍹"])
print(nums)

# 뒤에서부터 2번째 데이터를 가져온다.
print(nums[-1])

nums.clear()
print(nums)

# 튜플
nums2 = (1, 2, 3, True, "xxxx")

# 튜플의 메서드는 count와 index만 있다.
nums2.count(1)
nums2.index("xxxx")

# 딕셔너리
# 딕셔너리는 더 복잡한 데이터구조를 만들 때 유용하게 쓸 수 있다.
player = {
    "name": "lmj",
    "age": 17,
    "alive": True,
    "fav_food" : ("🍜", "🍹"),
    "teacher":{
        "name": "nico",
        "fav_food": ["🍕", "🍔"]
    }
}

# 딕셔너리는 인덱스를 사용하지 않고 키를 사용한다.
print(player["teacher"]["fav_food"])

# 딕셔너리도 데이터를 변경할 수 있다.
player['fav_food'] = "🍔"
player.pop("alive")

# 딕셔너리는 인덱스를 사용하지 않고 키를 사용한다.
player["teacher"]["fav_food"].append("🍔🍔")

print(player["teacher"]["fav_food"])