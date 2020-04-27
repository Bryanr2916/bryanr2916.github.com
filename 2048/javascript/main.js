
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

var mainGrid=document.getElementById('main-grid');

var teclas=
 {
 	UP:38,
 	DOWN:40,
 	LEFT:37,
 	RIGHT:39
 };

var game=
{
  puntaje:0,
  tablero:newGrid()
}

startNewGame();

var grid=newGrid();

 var newGameButton=document.getElementById('new-game');

 newGameButton.style.cursor='pointer';
 newGameButton.onclick=startNewGame;

 document.addEventListener('keydown',move);

 mainGrid.addEventListener('touchstart',touchStart);
 mainGrid.addEventListener('touchmove',touchMove);
 mainGrid.addEventListener('touchend',touchEnd);

 function startNewGame()
 {

  cleanGrid();

  var position_1=new Array(2);
  var position_2=new Array(2);

  position_1[0]=randomGridPosition();
  position_1[1]=randomGridPosition();

  position_2[0]=randomGridPosition();
  position_2[1]=randomGridPosition();

  while(position_1[0]==position_2[0] && position_1[1]==position_2[1])
  {
    position_2[0]=randomGridPosition();
    position_2[1]=randomGridPosition();
  }

  var sp_position_1= (position_1[0]*10)+position_1[1];
  var sp_position_2= (position_2[0]*10)+position_2[1];

  cells[sp_position_1].classList.remove('empty');
  cells[sp_position_2].classList.remove('empty');

  var randomNumber1=randomNumber(12);
  var randomNumber2=randomNumber(24);

  cells[sp_position_1].innerHTML=randomNumber1?4:2;
  cells[sp_position_2].innerHTML=randomNumber2?4:2;

  game.tablero[position_1[0]][position_1[1]]=randomNumber1?4:2;
  game.tablero[position_2[0]][position_2[1]]=randomNumber2?4:2;
} //function startGame

 /**
  * Detecta el inicio del touch
  * @param {*} evento 
  */

  function touchStart(evento)
  {
    console.log("touch Start: "+evento);
  }

  /**
  * Detecta el deslizamiento del touch
  * @param {*} evento 
  */

  function touchMove(evento)
  {
    console.log("touch Move: "+evento);
  }

  function touchEnd(evento)
  {
    console.log("touch End: "+evento);
  }


 /*
  Detecta el movimiento del teclado
 */
 function move(evento)
 {
  
   switch(evento.keyCode)
   {
     case teclas.UP:
       alert('ouch!!!');
      break;
     case teclas.DOWN:
      break;
     case teclas.LEFT:
      break;
     case teclas.RIGHT:
      break;
   }


 }

 /**
  * retorna un booleano para determinar si el número
  * a generar será un 2 (si es falso)
  * o un 4 (si es verdadero)
  * @param {*} residuo 
  */
 function randomNumber(residuo)
 {
    var number=Math.floor(Math.random()*80)+1;
    return number%residuo==0;
 }

 /*
 Limpia el tablero
 */
 function cleanGrid(item,index,array)
 {

  game.tablero=newGrid();

   for(var i=0;i<4;i++)
   {
     //primera fila

     cells[(i*10)].classList.remove('empty');
     cells[(i*10)].classList.add('empty');
     cells[(i*10)].innerHTML='';

     //segunda fila

     cells[(i*10)+1].classList.remove('empty');
     cells[(i*10)+1].classList.add('empty');
     cells[(i*10)+1].innerHTML='';

     //tercera fila

     cells[(i*10)+2].classList.remove('empty');
     cells[(i*10)+2].classList.add('empty');
     cells[(i*10)+2].innerHTML='';

     //cuarta fila

     cells[(i*10)+3].classList.remove('empty');
     cells[(i*10)+3].classList.add('empty');
     cells[(i*10)+3].innerHTML='';
   }

   
 }

/*retorna un nuevo grid vacio*/
 function newGrid()
   {
    var new_grid=new Array(4);

    for(var i=0; i<4;i++)
    {
      new_grid[i]= new Array(4);
      new_grid[i][0]=0;
      new_grid[i][1]=0;
      new_grid[i][2]=0;
      new_grid[i][3]=0;
    }

    return new_grid;

   }

   function randomGridPosition()
   {
    return Math.floor(Math.random()*4);
   }
 