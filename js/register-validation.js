const registerForm = document.getElementById('registerForm');
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9\s]).{8,}$/;
const birthDateInput = document.getElementById('fechaNacimiento');
const birthDateError = document.getElementById('errorFechaNacimiento');
const today = new Date();
const latestBirthDate = new Date(today);
latestBirthDate.setFullYear(latestBirthDate.getFullYear() - 18);
birthDateInput.max = [
  latestBirthDate.getFullYear(),
  String(latestBirthDate.getMonth() + 1).padStart(2, '0'),
  String(latestBirthDate.getDate()).padStart(2, '0')
].join('-');

['summit_users', 'summit_user', 'summit_reservas', 'summit_pending_reservation', 'emailRecuperacion'].forEach((key) => {
  localStorage.removeItem(key);
});

function isUnderage(value) {
  if (!value) return false;
  const birthDate = new Date(`${value}T00:00:00`);
  const today = new Date();
  const adultDate = new Date(birthDate);
  adultDate.setFullYear(adultDate.getFullYear() + 18);
  return Number.isNaN(birthDate.getTime()) || adultDate > today;
}

birthDateInput.addEventListener('change', () => {
  if (isUnderage(birthDateInput.value)) {
    birthDateError.textContent = 'No se puede registrar a una persona menor de edad.';
    birthDateInput.classList.add('input-error');
    alert('No se puede registrar a una persona menor de edad.');
    return;
  }
  birthDateError.textContent = '';
  birthDateInput.classList.remove('input-error');
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = {
    nombre: document.getElementById('nombre'),
    tipoDocumento: document.getElementById('tipoDocumento'),
    numeroDocumento: document.getElementById('numeroDocumento'),
    fechaNacimiento: birthDateInput,
    telefono: document.getElementById('telefono'),
    email: document.getElementById('email'),
    password: document.getElementById('password')
  };

  document.querySelectorAll('.error-msg').forEach((element) => {
    element.textContent = '';
  });
  document.querySelectorAll('.input-error').forEach((element) => {
    element.classList.remove('input-error');
  });

  let valid = true;
  const showError = (field, message) => {
    document.getElementById(`error${field[0].toUpperCase()}${field.slice(1)}`).textContent = message;
    fields[field].classList.add('input-error');
    valid = false;
  };

  if (fields.nombre.value.trim().length < 2) {
    showError('nombre', 'Ingrese su nombre completo.');
  }
  if (!['C.C.', 'C.E.', 'Pasaporte'].includes(fields.tipoDocumento.value)) {
    showError('tipoDocumento', 'Seleccione un tipo de documento válido.');
  }
  if (!/^[\w.-]{4,}$/.test(fields.numeroDocumento.value.trim())) {
    showError('numeroDocumento', 'Ingrese un número de documento válido.');
  }
  if (!fields.fechaNacimiento.value) {
    showError('fechaNacimiento', 'Ingrese su fecha de nacimiento.');
  } else if (isUnderage(fields.fechaNacimiento.value)) {
    showError('fechaNacimiento', 'No se puede registrar a una persona menor de edad.');
    alert('No se puede registrar a una persona menor de edad.');
  }
  if (fields.telefono.value.trim().replace(/\D/g, '').length < 7) {
    showError('telefono', 'Ingrese un teléfono de contacto válido.');
  }
  const emailValue = fields.email.value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    showError('email', 'Ingrese un correo electrónico válido.');
  }
  if (!strongPasswordPattern.test(fields.password.value)) {
    showError('password', 'Use mínimo 8 caracteres, con mayúscula, minúscula y un símbolo.');
  }
  if (!valid) return;

  alert('Validación completada. Este registro es una demostración y no guarda tus datos.');
  window.location.href = 'login.html';
});
