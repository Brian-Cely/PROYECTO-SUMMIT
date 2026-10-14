const reservationDialog = document.getElementById('reservationModal');
const reservationForm = document.getElementById('reservationForm');
const travelDate = document.getElementById('travelDate');
const adultCount = document.getElementById('adultCount');
const childCount = document.getElementById('childCount');
const seniorCount = document.getElementById('seniorCount');
const paymentMethod = document.getElementById('paymentMethod');
const numberFormat = new Intl.NumberFormat('es-CO');
let selectedPackage = null;

['summit_users', 'summit_user', 'summit_reservas', 'summit_pending_reservation', 'emailRecuperacion'].forEach((key) => {
  localStorage.removeItem(key);
});

function getTodayDate() {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
}

function updateReservationTotal() {
  if (!selectedPackage) return;
  const totalTravellers = Number(adultCount.value || 0) +
    Number(childCount.value || 0) +
    Number(seniorCount.value || 0);
  const total = selectedPackage.basePrice * totalTravellers;
  document.getElementById('travellerSummary').textContent =
    `${totalTravellers} ${totalTravellers === 1 ? 'viajero' : 'viajeros'}`;
  document.getElementById('reservationTotal').textContent = `$${numberFormat.format(total)} COP`;
}

function openReservation(packageInfo) {
  selectedPackage = packageInfo;
  reservationForm.reset();
  adultCount.value = '1';
  childCount.value = '0';
  seniorCount.value = '0';
  travelDate.min = getTodayDate();
  document.getElementById('reservationTitle').textContent = 'Reservar paquete';
  document.getElementById('reservationPackageName').textContent =
    `${packageInfo.title} · $${numberFormat.format(packageInfo.basePrice)} COP por viajero`;
  document.getElementById('reservationForm').hidden = false;
  document.querySelectorAll('#reservationForm .error-msg').forEach((element) => {
    element.textContent = '';
  });
  updateReservationTotal();
  reservationDialog.showModal();
}

document.querySelectorAll('.reserve-button').forEach((button) => {
  button.addEventListener('click', () => {
    openReservation({
      packageId: button.dataset.packageId,
      title: button.dataset.packageTitle,
      basePrice: Number(button.dataset.basePrice)
    });
  });
});

const searchParams = new URLSearchParams(window.location.search);
const requestedPackage = searchParams.get('destino');
const requestedDate = searchParams.get('fecha');
if (requestedPackage) {
  const matchingButton = Array.from(document.querySelectorAll('.reserve-button')).find(
    (button) => button.dataset.packageId === requestedPackage
  );
  if (matchingButton) {
    openReservation({
      packageId: matchingButton.dataset.packageId,
      title: matchingButton.dataset.packageTitle,
      basePrice: Number(matchingButton.dataset.basePrice)
    });
    if (requestedDate && requestedDate >= getTodayDate()) {
      travelDate.value = requestedDate;
    }
  }
}

[adultCount, childCount, seniorCount].forEach((input) => {
  input.addEventListener('input', updateReservationTotal);
});

reservationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('errorTravelDate').textContent = '';
  document.getElementById('errorPaymentMethod').textContent = '';

  const dateValue = travelDate.value;
  const dateError = document.getElementById('errorTravelDate');
  if (!dateValue || dateValue < getTodayDate()) {
    dateError.textContent = 'Selecciona una fecha de viaje igual o posterior a hoy.';
    travelDate.classList.add('input-error');
    travelDate.focus();
    return;
  }
  travelDate.classList.remove('input-error');

  const counts = [adultCount, childCount, seniorCount].map((input) => Number(input.value));
  const countsAreValid = counts.every(Number.isInteger) &&
    counts[0] >= 1 && counts[1] >= 0 && counts[2] >= 0;
  if (!countsAreValid) {
    [adultCount, childCount, seniorCount].forEach((input) => {
      input.classList.toggle('input-error', !Number.isInteger(Number(input.value)) || Number(input.value) < Number(input.min));
    });
    adultCount.focus();
    return;
  }
  [adultCount, childCount, seniorCount].forEach((input) => input.classList.remove('input-error'));

  if (!paymentMethod.value) {
    document.getElementById('errorPaymentMethod').textContent = 'Selecciona un método de pago.';
    paymentMethod.classList.add('input-error');
    paymentMethod.focus();
    return;
  }
  paymentMethod.classList.remove('input-error');

  window.location.href = 'login.html?reserva=lista';
});
document.getElementById('closeReservation').addEventListener('click', () => reservationDialog.close());
document.getElementById('closeReservation').addEventListener('click', () => reservationDialog.close());
