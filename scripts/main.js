'use strict';

// Variables
var timer;
var gameDuration = 60; 
var gameTime = 0;

var playerNameInput = document.getElementById('player-name');
var timerSelect = document.getElementById('timer-select');

var startGameButton = document.getElementById('start-game');
var playAgainButton = document.getElementById('play-again');
var timerDisplay = document.getElementById('timer');
var gameArea = document.querySelector('.game-area');
var gameSetup = document.querySelector('.game-setup');
var h1 = document.getElementById('h1');
var showRankingButton = document.getElementById('show-ranking');
var contacto = document.getElementById('contacto');

function initializeGame() {
  // Reset interfaz
  playerNameInput.value = '';
  timerSelect.value = '1';
  timerDisplay.innerText = '01:00';
  gameTime = 0;
  clearInterval(timer);

  // Ocultar/mostrar elementos
  gameArea.style.display = 'none';
  gameSetup.style.display = 'flex';
  showRankingButton.style.display = 'block';
  contacto.style.display = 'block';
  h1.innerText = 'MENU';

  // Limpiar tablero y variables internas
  if (typeof resetCurrentWord === 'function') {
    resetCurrentWord();
  }
  if (typeof generateBoard === 'function') {
    generateBoard(4); 
  }
}

function startGame() {
  h1.innerText = '¡BUENA SUERTE!';
  showRankingButton.style.display = 'none';
  contacto.style.display = 'none';

  if (playerNameInput.value.length < 3) {
    if (typeof showMessage === 'function') {
      showMessage('El nombre del jugador debe tener al menos 3 letras.');
    }
    return;
  }

  gameDuration = parseInt(timerSelect.value, 10) * 60;
  gameTime = gameDuration;

  if (typeof generateBoard === 'function') {
    generateBoard(4);
  }

  updateTimerDisplay();
  timer = setInterval(updateTimer, 1000);

  gameSetup.style.display = 'none';
  gameArea.style.display = 'flex';
}

function updateTimer() {
  if (gameTime <= 0) {
    clearInterval(timer);
    if (typeof finishGame === 'function') {
      finishGame();
    }
    return;
  }
  gameTime--;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  var minutes = Math.floor(gameTime / 60);
  var seconds = gameTime % 60;
  timerDisplay.innerText =
    (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}


function setupEventListeners() {
  startGameButton.addEventListener('click', startGame);
  playAgainButton.addEventListener('click', playAgain);

  if (typeof contacto !== 'undefined' && contacto !== null) {
    contacto.addEventListener('click', function () {
      window.location.href = 'contacto.html';
    });
  }
}

function playAgain() {
  if (typeof closeModal === 'function') {
    closeModal();
  }
  initializeGame();
}

document.addEventListener('DOMContentLoaded', function () {
  setupEventListeners();
  initializeGame();
});