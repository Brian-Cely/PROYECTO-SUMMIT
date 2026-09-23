document.addEventListener('DOMContentLoaded', function() {
const recoverForm = document.getElementById('recoverForm');
const emailInput = document.getElementById('recoverEmail');
const errorEmail = document.getElementById('errorRecoverEmail');
const successMsg = document.getElementById('successMsg'); // Opcional: para mostrar mensaje en pantalla



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

    // Si la validación es exitosa
    if (valid) {
      // Simular guardado temporal del correo en localStorage por si se requiere
    localStorage.setItem('emailRecuperacion', emailValue);

      // Si tienes un contenedor de éxito en el HTML, puedes usarlo, de lo contrario usamos alert
    if (successMsg) {
        successMsg.textContent = `Hemos enviado las instrucciones de recuperación a: ${emailValue}`;
        successMsg.style.display = 'block';
        recoverForm.reset();
    } else {
        //alert(`Hemos enviado las instrucciones de recuperación a: ${emailValue}`);
        window.location.href = 'login.html'; // Redirigir al login tras aceptar
    }
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
    if (successMsg) {
    successMsg.style.display = 'none';
    }
}

  // Expresión regular para validar correos
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
});