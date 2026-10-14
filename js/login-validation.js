['summit_users', 'summit_user', 'summit_reservas', 'summit_pending_reservation', 'emailRecuperacion'].forEach((key) => {
  localStorage.removeItem(key);
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  document.querySelectorAll('.input-error').forEach((element) => {
    element.classList.remove('input-error');
  });

  const emailValue = email.value.trim().toLowerCase();
  let valid = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    document.getElementById('errorLoginEmail').textContent = 'Ingrese un correo electrónico válido.';
    email.classList.add('input-error');
    valid = false;
  } else {
    document.getElementById('errorLoginEmail').textContent = '';
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9\s]).{8,}$/.test(password.value)) {
    document.getElementById('errorLoginPassword').textContent =
      'Use mínimo 8 caracteres, con mayúscula, minúscula y un símbolo.';
    password.classList.add('input-error');
    valid = false;
  } else {
    document.getElementById('errorLoginPassword').textContent = '';
  }
  if (!valid) return;

  alert('Validación completada. El inicio de sesión es una demostración y no guarda tus datos.');
  window.location.href = 'dashboard-cliente.html';
});
