var world = randomWorld([
  [4,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,4],
  [13,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,12],
  [13,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,12],
  [13,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,12],
  [13,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,12],
  [13,0,1,1,1,1,1,1,2,1,1,1,1,1,1,0,12],
  [13,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,12],
  [13,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,12],
  [13,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,12],
  [13,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,12],
  [4,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,4]
]
);
//this is the function that runs in real-time and keeps updating each element
function runTime() {
  displayWorld();
  displayPacman();
  displayPacbro();
  //I know there must be a way to contain all the active objects
  //but I'm not there yet.  I'll finish later.
  pacObjectMove(pacman);
  pacObjectMove(pacbro);
  ghostRunner(ghostRed);
  ghostRunner(ghostGreen);
  displayGhost();
  updateScore();
  if(cherry.count<60){
    cherry.count++;
  } else if(cherry.init===3){
  } else {
    npcObjectMove(cherry);
    displayCherry();
    cherryCrash(go);
  }
  if(ghostCrashRed(go)===1){
    document.getElementById('worlds').innerHTML = "<div class='gameOverOne'>Game Over</br> Red Ghost Strikes Again!</div>";
    return;
  }
  if(ghostCrashGreen(go)===1){
    document.getElementById('worlds').innerHTML = "<div class='gameOverOne'>Game Over</br> Green Ghost Strikes Again!</div>";
    return;
  }
  //setTimeout I found when looking for a time display.
  //It does a function after waiting a specified amount of time.
  setTimeout(runTime, 50);
}
//end of runtime function
var score = 0;
var yPosition = 1;
var xPosition = 1;
var go = 0;
var pacman = {
  x: world[0].length-2,
  y: 1,
  width: 32,
  height: 32,
  charge: 0,
  dir: 4
}
var pacbro = {
  x: 1,
  y: 1,
  width: 32,
  height: 32,
  charge: 0,
  dir: 4
}
var ghostGreen = {
  x: 5,
  y: world.length-2,
  width: 32,
  height: 32,
  dir: 3
}
var ghostRed = {
  x: 11,
  y: world.length-2,
  width: 32,
  height: 32,
  dir: 3
}
var cherry = {
  x: 8,
  y: 5,
  width: 32,
  height: 32,
  dir: 1,
  count: 0,
  init: 0
}
function randomWorld(tempWorld){
  for(var i=1; i<tempWorld.length-1; i++){
    for(var j=1; j<tempWorld[i].length-1; j++){
      if(tempWorld[i][j]===0){
        tempWorld[i][j] = randomBlock();
      }
    }
  }
  tempWorld = defineBlocks(tempWorld);
  return tempWorld;
}
//defineBlocks is used to swap out the bricks for ones that match the art
function defineBlocks(blockedArray){
  for(var i=1; i<blockedArray.length-1; i++){
    for(var j=1; j<blockedArray[i].length-1; j++){
      if(blockedArray[i][j]>3 && blockedArray[i-1][j]<4 && blockedArray[i+1][j]<4 && blockedArray[i][j+1]<4 && blockedArray[i][j-1]<4){
        blockedArray[i][j] = 9;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i-1][j]>3 && blockedArray[i+1][j]>3 && blockedArray[i][j+1]>3 && blockedArray[i][j-1]>3){
        blockedArray[i][j] = 4;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i-1][j]>3 && blockedArray[i+1][j]>3 && blockedArray[i][j+1]>3){
        blockedArray[i][j] = 12;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i-1][j]>3 && blockedArray[i+1][j]>3 && blockedArray[i][j-1]>3){
        blockedArray[i][j] = 13;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i-1][j]>3 && blockedArray[i][j-1]>3 && blockedArray[i][j+1]>3){
        blockedArray[i][j] = 10;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i+1][j]>3 && blockedArray[i][j-1]>3 && blockedArray[i][j+1]>3){
        blockedArray[i][j] = 11;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i-1][j]>3 && blockedArray[i][j+1]>3){
        blockedArray[i][j] = 17;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i-1][j]>3 && blockedArray[i][j-1]>3){
        blockedArray[i][j] = 16;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i+1][j]>3 && blockedArray[i][j+1]>3){
        blockedArray[i][j] = 14;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i+1][j]>3 && blockedArray[i][j-1]>3){
        blockedArray[i][j] = 15;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i+1][j]>3 && blockedArray[i-1][j]>3){
        blockedArray[i][j] = 18;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i][j+1]>3 && blockedArray[i][j-1]>3){
        blockedArray[i][j] = 19;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i-1][j]>3){
        blockedArray[i][j] = 6;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i+1][j]>3){
        blockedArray[i][j] = 5;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i][j+1]>3){
        blockedArray[i][j] = 8;
      }
      else if(blockedArray[i][j]>3 && blockedArray[i][j-1]>3){
        blockedArray[i][j] = 7;
      }
    }
  }
  return blockedArray;
}
function randomBlock(){
  var blockNumb=Math.ceil((Math.random())*20);
  if (blockNumb < 4){
    return 3;
  } else if (blockNumb < 12){
    return 1;
  } else if (blockNumb < 13){
    return 2;
  } else if (blockNumb < 22){
    return 4;
  }
}
function displayPacman(){
  document.getElementById('pacmans').style.top = pacman.y*32;
  document.getElementById('pacmans').style.left = pacman.x*32;
}
function displayPacbro(){
  document.getElementById('pacbros').style.top = pacbro.y*32;
  document.getElementById('pacbros').style.left = pacbro.x*32;
}
function displayCherry(){
  document.getElementById('cherrys').style.top = cherry.y*32;
  document.getElementById('cherrys').style.left = cherry.x*32;
}
function updateScore(){
  document.getElementById('score').innerHTML = pacman.charge;
  document.getElementById('scoreBro').innerHTML = pacbro.charge;
}
function displayGhost(){
  document.getElementById('ghostGreens').style.top = ghostGreen.y*32;
  document.getElementById('ghostGreens').style.left = ghostGreen.x*32;
  document.getElementById('ghostReds').style.top = ghostRed.y*32;
  document.getElementById('ghostReds').style.left = ghostRed.x*32;
}


