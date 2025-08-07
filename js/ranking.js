'use strict';

var ranking_list = document.getElementById('ranking_list');
var ranking_modal = document.getElementById('ranking_modal');

function save_game_result(player_name, player_score) {
  var game_results = JSON.parse(localStorage.getItem('game_results')) || [];
  var result = {
    player: player_name,
    score: player_score,
    date: new Date().toISOString()
  };

  game_results.push(result);
  localStorage.setItem('game_results', JSON.stringify(game_results));
}

function create_list_item_text(result) {
  var date_str = new Date(result.date).toLocaleString();
  return result.player + ' - ' + result.score + ' pts - ' + date_str;
}

function render_ranking_list(game_results) {
  ranking_list.innerHTML = '';

  if (game_results.length === 0) {
    ranking_list.innerHTML = '<li>No hay resultados guardados aún.</li>';
    return;
  }

  game_results.forEach(function (result) {
    var list_item = document.createElement('li');
    list_item.innerText = create_list_item_text(result);
    ranking_list.appendChild(list_item);
  });
}

function sort_results_by_score(a, b) {
  return b.score - a.score;
}

function sort_results_by_date(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function show_ranking() {
  var game_results = JSON.parse(localStorage.getItem('game_results')) || [];
  game_results.sort(sort_results_by_score);
  render_ranking_list(game_results);
  ranking_modal.style.display = 'block';
}

function sort_by_score() {
  var game_results = JSON.parse(localStorage.getItem('game_results')) || [];
  game_results.sort(sort_results_by_score);
  render_ranking_list(game_results);
}

function sort_by_date() {
  var game_results = JSON.parse(localStorage.getItem('game_results')) || [];
  game_results.sort(sort_results_by_date);
  render_ranking_list(game_results);
}
