
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

var touchCoordinate=
{
  startX:0,
  startY:0,

  endX:0,
  endY:0,

};

var keys=
{
  UP:38,
 	DOWN:40,
 	LEFT:37,
 	RIGHT:39
};

var game=
{
  highScore:0,
  score:0,
  board:newGrid(),
  bigNumber:4,
  normalNumber:2,
  moved:false
}

var newGameButton=document.getElementById('new-game');
var score=document.getElementById('score');
var bestScore=document.getElementById('best-score');

startNewGame();

newGameButton.style.cursor='pointer';
newGameButton.onclick=startNewGame;

document.addEventListener('keydown',move);

mainGrid.addEventListener('touchstart',touchStart);
mainGrid.addEventListener('touchmove',touchMove);
mainGrid.addEventListener('touchend',touchEnd);

function startNewGame()
{
  game.moved=false;
  game.board=newGrid();
  game.score=0;
  newGameButton.firstElementChild.innerHTML="Nuevo Juego"

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

  var randomNumber1=randomNumber(12);
  var randomNumber2=randomNumber(24);

  //game.board[position_1[0]][position_1[1]]=Math.pow(2,1);
  game.board[position_1[0]][position_1[1]]=randomNumber1?game.bigNumber:game.normalNumber;
  game.board[position_2[0]][position_2[1]]=randomNumber2?game.bigNumber:game.normalNumber;

  //motherboard
  /*game.board[0][0]=3;
  game.board[0][1]=5;
  game.board[0][2]=9;
  game.board[0][3]=1;

  game.board[1][0]=5;
  game.board[1][1]=9;
  game.board[1][2]=1;
  game.board[1][3]=3;

  game.board[2][0]=9;
  game.board[2][1]=1;
  game.board[2][2]=3;
  game.board[2][3]=5;

  game.board[3][0]=2;
  game.board[3][1]=2;
  game.board[3][2]=4;
  game.board[3][3]=8;*/


  refresh();
} //function startGame

/**
* Detecta el inicio del touch
* @param {*} evento 
*/

function touchStart(evento)
{
  touchCoordinate.startX=evento.touches[0].clientX;
  touchCoordinate.startY=evento.touches[0].clientY;
}

/**
* Detecta el deslizamiento del touch
* @param {*} evento 
*/

function touchMove(evento)
{
  evento.preventDefault();
  //console.log("touch Move: "+evento);
}

/**
* Detecta el final del touch
* @param {*} evento 
*/
function touchEnd(evento)
{
  touchCoordinate.endX=evento.changedTouches[0].clientX;
  touchCoordinate.endY=evento.changedTouches[0].clientY;

  swipe();
}

function swipe()
{
  var xDifference=Math.floor( Math.abs(touchCoordinate.startX-touchCoordinate.endX) );
  var yDifference=Math.floor( Math.abs(touchCoordinate.startY-touchCoordinate.endY) );

  if(xDifference>yDifference && xDifference>50)
  {
    game.moved=false;

    if(touchCoordinate.startX>touchCoordinate.endX)
    {
      left();
      generateNumberOnEmptyGrid();
    }
    else
    {
      right();
      generateNumberOnEmptyGrid();
    }
  }
  else if( yDifference>50)
  {

    game.moved=false;

    if(touchCoordinate.startY>touchCoordinate.endY)
    {
      up();
      generateNumberOnEmptyGrid();
    }
    else
    {
      down();
      generateNumberOnEmptyGrid();
    }
  }

}


