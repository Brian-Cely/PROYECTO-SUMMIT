document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;

  // Elementos
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirmPassword');

  // Limpiar errores previas
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

  // Validar Nombre
  if (nombre.value.trim() === '') {
    document.getElementById('errorNombre').textContent = 'El nombre es obligatorio.';
    valid = false;
  }

  // Validar Correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    document.getElementById('errorEmail').textContent = 'Ingrese un correo electrónico válido.';
    valid = false;
  }

  // Validar Contraseña (mínimo 6 caracteres)
  if (password.value.length < 6) {
    document.getElementById('errorPassword').textContent = 'La contraseña debe tener al menos 6 caracteres.';
    valid = false;
  }

  // Validar Confirmación
  if (password.value !== confirm.value) {
    document.getElementById('errorConfirm').textContent = 'Las contraseñas no coinciden.';
    valid = false;
  }

  if (valid) {
    alert('¡Registro exitoso! Redirigiendo al inicio de sesión...');
    window.location.href = 'login.html';
  }
// Verifica que haya texto antes del @, un dominio, un punto y una extensión
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
});