"use strict";

var form = document.getElementById('contact-form');
var modal = document.getElementById('modal');
var modalText = document.getElementById('modal_message');
var closeModalBtn = document.getElementById('close_modal');
var back = document.getElementById('back_button');

function show_modal(message) {
  modalText.textContent = message;
  modal.style.display = 'flex';
}

function close_modal() {
  modal.style.display = 'none';
}

function validateForm(e) {
  e.preventDefault();
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var nameRegex = /^[a-zA-Z0-9\s]+$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    show_modal('Por favor, completa todos los campos.');
    return;
  }

  if (!nameRegex.test(name)) {
    show_modal('El nombre debe ser alfanumérico.');
    return;
  }

  if (!emailRegex.test(email)) {
    show_modal('El correo electrónico no es válido.');
    return;
  }

  if (message.length <= 5) {
    show_modal('El mensaje debe tener más de 5 caracteres.');
    return;
  }

  sendEmail(name, message);
  form.reset();
}

function sendEmail(name, message) {
  var destinationEmail = 'agustingalan4@gmail.com';
  var subject = encodeURIComponent('Contacto Boggle Game - ' + name);
  var body = encodeURIComponent(message + '\n\n' + 'Desde ya muchas gracias, ' + name);
  var mailtoLink = 'mailto:' + destinationEmail + '?subject=' + subject + '&body=' + body;
  window.location.href = mailtoLink;
}

function goBack() {
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  closeModalBtn.addEventListener('click', close_modal);
  form.addEventListener('submit', validateForm);
  if (back) {
    back.addEventListener('click', goBack);
  }
});
