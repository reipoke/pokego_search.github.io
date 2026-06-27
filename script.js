let numbers=[];


// ここを好きなポケモン番号に変更
let pokemon=[
1,2,3,4,5,
6,7,8,9,10,
11,12,13,14,15
];


const grid=document.getElementById("pokemonGrid");


pokemon.forEach(num=>{


let card=document.createElement("div");

card.className="card";


card.innerHTML=`

<div>No.${num} ポケモン名</div>

<img src="images/${String(num).padStart(4,"0")}.png">

<br>

<button onclick="add(${num})">
追加
</button>

<button onclick="removeNum(${num})">
削除
</button>

`;

grid.appendChild(card);


});



function update(){

document.getElementById("result").value=
numbers.join(",");

}



function add(num){

if(!numbers.includes(num)){
numbers.push(num);
}

update();

}



function removeNum(num){

numbers=
numbers.filter(x=>x!==num);

update();

}



function copyText(){

navigator.clipboard.writeText(
document.getElementById("result").value
);

}
