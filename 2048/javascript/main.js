
/*
En el juego aparece un 4 el 15% de las veces
*/

var cells=
{
  0:document.getElementById('cell_0_0'),
  1:document.getElementById('cell_0_1'),
  2:document.getElementById('cell_0_2'),
  3:document.getElementById('cell_0_3'),
  //
  10:document.getElementById('cell_1_0'),
  11:document.getElementById('cell_1_1'),
  12:document.getElementById('cell_1_2'),
  13:document.getElementById('cell_1_3'),
  //
  20:document.getElementById('cell_2_0'),
  21:document.getElementById('cell_2_1'),
  22:document.getElementById('cell_2_2'),
  23:document.getElementById('cell_2_3'),
  //
  30:document.getElementById('cell_3_0'),
  31:document.getElementById('cell_3_1'),
  32:document.getElementById('cell_3_2'),
  33:document.getElementById('cell_3_3')

};

var initialNumbre1, initialNumbre2;

initialNumbre1= Math.floor(Math.random()*20)+1; //3*6.6666=20

//sadfhaskjdfhk

var position_1=new Array(2);
var position_2=new Array(2);

position_1[0]=Math.floor(Math.random()*4);
position_1[1]=Math.floor(Math.random()*4);

position_2[0]=Math.floor(Math.random()*4);
position_2[1]=Math.floor(Math.random()*4);

while(position_1[0]==position_2[0] && position_1[1]==position_2[1])
{
  position_2[0]=Math.floor(Math.random()*4);
  position_2[1]=Math.floor(Math.random()*4);
}

position_1= (position_1[0]*10)+position_1[1];
position_2= (position_2[0]*10)+position_2[1];

console.log("Position 1: "+position_1);
console.log("Position 2: "+position_2);

var number=Math.floor(Math.random()*80)+1;
var number2=Math.floor(Math.random()*80)+1;
var isNumber1_4= number%12==0;
var isNumber2_4=number2%24==0;

cells[position_1].classList.remove('empty');
cells[position_2].classList.remove('empty');

cells[position_1].innerHTML=isNumber1_4?4:2;
cells[position_2].innerHTML=isNumber2_4?4:2;

  //nskahfkjdhfa

var teclas=
 {
 	UP:38,
 	DOWN:40,
 	LEFT:37,
 	RIGHT:39
 };

var grid=new Array(4);

for(var i=0; i<4;i++)
{
  grid[i]= new Array(4);
}

 var newGame=document.getElementById('new-game');

 newGame.style.cursor='pointer';
 newGame.onclick=startNewGame;

 document.addEventListener('keydown',move);

 function startNewGame()
 {
   alert('new game!');
 }



 /*
  Detecta el movimiento del teclado
 */
 function move(evento)
 {
  
   switch(evento.keyCode)
   {
     case teclas.UP:
      break;
     case teclas.DOWN:
      break;
     case teclas.LEFT:
      break;
     case teclas.RIGHT:
      break;
   }


 }