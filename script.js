const grid = document.getElementById("pokemonGrid");

let numbers = [];



fetch("./pokemon.json")
.then(res => {

    if(!res.ok){
        throw new Error("pokemon.json error");
    }

    return res.json();

})
.then(pokemon => {

    pokemon.forEach(p => {


        let card = document.createElement("div");

        card.className = "card";


        let img =
            String(p.id).padStart(4,"0");


        card.innerHTML = `

        <div class="card-title">
            No.${p.id} ${p.name}
        </div>

        <img src="images/${img}.png">


        <div class="card-buttons">

            <button onclick="add(${p.id})">
                追加
            </button>

            <button onclick="removeNum(${p.id})">
                削除
            </button>

        </div>

        `;


        grid.appendChild(card);


    });


})
.catch(err => {

    console.error(err);

    grid.innerHTML =
    "pokemon.json読み込み失敗";

});




function add(num){

    if(!numbers.includes(num)){

        numbers.push(num);

    }

    update();

}



function removeNum(num){

    numbers =
    numbers.filter(x => x !== num);

    update();

}



function update(){

    document.getElementById("result").value =
    numbers.join(",");

}



function copyText(){

navigator.clipboard.writeText(
    document.getElementById("result").value
);

}
