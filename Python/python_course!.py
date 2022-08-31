player = {
    'name':'lmj',
    'age':17,
    'alive':True,
    'fav_food': ["🥤", "🍹", "☕"]
}

# get 매서드에 키를 전달해서 값을 가져올 수 있다.
print(player.get('age'))
print(player.get('fav_food'))
# 대괄호 안에 키를 넣어서 값을 가져올 수도 있다.
print(player['fav_food'])

# 딕셔너리도 변경가능하다.
print(player)
player.pop('age')
print(player)

# 딕셔너리에 없는 키는 대괄호를 이용해서 추가할 수 있다.
player['xp'] = 1500
print(player)

# fav_food 키에 있는 값, 리스트에 값을 추가한 것이다.
player['fav_food'].append("🍜")
print(player.get('fav_food'))
print(player['fav_food'])