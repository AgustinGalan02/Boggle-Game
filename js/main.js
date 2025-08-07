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
var close_modal_buttons_2 = document.getElementsByClassName('close_2');
var contact_button = document.getElementById('contact');

var ranking_modal = document.getElementById('ranking_modal');
var close_buttons = ranking_modal.getElementsByClassName('close');

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

Array.prototype.forEach.call(close_modal_buttons, add_close_modal_listener);
Array.prototype.forEach.call(close_modal_buttons_2, add_close_modal_2_listener);
Array.prototype.forEach.call(close_buttons, add_close_ranking_modal_listener);

window.addEventListener('click', handle_click_outside_modal);

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
    clearInterval(timer);

    var player_name_input = document.getElementById('player_name');
    var player_name = player_name_input.value.trim();

    if (player_name.length < 3) {
        show_message('Por favor, ingresa un nombre válido (3 o más caracteres) para guardar el resultado.');
        return;
    }

    save_game_result(player_name, score);
    end_game(); // Mostrar sección de resultados
}
