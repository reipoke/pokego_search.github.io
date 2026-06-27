const grid = document.getElementById("pokemonGrid");


// 表示する図鑑番号
// 現在のポケモン数（1025）まで自動生成
let pokemon = [];

for(let i = 1; i <= 1025; i++){
    pokemon.push(i);
}



let numbers = [];



// カード作成

pokemon.forEach(num => {


    let card = document.createElement("div");

    card.className = "card";


    let imgNo = String(num).padStart(4,"0");


    card.innerHTML = `

        <div class="card-title">
            No.${num} ポケモン名
        </div>


        <img src="images/${imgNo}.png"
             onerror="this.style.display='none'">


        <div class="card-buttons">

            <button onclick="add(${num})">
                追加
            </button>


            <button onclick="removeNum(${num})">
                削除
            </button>

        </div>

    `;


    grid.appendChild(card);


});





function update(){

    document.getElementById("result").value =
        numbers.join(",");

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





function copyText(){


    navigator.clipboard.writeText(
        document.getElementById("result").value
    );


}
