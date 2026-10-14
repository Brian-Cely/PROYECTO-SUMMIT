document.addEventListener('DOMContentLoaded', function() {
['summit_users', 'summit_user', 'summit_reservas', 'summit_pending_reservation', 'emailRecuperacion'].forEach((key) => {
  localStorage.removeItem(key);
});
const recoverForm = document.getElementById('recoverForm');
const emailInput = document.getElementById('recoverEmail');
const errorEmail = document.getElementById('errorRecoverEmail');

if (!recoverForm) return;

recoverForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Detener el envío automático del formulario

    // Limpiar mensajes de error previos
    limpiarErrores();

    let valid = true;
    const emailValue = emailInput.value.trim();

    // Validar campo vacío
    if (emailValue === '') {
    mostrarError(emailInput, errorEmail, 'El correo electrónico es obligatorio');
    valid = false;
    }
    // Validar formato de correo electrónico con expresión regular
    else if (!validarEmail(emailValue)) {
    mostrarError(emailInput, errorEmail, 'Ingresa un correo electrónico válido (ejemplo@correo.com)');
    valid = false;
    }

    // La recuperación es solo una demostración; no se conserva el correo.
    if (valid) {
    alert('Correo validado. La recuperación es una demostración y no guarda tus datos.');
    window.location.href = 'login.html';
    }
});

  // Limpiar mensaje de error cuando el usuario empieza a escribir nuevamente
emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('input-error')) {
    limpiarErrores();
    }
});

  // Función auxiliar para mostrar errores
function mostrarError(input, spanError, mensaje) {
    input.classList.add('input-error');
    spanError.textContent = mensaje;
}

  // Función auxiliar para limpiar errores
function limpiarErrores() {
    emailInput.classList.remove('input-error');
    errorEmail.textContent = '';
}

  // Expresión regular para validar correos
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
});