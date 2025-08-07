'use strict';

// Actualiza el puntaje del jugador
function update_score(word_length, calculating_best_word) {
    var points = 0;

    // Si la palabra es inválida, penalizar (valor negativo)
    if (word_length < 0) {
        score += word_length;

        if (score < 0) {
            score = 0;
        }

        score_display.innerHTML = 'Puntuación: ' + score;
        return word_length;
    }

    // Calcular puntos según longitud de la palabra válida
    if (word_length === 3 || word_length === 4) {
        points = 1;
    } else if (word_length === 5) {
        points = 2;
    } else if (word_length === 6) {
        points = 3;
    } else if (word_length === 7) {
        points = 5;
    } else if (word_length >= 8) {
        points = 11;
    }

    // Sumar al puntaje si no es cálculo del mejor movimiento
    if (!calculating_best_word) {
        score += points;
        score_display.innerHTML = 'Puntuación: ' + score;
    }

    return points;
}
