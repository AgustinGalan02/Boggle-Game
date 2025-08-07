'use strict';

var forbidden_words = [
  'este', 'estos', 'esta', 'estas', 'ese', 'esos', 'esa', 'esas',
  'aquel', 'aquellos', 'aquella', 'aquellas', 'uno', 'una', 'unos', 'unas',
  'mis', 'tus', 'sus', 'nuestro', 'nuestros', 'nuestra', 'nuestras',
  'vuestro', 'vuestros', 'vuestra', 'vuestras', 'ella', 'usted',
  'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'ustedes',
  'nos', 'los', 'las', 'les', 'mío', 'mía', 'míos',
  'mías', 'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas', 'nuestro',
  'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras'
];

function check_word_validity_callback(is_valid) {
  if (is_valid) {
    found_words.push(current_word);
    var list_item = document.createElement('li');
    list_item.innerText = current_word;
    found_words_list.appendChild(list_item);
    update_score(current_word.length);
  } else {
    show_message('La palabra no es válida.');
    update_score(-1);
  }

  reset_current_word();
}

function check_word_validity(word, callback) {
  var url = 'https://www.wordreference.com/definicion/' + word;

  fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data, 'text/html');
      var definition = doc.querySelector('.entry');

      if (definition) {
        callback(true);
      } else {
        callback(false);
      }
    })
    .catch(function () {
      callback(false);
    });
}

function submit_word() {
  if (current_word.length < 3) {
    show_message('La palabra debe tener al menos 3 letras.');
    update_score(-1);
    reset_current_word();
    return;
  }

  if (forbidden_words.indexOf(current_word.toLowerCase()) !== -1) {
    show_message('La palabra no es válida.');
    update_score(-1);
    reset_current_word();
    return;
  }

  if (found_words.indexOf(current_word) !== -1) {
    show_message('La palabra ya ha sido encontrada.');
    update_score(-1);
    reset_current_word();
    return;
  }

  check_word_validity(current_word.toLowerCase(), check_word_validity_callback);
}
