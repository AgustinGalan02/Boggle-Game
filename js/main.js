'use strict';

// === Obtener elementos del DOM ===
var start_game_button = document.getElementById('start_game');
var submit_word_button = document.getElementById('submit_word');
var play_again_button = document.getElementById('play_again');
var show_ranking_button = document.getElementById('show_ranking');
var sort_by_score_button = document.getElementById('sort_by_score');
var sort_by_date_button = document.getElementById('sort_by_date');
var reset_word_button = document.getElementById('reset_word');
var end_game_button = document.getElementById('end_game');
var close_modal_buttons = document.getElementsByClassName('close');
var contact_button = document.getElementById('contact');
var ranking_modal = document.getElementById('ranking_modal');

// === Asignar eventos ===
start_game_button.addEventListener('click', start_game);
submit_word_button.addEventListener('click', submit_word);
play_again_button.addEventListener('click', play_again);
show_ranking_button.addEventListener('click', handle_show_ranking);
sort_by_score_button.addEventListener('click', handle_sort_by_score);
sort_by_date_button.addEventListener('click', handle_sort_by_date);
reset_word_button.addEventListener('click', reset_board);
end_game_button.addEventListener('click', finish_game);
contact_button.addEventListener('click', go_to_contact_page);

//cerrar modales
Array.prototype.forEach.call(close_modal_buttons, add_close_modal_listener);

// === Inicializar juego ===
initialize_game();


// === FUNCIONES DE EVENTOS ===

function handle_show_ranking() {
    show_ranking();
}

function handle_sort_by_score() {
    sort_by_score();
}

function handle_sort_by_date() {
    sort_by_date();
}

function add_close_modal_listener(button) {
    button.addEventListener('click', close_modal);
}

function add_close_modal_2_listener(button) {
    button.addEventListener('click', close_modal_2);
}

function add_close_ranking_modal_listener(button) {
    button.addEventListener('click', hide_ranking_modal);
}

function handle_click_outside_modal(event) {
    if (event.target === ranking_modal) {
        hide_ranking_modal();
    }
}

function go_to_contact_page() {
    window.location.href = 'contact.html';
}

function hide_ranking_modal() {
    ranking_modal.style.display = 'none';
}


// === FUNCIÓN DE TERMINAR JUEGO ===

function finish_game() {
    clearInterval(timer); // detiene el temporizador

    var player_name_input = document.getElementById('player_name');
    var player_name = player_name_input.value.trim();

    save_game_result(player_name, score); // se guarda la puntuacion y nombre en la funcion de ranking
    end_game(); // se termina el juego y se muestran los resultados
}
