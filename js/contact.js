'use strict';

// Variables globales
var form = document.getElementById('contact_form');
var modal = document.getElementById('message_modal');
var modal_text = document.getElementById('message_text');
var close_modal_buttons = document.getElementsByClassName('close');
var back = document.getElementById('back_button');

var name_regex = /^[a-zA-Z0-9\s]+$/;
var email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Funcion modal
function show_modal(message) {
    modal_text.textContent = message;
    modal.style.display = 'flex';
}

// Funcion cerrar modal
function close_modal() {
    modal.style.display = 'none';
}

// Función para enviar el correo
function send_email(name, message) {
    var destination_email = 'agustingalan4@gmail.com';
    var subject = encodeURIComponent('Contacto Boggle Game - ' + name);
    var body = encodeURIComponent(message + '\n\n' + 'Desde ya muchas gracias, ' + name);
    var mail_to_link = 'mailto:' + destination_email + '?subject=' + subject + '&body=' + body;
    window.open(mail_to_link);
}

// Función para validar el formulario
function validate_form(event) {
    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        show_modal('Por favor, completa todos los campos.');
        return;
    }

    if (!name_regex.test(name)) {
        show_modal('El nombre debe ser alfanumérico.');
        return;
    }

    if (!email_regex.test(email)) {
        show_modal('El correo electrónico no es válido.');
        return;
    }

    if (message.length <= 5) {
        show_modal('El mensaje debe tener más de 5 caracteres.');
        return;
    }

    send_email(name, message);
    form.reset();
}

// Función para volver al inicio
function go_back() {
    window.location.href = 'index.html';
}

// Función que asigna los listeners al cargar el DOM
function initialize_event_listeners() {
    var i;
    for (i = 0; i < close_modal_buttons.length; i++) {
        close_modal_buttons[i].addEventListener('click', close_modal);
    }

    form.addEventListener('submit', validate_form);

    if (back !== null) {
        back.addEventListener('click', go_back);
    }
}

document.addEventListener('DOMContentLoaded', initialize_event_listeners);
