var maps = new Array();

map = new Array();
map.push("XXXXXXXXXXXXXXXXXXX");
map.push("X                 X");
map.push("X @ B          o  X");
map.push("X                 X");
map.push("X                 X");
map.push("X                 X");
map.push("XXXXXXXXXXXXXXXXXXX");
maps.push(map);

map = new Array();
map.push("XXXXXXXXXXXXXXXXXXX");
map.push("X                 X");
map.push("X @ B          o  X");
map.push("X            B o  X");
map.push("X                 X");
map.push("X                 X");
map.push("XXXXXXXXXXXXXXXXXXX");
maps.push(map);

map = new Array();
map.push("XXXXXXXXXXXXXXXXXXX");
map.push("X         X    X  X");
map.push("X @ B     X   Xo  X");
map.push("X             XX  X");
map.push("X         X       X");
map.push("X         X       X");
map.push("XXXXXXXXXXXXXXXXXXX");
maps.push(map);

map = new Array();
map.push("XXXXXXXXXXXXXXXXXXX");
map.push("X         X    X  X");
map.push("X @ B          o  X");
map.push("X             XX  X");
map.push("X         X       X");
map.push("X         X       X");
map.push("XXXXXXXXXXXXXXXXXXX");
maps.push(map);

map = new Array();
map.push("XXXXXXX")
map.push("Xo B oX")
map.push("X B@B X")
map.push("Xo B oX")
map.push("XXXXXXX")
maps.push(map);

map = new Array();
map.push("       ####");
map.push("########  ##");
map.push("#          ###");
map.push("# @BB ##   oo#");
map.push("# BB   ##  oo#");
map.push("#         ####");
map.push("###########");
maps.push(map);

function Cell(x,y,value) {
  this.x = x;
  this.y = y;
  this.value = value;
}

Cell.prototype.add = function(otherCell) {
  return new Cell(this.x+otherCell.x, this.y+otherCell.y);
}

var victory = false;
var player;
var map;
var currentMap = 0;
var moves;
var goals;

function init() {
  if(victory) {
    victory = false;
    currentMap++;
    if(currentMap == maps.length) {
      currentMap = 0;
    }
  }

  moves = 0;
  goals = [];
  map = maps[currentMap].slice();

  for(y=0;y<map.length;y++) {
    for(x=0; x<map[y].length; x++) {
      if(map[y][x] == '@') {
        player = new Cell(x,y,'@');
        updateMap(player, ' ');
      } else if(map[y][x] == 'o') {
        addGoal(x,y);
        updateMap(new Cell(x,y), ' ');
      }
    }
  }

  updateDisplay();
}

function checkKey(e) {
  e = e || window.event;
  var move = new Cell(0,0);
  if(victory) {
    init();
  } else {
    if (e.keyCode == '38') { //up
      move.y = -1;
      moves++;
    } else if (e.keyCode == '40') { // down
      move.y = 1;
      moves++;
    } else if (e.keyCode == '37') { //left
      move.x = -1;
      moves++;
    } else if (e.keyCode == '39') { //right
      move.x = 1;
      moves++;
    } else if (e.keyCode == '82') { //R
      init();
    }
  }
  
  var cell = getCell( player.add(move) );
  if( cell.value == ' ' || cell.value == 'o' ) {
    player = player.add(move);
  } else if( cell.value == 'B' && getCell( cell.add(move) ).value == ' ') {
    player = player.add(move);
    updateMap(player, ' ');
    updateMap(player.add(move), 'B');
  }
  checkVictory();
  updateDisplay();
}

function checkVictory() {
  victory = true;
  for(y in goals) {
    for(x in goals[y]) {
      if(map[y][x] != 'B') {
        victory = false;
      }
    }
  }
}

function updateMap(cell,character) {
  map[cell.y] = map[cell.y].substr(0,cell.x) + character + map[cell.y].substr(cell.x+1);
}

function updateDisplay() {
  display = '';

  for(y=0;y<map.length;y++) {
    for(x=0; x<map[y].length; x++) {

      if(x==player.x && y==player.y) {
        display += '@';
      } else {
        if(goals[y] !== undefined && goals[y][x]) {
          if(map[y][x] == 'B') {
            display += 'G';
          } else {
            display += 'g';
          }
        } else {
          display += map[y][x];          
        }
      }

    }
    display += '<br>';
  }

  display += 'Level ' + (currentMap+1) + ' - ' + moves + ' moves<br>';
  display += 'Arrow keys to move, R to restart<br>';
  if(victory) {
    display += 'YOU WON!';
  }

  document.body.innerHTML = '<pre>'+display;
}


function getCell(cell) {
  if(cell.x < 0 || cell.y<0 || map[cell.y][cell.x] === undefined ) {
    return 'X';
  } else {
    cell.value = map[cell.y][cell.x];
    return cell;
  }
}

function addGoal(x,y) {
  if(!goals[y]) {
    goals[y] = [];
  }
  goals[y][x] = true;
}

document.onkeydown = checkKey;
init();
