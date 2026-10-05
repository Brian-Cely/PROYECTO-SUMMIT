document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;

  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  const userRole = document.getElementById('userRole');

  // Limpiar mensajes de error previos en el DOM
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

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

  if (userRole.value === '') {
    mostrarError(userRole, 'errorUserRole', 'Seleccione un tipo de usuario.');
    valid = false;
  }

  // 3. BLOQUEO EN CASO DE ERRORES
  if (!valid) {
    return; // Detiene la ejecución aquí
  }

  // Redirigir según el rol seleccionado
  const dashboard = userRole.value === 'administrador'
    ? 'dashboard-admin.html'
    : 'dashboard-cliente.html';
  window.location.href = dashboard;
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