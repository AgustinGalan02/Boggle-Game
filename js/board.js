'use strict';

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var selected_cells = [];
var game_board = [];
var current_word = '';
var last_selected_cell = null;

function is_contiguous(cell1, cell2, board_size) {
  var index1 = Array.prototype.indexOf.call(boggle_board.children, cell1);
  var index2 = Array.prototype.indexOf.call(boggle_board.children, cell2);
  if (index1 === -1 || index2 === -1) {
    return false;
  }
  var row1 = Math.floor(index1 / board_size);
  var col1 = index1 % board_size;
  var row2 = Math.floor(index2 / board_size);
  var col2 = index2 % board_size;
  return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
}

function highlight_contiguous_cells(cell, board_size) {
  function toggle_contiguous(c) {
    if (!cell) {
      c.classList.remove('contiguous');
      return;
    }
    if (is_contiguous(c, cell, board_size) && !c.classList.contains('selected')) {
      c.classList.add('contiguous');
    } else {
      c.classList.remove('contiguous');
    }
  }
  Array.prototype.forEach.call(boggle_board.children, toggle_contiguous);
}

function select_letter(event) {
  var cell = event.target;
  var board_size = Math.sqrt(game_board.length);

  if (cell.classList.contains('selected')) {
    if (cell === selected_cells[selected_cells.length - 1]) {
      cell.classList.remove('selected', 'last_selected');
      selected_cells.pop();
      current_word = current_word.slice(0, -1);
      current_word_display.innerText = current_word;
      if (selected_cells.length > 0) {
        var last = selected_cells[selected_cells.length - 1];
        last.classList.add('last_selected');
        last_selected_cell = last;
      } else {
        last_selected_cell = null;
      }
      highlight_contiguous_cells(last_selected_cell, board_size);
    }
    return;
  }

  if (last_selected_cell && !is_contiguous(cell, last_selected_cell, board_size)) {
    show_message('Las letras deben ser contiguas.');
    return;
  }

  cell.classList.add('selected');
  if (last_selected_cell) {
    last_selected_cell.classList.remove('last_selected');
  }
  cell.classList.add('last_selected');
  selected_cells.push(cell);
  current_word += cell.innerText;
  current_word_display.innerText = current_word;
  last_selected_cell = cell;
  highlight_contiguous_cells(cell, board_size);
}

function generate_board(size) {
  boggle_board.innerHTML = '';
  game_board = [];
  var cells = size * size;
  boggle_board.style.display = 'flex';
  boggle_board.style.flexWrap = 'wrap';
  for (var i = 0; i < cells; i++) {
    var cell = document.createElement('div');
    cell.className = 'boggle_cell';
    cell.innerText = letters.charAt(Math.floor(Math.random() * letters.length));
    cell.addEventListener('click', select_letter);
    boggle_board.appendChild(cell);
    game_board.push(cell);
  }
}

function reset_current_word() {
  current_word = '';
  current_word_display.innerText = '';
  last_selected_cell = null;
  var selected_cells_html = document.getElementsByClassName('selected');
  while (selected_cells_html.length > 0) {
    selected_cells_html[0].classList.remove('selected', 'last_selected');
  }
  Array.prototype.forEach.call(boggle_board.children, function (c) {
    c.classList.remove('contiguous');
  });
  selected_cells = [];
}

function reset_board() {
  var letters_array = [];
  game_board.forEach(function (cell) {
    letters_array.push(cell.innerText);
  });
  for (var i = letters_array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = letters_array[i];
    letters_array[i] = letters_array[j];
    letters_array[j] = temp;
  }
  game_board.forEach(function (cell, index) {
    cell.innerText = letters_array[index];
  });
  reset_current_word();
}
