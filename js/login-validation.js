document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;
  let mensajesAlert = [];

  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  // Limpiar mensajes de error previos en el DOM
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

  // 1. VALIDACIÓN DEL CORREO
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValue = email.value.trim();

  if (emailValue === '') {
    mostrarError(email, 'errorLoginEmail', 'Ingrese su correo.');
    valid = false;
  } else if (!regexEmail.test(emailValue)) {
    mostrarError(email, 'errorLoginEmail', 'Ingrese un correo electrónico válido.');
    valid = false;
  }

  // 2. VALIDACIÓN DE LA CONTRASEÑA
  const passwordValue = password.value;

  if (passwordValue === '') {
    mostrarError(password, 'errorLoginPassword', 'Ingrese su contraseña.');
    valid = false;
  } else if (passwordValue.length < 8) {
    mostrarError(password, 'errorLoginPassword', 'La contraseña debe tener al menos 8 caracteres.');
    valid = false;
  }

  // 3. BLOQUEO EN CASO DE ERRORES
  if (!valid) {
    return; // Detiene la ejecución aquí
  }

  // 4. SI TODO ES VÁLIDO
  console.log("¡Inicio de sesión exitoso! Redirigiendo al panel de control...");
  window.location.href = 'dashboard.html';
});

// Función auxiliar necesaria para inyectar errores en el HTML
function mostrarError(inputElement, idSpanError, mensaje) {
  const spanError = document.getElementById(idSpanError);
  if (spanError) {
    spanError.textContent = mensaje;
  }
  if (inputElement) {
    inputElement.classList.add('input-error');
  }
}