function displayWorld(){
  var output = '';
  for(var i=0; i<world.length; i++){
    output += "\n<div class='row'>";
    for(var j=0; j<world[i].length; j++){
      if(world[i][j] == 4){
        output += "<div class='brickBlank'></div>";
      }
      else if(world[i][j] == 1){
        output += "<div class='coin'></div>";
      }
      else if(world[i][j] == 2){
        output += "<div class='empty'></div>";
      }
      else if(world[i][j] == 3){
        output += "<div class='powerUp'></div>";
      }
      else if(world[i][j] == 5){
        output += "<div class='aDown'></div>";
      }
      else if(world[i][j] == 6){
        output += "<div class='aUp'></div>";
      }
      else if(world[i][j] == 7){
        output += "<div class='aLeft'></div>";
      }
      else if(world[i][j] == 8){
        output += "<div class='aRight'></div>";
      }
      else if(world[i][j] == 9){
        output += "<div class='brickBlock'></div>";
      }
      else if(world[i][j] == 10){
        output += "<div class='cDown'></div>";
      }
      else if(world[i][j] == 11){
        output += "<div class='cUp'></div>";
      }
      else if(world[i][j] == 12){
        output += "<div class='cLeft'></div>";
      }
      else if(world[i][j] == 13){
        output += "<div class='cRight'></div>";
      }
      else if(world[i][j] == 14){
        output += "<div class='bDownRight'></div>";
      }
      else if(world[i][j] == 15){
        output += "<div class='bDownLeft'></div>";
      }
      else if(world[i][j] == 16){
        output += "<div class='bUpLeft'></div>";
      }
      else if(world[i][j] == 17){
        output += "<div class='bUpRight'></div>";
      }
      else if(world[i][j] == 18){
        output += "<div class='dUp'></div>";
      }
      else if(world[i][j] == 19){
        output += "<div class='dLeft'></div>";
      }
    }
    output += "</div>";
  }

  // console.log(output);
  document.getElementById('worlds').innerHTML = output;
}

