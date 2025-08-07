'use strict';

var is_alert_playing = false;
var timer_display = document.getElementById('timer');

function play_alert_sound_ended() {
  is_alert_playing = false;
}

function play_alert_sound() {
  is_alert_playing = true;
  var audio = new Audio('/audio/alert.mp3');
  audio.play();
  audio.onended = play_alert_sound_ended;
}

function update_timer() {
  if (game_time === 0) {
    clearInterval(timer);
    finish_game();
    return;
  }

  game_time--;
  var minutes = Math.floor(game_time / 60);
  var seconds = game_time % 60;

  timer_display.innerText = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

  if (game_time <= 10 && !is_alert_playing) {
    timer_display.classList.add('warning');
    play_alert_sound();
  } else if (game_time > 10) {
    timer_display.classList.remove('warning');
  }
}
