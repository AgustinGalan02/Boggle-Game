'use strict';

var timer = null;
var game_duration = 0;
var game_time = 0;

// Elementos DOM
var player_name_input = document.getElementById('player_name');
var timer_select = document.getElementById('timer_select');
var boggle_board = document.getElementById('boggle_board');
var current_word_display = document.getElementById('current_word');
var found_words_list = document.getElementById('found_words');
var message_modal = document.getElementById('message_modal');
var message_text = document.getElementById('message_text');
var final_score_display = document.getElementById('final_score');
var score_display = document.getElementById('score');
var feedback = document.getElementById('result_container');
var h1 = document.querySelector('h1');
var game_area_section = document.querySelector('.game_area');
var show_ranking_button = document.getElementById('show_ranking');
var contact_button = document.getElementById('contact');
var word_list = document.getElementById('word_list');

var timer_element = document.getElementById('timer');
var submit_word_element = document.getElementById('submit_word');
var reset_word_element = document.getElementById('reset_word');
var end_game_element = document.getElementById('end_game');
var total_words_element = document.getElementById('total_words');
var result_container = document.getElementById('result_container');
var game_setup_section = document.querySelector('.game_setup');

// Estado del juego
var game_board = [];
var current_word = '';
var found_words = [];
var score = 0;
var last_selected_cell = null;

// Ocultar botones al inicio
timer_element.style.display = 'none';
submit_word_element.style.display = 'none';
reset_word_element.style.display = 'none';
end_game_element.style.display = 'none';

function initialize_game() {
    player_name_input.value = '';
    timer_select.value = '1';
    boggle_board.innerHTML = '';
    current_word_display.innerHTML = '';
    found_words_list.innerHTML = '';
    score_display.innerHTML = 'Puntuación: 0';
    game_board = [];
    current_word = '';
    found_words = [];
    score = 0;
    last_selected_cell = null;
    game_area_section.style.display = 'none';
    clearInterval(timer);

    word_list.style.display = 'none';
    score_display.style.display = 'none';
    feedback.style.display = 'none';
    h1.style.display = 'block';
    show_ranking_button.style.display = 'block';
    contact_button.style.display = 'block';
}

function start_game() {
    if (player_name_input.value.length < 3) {
        show_message('El nombre del jugador debe tener al menos 3 letras.');
        return;
    } else {
        h1.innerText = '¡BUENA SUERTE!';
    }

    show_ranking_button.style.display = 'none';
    contact_button.style.display = 'none';

    game_duration = parseInt(timer_select.value, 10) * 60;
    game_time = game_duration;

    generate_board(4);
    update_timer();
    timer = setInterval(update_timer, 1000);

    word_list.style.display = 'block';
    score_display.style.display = 'block';

    game_setup_section.style.display = 'none';
    game_area_section.style.display = 'flex';

    timer_element.style.display = 'block';
    submit_word_element.style.display = 'inline-block';
    reset_word_element.style.display = 'inline-block';
    end_game_element.style.display = 'inline-block';
}

function play_again() {
    close_modal();
    initialize_game();
    game_setup_section.style.display = 'flex';
    game_area_section.style.display = 'none';
    h1.innerText = 'BOGGLE GAME';
    show_ranking_button.style.display = 'block';
    contact_button.style.display = 'block';
    feedback.style.display = 'none';
}

function end_game() {
    game_area_section.style.display = 'none';
    game_setup_section.style.display = 'none';

    result_container.style.display = 'block';
    total_words_element.innerText = 'Total de palabras: ' + found_words.length;

    h1.innerText = 'RESULTADOS';

    if (found_words.length === 0) {
        found_words_list.innerText = '¡No se encontro ninguna palabra!';
    }
}

function finish_game() {
    clearInterval(timer);
    end_game();
    h1.innerText = 'RESULTADOS';

    if (found_words.length === 0) {
        found_words_list.innerText = '¡No se encontro ninguna palabra!';
    }
}

function show_message(message) {
    message_text.innerText = message;
    message_modal.style.display = 'block';
}

function close_modal() {
    message_modal.style.display = 'none';
    ranking_modal.style.display = 'none';
}