function moveObject(movableObject, yChange, xChange){
  if(yChange === 0){
    if(xChange<0){
      if(world[Math.floor(movableObject.y)][Math.floor(movableObject.x+xChange)] < 4 && world[Math.ceil(movableObject.y)][Math.floor(movableObject.x+xChange)] < 4){
        movableObject.x=movableObject.x+xChange;
      } else {
      }
    } else if (xChange>0) {
      if(world[Math.floor(movableObject.y)][Math.ceil(movableObject.x+xChange)] < 4 && world[Math.ceil(movableObject.y)][Math.ceil(movableObject.x+xChange)] < 4){
        movableObject.x=movableObject.x+xChange;
      } else {
      }

    }
  } else if(xChange === 0){
    if(yChange<0){
      if(world[Math.floor(movableObject.y+yChange)][Math.floor(movableObject.x)] < 4 && world[Math.floor(movableObject.y+yChange)][Math.ceil(movableObject.x)] < 4){
        movableObject.y=movableObject.y+yChange;
      } else {
      }
    } else if (yChange>0) {
      if(world[Math.ceil(movableObject.y+yChange)][Math.floor(movableObject.x)] < 4 && world[Math.ceil(movableObject.y+yChange)][Math.ceil(movableObject.x)] < 4){
        movableObject.y=movableObject.y+yChange;
      } else {
      }
    }
  }
}
//want to change the incements to a variable stored in the pac objects and the checks a standard function.
document.onkeydown = function(e){ //my way of checking for key inputs
  if(e.keyCode == 37){
    //moveObject(javascript object to be moved, change in y, change in x)
    pacman.dir = 1;
    //  moveObject(pacman, 0, -0.5);
    //  activSquare(pacman);
  }
  else if(e.keyCode == 39){
    pacman.dir = 2;
    //  moveObject(pacman, 0, 0.5);
    //  activSquare(pacman);
  }

  else if(e.keyCode == 38){
    pacman.dir = 3;
    //  moveObject(pacman, -0.5, 0);
    //  activSquare(pacman);
  }
  else if(e.keyCode == 40){
    pacman.dir = 4;
    //  moveObject(pacman, 0.5, 0);
    //  activSquare(pacman);
  }
  if(e.keyCode == 65){
    pacbro.dir = 1;
    //  moveObject(pacbro, 0, -0.5);
    //  activSquare(pacbro);
  }
  else if(e.keyCode == 68){
    pacbro.dir = 2;
    //  moveObject(pacbro, 0, 0.5);
    //  activSquare(pacbro);
  }
  else if(e.keyCode == 87){
    pacbro.dir = 3;
    //  moveObject(pacbro, -0.5, 0);
    //  activSquare(pacbro);
  }
  else if(e.keyCode == 83){
    pacbro.dir = 4;
    //  moveObject(pacbro, 0.5, 0);
    //  activSquare(pacbro);
  }
}

function ghostRunner(currentGhost){
  //console.log("runred");
  if(Math.ceil(Math.random()*10)<=6){

  } else if (Math.ceil(Math.random()*10)===7){
    currentGhost.dir = 1;
  }
  else if (Math.ceil(Math.random()*10)===8){
    currentGhost.dir = 2;
  }
  else if (Math.ceil(Math.random()*10)===9){
    currentGhost.dir = 3;
  }
  else if (Math.ceil(Math.random()*10)===10){
    currentGhost.dir = 4;
  }

  npcObjectMove(currentGhost);
}