/*
 Detecta el movimiento del teclado
*/
function move(evento)
{  
  if(!isGameOver())
  {
    game.moved=false;

    switch(evento.keyCode)
    {
      case keys.UP:
        evento.preventDefault();
        up();
        generateNumberOnEmptyGrid();
        break;
      case keys.DOWN:
        evento.preventDefault();
        down();
        generateNumberOnEmptyGrid();
        break;
      case keys.LEFT:
        left();
        generateNumberOnEmptyGrid();
        break;
      case keys.RIGHT:
        right();
        generateNumberOnEmptyGrid();
        break;
    }
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

/*Refresca al vista con los datos del grid*/
function refresh(animated)
{
  for(var i=0;i<4;i++)
  {
    for(var e=0;e<4;e++)
    {
      var cell=cells[i*10+e];
      cell.innerHTML=game.board[i][e];

      switch(game.board[i][e])
      {
        case 0:
          cell.className="";
          cell.className="number empty"
          cell.innerHTML="";
          break;
        case Math.pow(game.normalNumber,1):
        case Math.pow(game.normalNumber,2):   
          cell.className="";
          cell.className="number"
          break;
        case Math.pow(game.normalNumber,3):
          cell.className="";
          cell.className="number twoPowThree"
          break;
        case Math.pow(game.normalNumber,4):
          cell.className="";
          cell.className="number twoPowFour"
          break;
        case Math.pow(game.normalNumber,5):
          cell.className="";
          cell.className="number twoPowFive"
          break;  
        case Math.pow(game.normalNumber,6):
          cell.className="";
          cell.className="number twoPowSix"
          break; 
        case Math.pow(game.normalNumber,7):
          cell.className="";
          cell.className="number twoPowSeven"
          break;
        case Math.pow(game.normalNumber,8):
          cell.className="";
          cell.className="number twoPowEight"
          break;
        case Math.pow(game.normalNumber,9):
          cell.className="";
          cell.className="number twoPowNine"
          break;  
        case Math.pow(game.normalNumber,10):
          cell.className="";
          cell.className="number twoPowTen"
          break;    
        case Math.pow(game.normalNumber,11):
          cell.className="";
          cell.className= "number twoPowEleven "
          break;   
        case Math.pow(game.normalNumber,12):
          cell.className="";
          cell.className="number twoPowTwelve"
          break; 
        case Math.pow(game.normalNumber,13):
          cell.className="";
          cell.className="number twoPowThirteen"
          break; 
        case Math.pow(game.normalNumber,14):
          cell.className="";
          cell.className="number twoPowFourteen"
          break; 
        case Math.pow(game.normalNumber,15):
          cell.className="";
          cell.className="number twoPowFifteen"
          break; 
        case Math.pow(game.normalNumber,16):
          cell.className="";
          cell.className="number twoPowSixteen"
          break; 
        default:
          cell.className="";
          cell.className="number twoPowSeventeen"
          break; 
      }
    }
  }

  if(animated!=undefined)
  {
    var classHolder = cells[animated[0]*10+animated[1]];
    classHolder.classList.remove('bounceIn');

    classHolder.classList.add('bounceIn');

    setTimeout(function()
    {
      classHolder.classList.remove('bounceIn');
    },500);

  }

  score.lastElementChild.innerHTML=game.score;

  if(game.highScore<game.score)
  {
    bestScore.lastElementChild.innerHTML=game.score;
    game.highScore=game.score;
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

/*
row_column recive un 0 si es columna
y un 1 si es fila
*/

function generateNumberOnEmptyGrid()
{
  if(game.moved)
  {
    var gn_position = new  Array(2);

    do
    {
      gn_position[0]=randomGridPosition();
      gn_position[1]=randomGridPosition();

    }while(game.board[ gn_position[0] ] [ gn_position[1] ]!=0);

    game.board[ gn_position[0] ] [ gn_position[1] ]= randomNumber(12)?game.bigNumber:game.normalNumber;
    
    refresh(gn_position);

    if(isGameOver())
    {
      newGameButton.firstElementChild.innerHTML="Perdiste!";
    }
  }
  
}

/**
* realiza el movimiento a la derecha
*/
function right()
{
  row_right=new Array();
  final_row=new Array();

  for(var i=0;i<4;i++)
  {
    row_right= reverse_array(game.board[i]);

    row_right.forEach(function (element)
    {
      if(element!=0)
      {
        final_row.push(element);
      }
      
    });

    for(var e=0;e<final_row.length-1;e++)
    {
      if(final_row[e]==final_row[e+1])
      {

        final_row[e]*=2;
        game.score+=final_row[e];

        final_row[e+1]=0;
      }
      else
      {
        if(final_row[e]==0)
        {
          final_row[e]=final_row[e+1];
          final_row[e+1]=0;
          final_row=array_no_zeros(final_row);
          e--;
        }
      }
    }

    while(final_row.length!=4)
    {
      final_row.push(0);
    }

    if(JSON.stringify(game.board[i])!= JSON.stringify(final_row.reverse()) )
    {
      game.moved=true;
      //console.log('game.board[i]:'+game.board[i]+' final_row: '+final_row);
    }

    game.board[i]=final_row;

    if(game.moved)
    {
      refresh();
    }

    final_row=new Array();

  }
  
}

/**
* realiza el movimiento a la izquierda
*/
function left()
{
  row_right=new Array();
  final_row=new Array();

  for(var i=0;i<4;i++)
  {
    row_right=game.board[i];

    row_right.forEach(function (element)
    {
      if(element!=0)
      {
        final_row.push(element);
      }
      
    });

    for(var e=0;e<final_row.length-1;e++)
    {
      if(final_row[e]==final_row[e+1])
      {
        final_row[e]*=2;

        game.score+=final_row[e];
        final_row[e+1]=0;
      }
      else
      {
        if(final_row[e]==0)
        {
          final_row[e]=final_row[e+1];
          final_row[e+1]=0;
          final_row=array_no_zeros(final_row);
          e--;
        }
      }
    }

    while(final_row.length!=4)
    {
      final_row.push(0);
    }

    if(JSON.stringify(game.board[i])!= JSON.stringify(final_row) )
    {
      game.moved=true;
    }

    game.board[i]=final_row;

    if(game.moved)
    {
      refresh();
    }

    final_row=new Array();

  }
}
 
/**
* realiza el movimiento a la arriba
*/
function up()
{
  row_right=new Array();
  final_row=new Array();

  for(var i=0;i<4;i++)
  {
    row_right.push(game.board[0][i]);
    row_right.push(game.board[1][i]);
    row_right.push(game.board[2][i]);
    row_right.push(game.board[3][i]);

    row_right.forEach(function (element)
    {
      if(element!=0)
      {
        final_row.push(element);
      }
      
    });

    for(var e=0;e<final_row.length-1;e++)
    {
      if(final_row[e]==final_row[e+1])
      {
        final_row[e]*=2;
        game.score+=final_row[e];

        final_row[e+1]=0;
      }
      else
      {
        if(final_row[e]==0)
        {
          final_row[e]=final_row[e+1];
          final_row[e+1]=0;
          final_row=array_no_zeros(final_row);
          e--;
        }
      }
    }

    while(final_row.length!=4)
    {
      final_row.push(0);
    }

    for(var g=0;g<4;g++)
    {
      if(JSON.stringify(game.board[g][i])!=JSON.stringify(final_row[g]))
      {
        game.moved=true;
      }
      game.board[g][i]=final_row[g];
    }

    if(game.moved)
    {
      refresh();
    }
    

    final_row=new Array();
    row_right=new Array();

  }
}

/**
* realiza el movimiento a la abajo
*/
function down()
{

  row_right=new Array();
  final_row=new Array();

  for(var i=0;i<4;i++)
  {
    row_right.push(game.board[3][i]);
    row_right.push(game.board[2][i]);
    row_right.push(game.board[1][i]);
    row_right.push(game.board[0][i]);

    row_right.forEach(function (element)
    {
      if(element!=0)
      {
        final_row.push(element);
      }
      
    });

    for(var e=0;e<final_row.length-1;e++)
    {
      if(final_row[e]==final_row[e+1])
      {
        final_row[e]*=2;
        game.score+=final_row[e];

        final_row[e+1]=0;
      }
      else
      {
        if(final_row[e]==0)
        {
          final_row[e]=final_row[e+1];
          final_row[e+1]=0;
          final_row=array_no_zeros(final_row);
          e--;
        }
      }
    }

    while(final_row.length!=4)
    {
      final_row.push(0);
    }

    final_row.reverse();

    for(var g=0;g<4;g++)
    {
      if(JSON.stringify(game.board[g][i])!=JSON.stringify(final_row[g]))
      {
        game.moved=true;
      }
      game.board[g][i]=final_row[g];
    }

    if(game.moved)
    {
      refresh();
    }

    final_row=new Array();
    row_right=new Array();

  }

}

/*
Verifica si hay espacio disponible en el grid
*/
function isGameOver()
{

  if(isThereSpaceOnGrid())
  {
    return false;
  }

  return !(isRowSum()||isColumnSum());
}

function isRowSum()
{
  row_right=new Array();
  final_row=new Array();

  for(var i=0;i<4;i++)
  {
    row_right=game.board[i];

    row_right.forEach(function (element) //elimina los ceros
    {
      if(element!=0)
      {
        final_row.push(element);
      }
      
    });

    for(var e=0;e<final_row.length-1;e++)
    {
      if(final_row[e]==final_row[e+1])
      {
        return true;
      }
    }

    final_row=new Array();
  }

  return false;

}

function isThereSpaceOnGrid()
{
  for(var i=0;i<4;i++)
  {
    for(var e=0;e<4;e++)
    {
      if(game.board[i][e]==0)
      {
        return true;
      }
    }
  }

  return false;

}

function isColumnSum()
{
  row_right=new Array();
  final_row=new Array();

  for(var i=0;i<4;i++)
  {
    row_right.push(game.board[0][i]);
    row_right.push(game.board[1][i]);
    row_right.push(game.board[2][i]);
    row_right.push(game.board[3][i]);

    row_right.forEach(function (element) //elimina los ceros
    {
      if(element!=0)
      {
        final_row.push(element);
      }
      
    });

    for(var e=0;e<final_row.length-1;e++)
    {
      if(final_row[e]==final_row[e+1])
      {
        return true;
      }
    }

    final_row=new Array();
    row_right=new Array();

  } 

  return false;
}

function array_no_zeros(p_array)
{
  var no_zeros=new Array();

  p_array.forEach(function (element)
    {
      if(element!=0)
      {
        no_zeros.push(element);
      }
      
    });

  return no_zeros;  
}

function reverse_array(p_array)
{
  var reversed=new Array();

  for(i=p_array.length-1;i>=0;i--)
  {
    reversed.push(p_array[i]);
  }

  return reversed;

}

function removeAnimations()
{
  for(var i=0; i<4;i++)
  {
   for(var e=0;e<4;e++) 
   {
    cells[i*10+e].classList.remove('bounceIn');
   }
  }
}

