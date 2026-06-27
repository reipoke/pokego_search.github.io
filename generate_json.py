import requests
import json
import time


MAX_ID = 1025


pokemon_list = []


for i in range(1, MAX_ID + 1):

    url = f"https://pokeapi.co/api/v2/pokemon-species/{i}/"

    print(f"{i}/{MAX_ID}")

    data = requests.get(url).json()


    # 日本語名取得
    name = ""

    for n in data["names"]:
        if n["language"]["name"] == "ja":
            name = n["name"]
            break


    pokemon_list.append({
        "id": i,
        "name": name
    })


    time.sleep(0.05)



with open(
    "pokemon.json",
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        pokemon_list,
        f,
        ensure_ascii=False,
        indent=2
    )


print("pokemon.json 作成完了")