(() => {
  const packageKey = 'summit_custom_packages';
  const numberFormat = new Intl.NumberFormat('es-CO');
  const list = document.getElementById('reservationList');
  const paymentList = document.getElementById('paymentList');

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function renderReservation(item) {
    const providerStatuses = Object.values(item.providerStatuses || {});
    const status = providerStatuses.length > 0 && providerStatuses.every((value) => value === 'confirmed')
      ? 'Proveedores confirmados'
      : providerStatuses.some((value) => value === 'confirmed')
        ? 'Confirmación parcial'
        : 'Solicitud enviada';

    return `
      <article class="dashboard-item">
        <div>
          <h3>${escapeHtml(item.destination)} · ${escapeHtml(item.hotel.name)}</h3>
          <p>${escapeHtml(item.arrivalDate)} al ${escapeHtml(item.departureDate)} · ${item.travelers} viajeros · ${item.nights} noches</p>
          <p>${item.restaurants.length ? `Restaurantes: ${item.restaurants.map((restaurant) => `${escapeHtml(restaurant.meal || 'A la carta')}: ${escapeHtml(restaurant.name)}`).join(', ')}` : 'Sin restaurantes seleccionados'}</p>
          <p>${item.activities.length ? `Actividades: ${item.activities.map((activity) => escapeHtml(activity.name)).join(', ')}` : 'Sin actividades seleccionadas'}</p>
        </div>
        <span class="status-badge ${status === 'Proveedores confirmados' ? 'status-confirmed' : 'status-pending'}">${status}</span>
        <strong class="reservation-amount">$${numberFormat.format(item.total)} COP</strong>
      </article>
    `;
  }

  function render() {
    const packages = window.SummitStorage.readCollection(packageKey);
    if (!packages.length) {
      list.innerHTML = '<p class="dashboard-empty">Aún no tienes paquetes personalizados. <a href="constructor-paquete.html">Arma tu primer viaje.</a></p>';
      paymentList.innerHTML = '<p class="dashboard-empty">No hay pagos registrados.</p>';
      return;
    }

    list.innerHTML = packages.slice().reverse().map(renderReservation).join('');
    paymentList.innerHTML = '<p class="dashboard-empty">El total es una estimación; no se ha realizado ningún cobro.</p>';
  }

  document.getElementById('profileName').textContent = 'Perfil de demostración';
  document.getElementById('profileEmail').textContent = '—';
  document.getElementById('profilePhone').textContent = '—';
  document.getElementById('profileDocument').textContent = '—';

  try {
    render();
  } catch (error) {
    console.error(error);
    list.innerHTML = `<p class="dashboard-empty" role="alert">No se pudieron cargar las solicitudes: ${escapeHtml(error.message)}</p>`;
  }
})();
