const grid = document.getElementById("pokemonGrid");

let pokemon = [];
let numbers = [];


// JSON読み込み

fetch("pokemon.json")
.then(response => response.json())
.then(data => {

    pokemon = data;

    createCards();

});




// カード生成

function createCards(){


    pokemon.forEach(p => {


        let card = document.createElement("div");

        card.className = "card";


        let imgNo =
            String(p.id).padStart(4,"0");


        card.innerHTML = `

        <div class="card-title">
            No.${p.id} ${p.name}
        </div>


        <img src="images/${imgNo}.png"
             onerror="this.style.display='none'">


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


}




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