function pacObjectMove(currentPac){
  if(currentPac.dir === 1){
    moveObject(currentPac, 0, -0.25);
    activSquare(currentPac);
  } else if(currentPac.dir === 2){
    moveObject(currentPac, 0, 0.25);
    activSquare(currentPac);
  } else if(currentPac.dir === 3){
    moveObject(currentPac, -0.25, 0);
    activSquare(currentPac);
  } else if(currentPac.dir === 4){
    moveObject(currentPac, 0.25, 0);
    activSquare(currentPac);
  }
}
function npcObjectMove(currentObject){
  var ghostTempX = currentObject.x;
  var ghostTempY = currentObject.y;
  if(currentObject.dir === 1){
    moveObject(currentObject, 0, -0.1);
    if(ghostTempX === currentObject.x && ghostTempY === currentObject.y){
      currentObject.dir = 2;
    }
  }
  else if(currentObject.dir === 2){
    moveObject(currentObject, 0, 0.1);
    if(ghostTempX === currentObject.x && ghostTempY === currentObject.y){
      currentObject.dir = 3;
    }
  }
  else if(currentObject.dir === 3){
    moveObject(currentObject, -0.1, 0);
    if(ghostTempX === currentObject.x && ghostTempY === currentObject.y){
      currentObject.dir = 4;
    }
  }
  else if(currentObject.dir === 4){
    moveObject(currentObject, 0.1, 0);
    if(ghostTempX === currentObject.x && ghostTempY === currentObject.y){
      currentObject.dir = 1;
    }
  }
}
//this function compares objects to map objects... it does not compare object to object
function activSquare(squareObject){
  var objectVOne = world[Math.floor(squareObject.y)][Math.floor(squareObject.x)];
  var objectVTwo = world[Math.ceil(squareObject.y)][Math.ceil(squareObject.x)];
  if(objectVOne === 3){
    world[Math.floor(squareObject.y)][Math.floor(squareObject.x)] = 2;
    squareObject.charge += 5;
  } else if(objectVOne === 1){
    world[Math.floor(squareObject.y)][Math.floor(squareObject.x)] = 2;
    squareObject.charge += 1;
  } else if(objectVTwo === 3){
    world[Math.ceil(squareObject.y)][Math.ceil(squareObject.x)] = 2;
    squareObject.charge += 5;
  } else if(objectVTwo === 1){
    world[Math.ceil(squareObject.y)][Math.ceil(squareObject.x)] = 2;
    squareObject.charge += 1;
  }
}
function ghostCrashRed(validCrash){
  if((Math.sqrt((pacman.y-ghostRed.y)*(pacman.y-ghostRed.y)))<=.7 && (Math.sqrt((pacman.x-ghostRed.x)*(pacman.x-ghostRed.x)))<=.7){
    validCrash = 1;
    return validCrash;
  } else if((Math.sqrt((pacbro.y-ghostRed.y)*(pacbro.y-ghostRed.y)))<=.7 && (Math.sqrt((pacbro.x-ghostRed.x)*(pacbro.x-ghostRed.x)))<=.7){
    validCrash = 1;
    return validCrash;
  }
}
function ghostCrashGreen(validCrash){
  if((Math.sqrt((pacman.y-ghostGreen.y)*(pacman.y-ghostGreen.y)))<=.7 && (Math.sqrt((pacman.x-ghostGreen.x)*(pacman.x-ghostGreen.x)))<=.7){
    validCrash = 1;
    return validCrash;
  } else if((Math.sqrt((pacbro.y-ghostGreen.y)*(pacbro.y-ghostGreen.y)))<=.7 && (Math.sqrt((pacbro.x-ghostGreen.x)*(pacbro.x-ghostGreen.x)))<=.7){
    validCrash = 1;
    return validCrash;
  }
}
function cherryCrash(){
  var parenting = document.getElementById("bodys");
  var childing = document.getElementById("cherrys");
  if((Math.sqrt((pacman.y-cherry.y)*(pacman.y-cherry.y)))<=1 && (Math.sqrt((pacman.x-cherry.x)*(pacman.x-cherry.x)))<=1){
    validCrash = 1;
    pacman.charge+=20;
    cherry.init=3;
    parenting.removeChild(childing);
    return;
  } else if((Math.sqrt((pacbro.y-cherry.y)*(pacbro.y-cherry.y)))<=1 && (Math.sqrt((pacbro.x-cherry.x)*(pacbro.x-cherry.x)))<=1){
    validCrash = 1;
    pacbro.charge+=20;
    cherry.init= 3;
    parenting.removeChild(childing);
    return;
  }
}
