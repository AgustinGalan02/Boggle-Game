'use strict';

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var boggleBoard = document.getElementById('boggle-board');
var gameBoard = [];
var currentWord = '';
var lastSelectedCell = null;

// Genera un tablero de tamaño 'y' x 'y'
function generateBoard(size) {
  boggleBoard.innerHTML = '';
  gameBoard = [];
  var cells = size * size;
  boggleBoard.style.gridTemplateColumns = 'repeat(' + size + ', 50px)';

  for (var i = 0; i < cells; i++) {
    var cell = document.createElement('div');
    cell.className = 'boggle-cell';
    cell.innerText = letters.charAt(Math.floor(Math.random() * letters.length));
    cell.addEventListener('click', selectLetter);
    boggleBoard.appendChild(cell);
    gameBoard.push(cell);
  }
}

// funcion para seleccionar letras
function selectLetter(event) {
  var cell = event.target;
  if (cell.classList.contains('selected')) {
    return;
  }

  var boardSize = Math.sqrt(gameBoard.length);

  if (lastSelectedCell && !isContiguous(cell, lastSelectedCell, boardSize)) {
    showMessage('Las letras deben ser contiguas.');
    return;
  }

  cell.classList.add('selected');
  if (lastSelectedCell) {
    lastSelectedCell.classList.remove('last-selected');
  }
  cell.classList.add('last-selected');
  currentWord += cell.innerText;
  updateCurrentWordDisplay(currentWord);
  lastSelectedCell = cell;
  highlightContiguousCells(cell, boardSize);
}

// Verifica si dos celdas son adyacentes (contiguas) en el tablero
function isContiguous(cell1, cell2, boardSize) {
  var index1 = Array.prototype.indexOf.call(boggleBoard.children, cell1);
  var index2 = Array.prototype.indexOf.call(boggleBoard.children, cell2);
  var row1 = Math.floor(index1 / boardSize);
  var col1 = index1 % boardSize;
  var row2 = Math.floor(index2 / boardSize);
  var col2 = index2 % boardSize;
  return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
}

// Resalta las celdas contiguas a la celda actual
function highlightContiguousCells(cell, boardSize) {
  Array.prototype.forEach.call(boggleBoard.children, function(c) {
    if (isContiguous(c, cell, boardSize) && !c.classList.contains('selected')) {
      c.classList.add('contiguous');
    } else {
      c.classList.remove('contiguous');
    }
  });
}

// funcion a implementar en otro js
function updateCurrentWordDisplay(word) {
  var currentWordDisplay = document.getElementById('current-word');
  if (currentWordDisplay) {
    currentWordDisplay.innerText = word;
  }
}
