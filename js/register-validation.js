const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;

  // Elementos
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const userRole = document.getElementById('userRole');

  // Limpiar errores previos
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

  // Validar Nombre
  if (nombre.value.trim() === '') {
    mostrarError(nombre, 'errorNombre', 'El nombre es obligatorio.');
    valid = false;
  }

  // Validar Correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    mostrarError(email, 'errorEmail', 'Ingrese un correo electrónico válido.');
    valid = false;
  }

  // Validar Contraseña (mínimo 6 caracteres)
  if (password.value.length < 6) {
    mostrarError(password, 'errorPassword', 'La contraseña debe tener al menos 6 caracteres.');
    valid = false;
  }

  if (userRole.value === '') {
    mostrarError(userRole, 'errorUserRole', 'Seleccione un tipo de usuario.');
    valid = false;
  }

  if (valid) {
    alert('¡Registro exitoso! Redirigiendo al inicio de sesión...');
    window.location.href = 'login.html';
  }
});

function mostrarError(inputElement, idSpanError, mensaje) {
  const errorElement = document.getElementById(idSpanError);
  errorElement.textContent = mensaje;
  inputElement.classList.add('input-error');
}