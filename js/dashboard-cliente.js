['summit_users', 'summit_user', 'summit_reservas', 'summit_pending_reservation', 'emailRecuperacion'].forEach((key) => {
  localStorage.removeItem(key);
});

document.getElementById('profileName').textContent = 'No disponible en esta demostración';
document.getElementById('profileEmail').textContent = 'No disponible en esta demostración';
document.getElementById('profilePhone').textContent = 'No disponible en esta demostración';
document.getElementById('profileDocument').textContent = 'No disponible en esta demostración';

const reservationsMessage = document.createElement('p');
reservationsMessage.className = 'dashboard-empty';
reservationsMessage.textContent = 'Las reservas no se guardan en esta demostración.';
document.getElementById('reservationList').append(reservationsMessage);

const paymentsMessage = document.createElement('p');
paymentsMessage.className = 'dashboard-empty';
paymentsMessage.textContent = 'Los pagos no se guardan en esta demostración.';
document.getElementById('paymentList').append(paymentsMessage);
