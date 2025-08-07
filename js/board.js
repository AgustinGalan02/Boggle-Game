'use strict';

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var selected_cells = [];
var game_board = [];
var current_word = '';
var last_selected_cell = null;
var board_size = 4;


//funcion para verificar si dos celdas son contiguas
function is_contiguous(cell1, cell2, board_size) {

  // buscamos indice de cada celda dentro del tablero
  var index1 = Array.prototype.indexOf.call(boggle_board.children, cell1);
  var index2 = Array.prototype.indexOf.call(boggle_board.children, cell2);

  // si alguna celda no esta en el tablero, no son contiguas
  if (index1 === -1 || index2 === -1) {
    return false;
  }

  //calcular fila y columna de cada celda segun el indice y tamaño del tablero
  var row1 = Math.floor(index1 / board_size); // ejemplo: row1 = 6 (indice) / 4 = 1 (fila 1)
  var col1 = index1 % board_size; // ejemplo: col1 = 6 (indice) % 4 (tamaño tablero) = 2 (columna 2)
  var row2 = Math.floor(index2 / board_size);
  var col2 = index2 % board_size;

  // true = filas y columnas cerca
  return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
}

// resalta las celdas contiguas a la celda actual
function highlight_contiguous_cells(cell, board_size) {
  function toggle_contiguous(c) {

    // si no hay celda base, borra posibilidades
    if (!cell) {
      c.classList.remove('contiguous');
      return;
    }

  // añade "posible seleccion" en caso de que sea contigua y no este seleccionada
    if (is_contiguous(c, cell, board_size) && !c.classList.contains('selected')) {
      c.classList.add('contiguous');
    } else {
      c.classList.remove('contiguous');
    }
  }
  // se aplica a todas las celdas
  Array.prototype.forEach.call(boggle_board.children, toggle_contiguous);
}


function select_letter(event) {
  var cell = event.target;

  if (cell.classList.contains('selected')) {
    
    // funcion para que solo se pueda deseleccionar la ultima celda seleccionada
    if (cell === selected_cells[selected_cells.length - 1]) {
      cell.classList.remove('selected', 'last_selected');
      selected_cells.pop();
      current_word = current_word.slice(0, -1);
      current_word_display.innerText = current_word;

      // actualiza la ultima celda seleccionada
      if (selected_cells.length > 0) {
        var last = selected_cells[selected_cells.length - 1];
        last.classList.add('last_selected');
        last_selected_cell = last;
      } else {
        last_selected_cell = null;
      }

      // actualiza resaltado de celdas contiguas
      highlight_contiguous_cells(last_selected_cell, board_size);
    }
    return;
  }

  // si se selecciona celda no contigua
  if (last_selected_cell && !is_contiguous(cell, last_selected_cell, board_size)) {
    show_message('Las letras deben ser contiguas.');
    return;
  }

  // se selecciona la celda, se actualizan las clases y palabras actuales
  cell.classList.add('selected');
  if (last_selected_cell) {
    last_selected_cell.classList.remove('last_selected');
  }

  cell.classList.add('last_selected');
  selected_cells.push(cell);
  current_word += cell.innerText;
  current_word_display.innerText = current_word;
  last_selected_cell = cell;

  // resalta las celdas contiguas para la ultima letra seleccionada
  highlight_contiguous_cells(cell, board_size);
}

// generar tablero 4x4. Se asignan letras aleatorias
function generate_board(size) {
  boggle_board.innerHTML = '';
  game_board = [];
  var cells = size * size;
  
  for (var i = 0; i < cells; i++) {
    var cell = document.createElement('div');
    cell.className = 'boggle_cell';

    //asigna letras aleatorias A-Z
    cell.innerText = letters.charAt(Math.floor(Math.random() * letters.length));
    
    cell.addEventListener('click', select_letter);

    // añade celdas al DOM y el array que seria el tablero
    boggle_board.appendChild(cell);
    game_board.push(cell);
  }
}

// borra la palabra actual y las selecciones
function reset_current_word() {
  current_word = '';
  current_word_display.innerText = '';
  last_selected_cell = null;

  // borra la "clase" seleccionadas de todas las celdas
  var selected_cells_html = document.getElementsByClassName('selected');
  while (selected_cells_html.length > 0) {
    selected_cells_html[0].classList.remove('selected', 'last_selected');
  }

  // quita la "clase" resaltado contiguo de todas las celdas
  Array.prototype.forEach.call(boggle_board.children, function (c) {
    c.classList.remove('contiguous');
  });
  selected_cells = [];
}

//guarda las letras en un array
function reset_board() {
  var letters_array = [];
  game_board.forEach(function (cell) {
    letters_array.push(cell.innerText);
  });

  // mezcla el array usando fisher yates
  for (var i = letters_array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = letters_array[i];
    letters_array[i] = letters_array[j];
    letters_array[j] = temp;
  }

  // asigna las letras mezcladas a las celdas
  game_board.forEach(function (cell, index) {
    cell.innerText = letters_array[index];
  });
  reset_current_word();
}
