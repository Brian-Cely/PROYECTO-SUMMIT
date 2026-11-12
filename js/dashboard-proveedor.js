(() => {
  const providerKey = 'summit_provider_sites';
  const packageKey = 'summit_custom_packages';
  const siteForm = document.getElementById('siteForm');
  const serviceForm = document.getElementById('serviceForm');
  const siteSelect = document.getElementById('siteSelect');
  const serviceMealGroup = document.getElementById('serviceMealGroup');
  const currency = new Intl.NumberFormat('es-CO');
  let editingSiteId = null;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function createId() {
    return window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `summit-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function read(key) {
    try {
      return window.SummitStorage.readCollection(key);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function write(key, value) {
    try {
      window.SummitStorage.writeCollection(key, value);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function readImage(file) {
    if (!file) return Promise.resolve('');
    if (!file.type.startsWith('image/') || file.size > 1024 * 1024) {
      return Promise.reject(new Error('La imagen debe ser válida y pesar máximo 1 MB.'));
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(String(reader.result)));
      reader.addEventListener('error', () => reject(new Error('No fue posible leer la imagen.')));
      reader.readAsDataURL(file);
    });
  }

  function render() {
    const sites = read(providerKey);
    const selectedId = siteSelect.value;
    siteSelect.innerHTML = '<option value="">Selecciona un establecimiento</option>' +
      sites.map((site) => `<option value="${escapeHtml(site.id)}">${escapeHtml(site.name)}</option>`).join('');
    if (sites.some((site) => site.id === selectedId)) siteSelect.value = selectedId;

    document.getElementById('siteList').innerHTML = sites.length
      ? sites.map((site) => `
        <tr>
          <td>${escapeHtml(site.name)}</td>
          <td>${site.type === 'hotel' ? 'Hotel' : 'Restaurante'}</td>
          <td>${escapeHtml(site.destination)}</td>
          <td><span class="status-badge status-${escapeHtml(site.status)}">${site.status === 'approved' ? 'Aprobado' : site.status === 'rejected' ? 'Rechazado' : 'Pendiente'}</span></td>
          <td>${escapeHtml(site.address)} · ${escapeHtml(site.description)}</td>
          <td><button class="btn2 btn-secondary" type="button" data-edit-site="${escapeHtml(site.id)}">Editar</button></td>
        </tr>`).join('')
      : '<tr><td colspan="6">Aún no has registrado establecimientos.</td></tr>';

    const selectedSite = sites.find((site) => site.id === siteSelect.value);
    serviceMealGroup.hidden = !selectedSite || selectedSite.type !== 'restaurant';
    document.getElementById('serviceMeal').required = Boolean(selectedSite && selectedSite.type === 'restaurant');
    const catalog = document.getElementById('serviceCatalog');
    catalog.innerHTML = selectedSite && selectedSite.services.length
      ? `<ul>${selectedSite.services.map((service) => `
        <li>${escapeHtml(service.name)} · $${currency.format(service.price)} COP ${selectedSite.type === 'hotel' ? '/ noche' : `/ viajero · ${escapeHtml(service.meal || 'A la carta')}`} · ${service.available === false ? 'No disponible' : 'Disponible'}
          <button class="btn2 btn-secondary" type="button" data-remove-service="${escapeHtml(service.id)}">Eliminar</button>
        </li>`).join('')}</ul>`
      : '<p class="dashboard-empty">Selecciona un establecimiento para consultar su catálogo.</p>';

    renderReservations(sites);
  }

  function renderReservations(sites) {
    const reservations = read(packageKey);
    const siteIds = new Set(sites.map((site) => site.id));
    const rows = [];

    reservations.forEach((reservation) => {
      const selectedSites = [
        reservation.hotel,
        ...reservation.restaurants
      ].filter((item) => item.providerId && siteIds.has(item.providerId));
      selectedSites.forEach((item) => {
        const status = (reservation.providerStatuses || {})[item.providerId] || 'pending';
        rows.push(`
          <tr>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(reservation.destination)} · ${escapeHtml(reservation.arrivalDate)}</td>
            <td>${reservation.travelers}</td>
            <td><span class="status-badge status-${status}">${status === 'confirmed' ? 'Confirmada' : 'Pendiente'}</span></td>
            <td>${status === 'confirmed' ? '—' : `<button class="btn2 btn-primary" type="button" data-confirm="${escapeHtml(reservation.id)}" data-provider="${escapeHtml(item.providerId)}">Confirmar</button>`}</td>
          </tr>`);
      });
    });

    document.getElementById('providerReservations').innerHTML = rows.length
      ? `<table class="provider-table"><thead><tr><th>Servicio</th><th>Viaje</th><th>Viajeros</th><th>Estado</th><th>Acción</th></tr></thead><tbody>${rows.join('')}</tbody></table>`
      : '<p class="dashboard-empty">Todavía no hay solicitudes para tus establecimientos.</p>';
  }

  siteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('siteName').value.trim();
    const type = document.getElementById('siteType').value;
    const destination = document.getElementById('siteDestination').value;
    const address = document.getElementById('siteAddress').value.trim();
    const description = document.getElementById('siteDescription').value.trim();
    const imageFile = document.getElementById('siteImage').files[0];
    const feedback = document.getElementById('siteFeedback');
    if (!name || !address || !description || !['hotel', 'restaurant'].includes(type) || !destination) {
      feedback.textContent = 'Completa todos los campos con valores válidos.';
      return;
    }

    try {
      const image = await readImage(imageFile);
      const sites = read(providerKey);
      let site;
      if (editingSiteId) {
        site = sites.find((item) => item.id === editingSiteId);
        if (!site) throw new Error('El establecimiento que intentas editar ya no existe.');
        site.name = name;
        site.type = type;
        site.destination = destination;
        site.address = address;
        site.description = description;
        if (image) site.image = image;
        site.status = 'pending';
      } else {
        site = {
          id: createId(),
          name,
          type,
          destination,
          address,
          description,
          image,
          status: 'pending',
          services: [],
          createdAt: new Date().toISOString()
        };
        sites.push(site);
      }
      write(providerKey, sites);
      siteForm.reset();
      editingSiteId = null;
      document.getElementById('siteSubmitButton').textContent = 'Enviar a aprobación';
      feedback.textContent = 'Solicitud guardada. Un administrador debe aprobarla antes de publicarse.';
      render();
      siteSelect.value = site.id;
      render();
    } catch (error) {
      feedback.textContent = `No fue posible guardar el establecimiento: ${error.message}`;
    }
  });

  serviceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = document.getElementById('serviceFeedback');
    const name = document.getElementById('serviceName').value.trim();
    const priceValue = Number(document.getElementById('servicePrice').value);
    if (!siteSelect.value || !name || !Number.isSafeInteger(priceValue) || priceValue < 1) {
      feedback.textContent = 'Selecciona un establecimiento e ingresa un ítem y una tarifa válidos.';
      return;
    }

    try {
      const sites = read(providerKey);
      const site = sites.find((item) => item.id === siteSelect.value);
      if (!site) {
        feedback.textContent = 'El establecimiento seleccionado ya no existe.';
        return;
      }
      site.services.push({
        id: createId(),
        name,
        price: priceValue,
        available: document.getElementById('serviceAvailable').checked,
        meal: site.type === 'restaurant' ? document.getElementById('serviceMeal').value : null
      });
      write(providerKey, sites);
      serviceForm.reset();
      feedback.textContent = 'Ítem agregado. Se publicará cuando el establecimiento esté aprobado.';
      siteSelect.value = site.id;
      render();
    } catch (error) {
      feedback.textContent = `No fue posible guardar el ítem: ${error.message}`;
    }
  });

  siteSelect.addEventListener('change', render);
  document.getElementById('siteList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-edit-site]');
    if (!button) return;

    try {
      const site = read(providerKey).find((item) => item.id === button.dataset.editSite);
      if (!site) throw new Error('No se encontró el establecimiento seleccionado.');
      editingSiteId = site.id;
      document.getElementById('siteName').value = site.name;
      document.getElementById('siteType').value = site.type;
      document.getElementById('siteDestination').value = site.destination;
      document.getElementById('siteAddress').value = site.address;
      document.getElementById('siteDescription').value = site.description;
      document.getElementById('siteSubmitButton').textContent = 'Guardar cambios y reenviar';
      document.getElementById('siteFeedback').textContent = 'Los cambios de perfil requieren una nueva aprobación.';
      document.getElementById('siteName').focus();
    } catch (error) {
      document.getElementById('siteFeedback').textContent = `No fue posible editar: ${escapeHtml(error.message)}`;
    }
  });
  document.getElementById('serviceCatalog').addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-service]');
    if (!button || !siteSelect.value) return;

    try {
      const sites = read(providerKey);
      const site = sites.find((item) => item.id === siteSelect.value);
      if (!site) throw new Error('No se encontró el establecimiento seleccionado.');
      site.services = site.services.filter((service) => service.id !== button.dataset.removeService);
      write(providerKey, sites);
      render();
    } catch (error) {
      document.getElementById('serviceFeedback').textContent = `No fue posible eliminar el ítem: ${escapeHtml(error.message)}`;
    }
  });
  document.getElementById('providerReservations').addEventListener('click', (event) => {
    const button = event.target.closest('[data-confirm]');
    if (!button) return;

    try {
      const reservations = read(packageKey);
      const reservation = reservations.find((item) => item.id === button.dataset.confirm);
      if (!reservation) throw new Error('No se encontró la solicitud seleccionada.');
      reservation.providerStatuses = reservation.providerStatuses || {};
      reservation.providerStatuses[button.dataset.provider] = 'confirmed';
      write(packageKey, reservations);
      render();
    } catch (error) {
      document.getElementById('providerReservations').insertAdjacentHTML(
        'afterbegin',
        `<p class="provider-feedback" role="alert">No fue posible confirmar: ${escapeHtml(error.message)}</p>`
      );
    }
  });

  try {
    render();
  } catch (error) {
    document.getElementById('siteFeedback').textContent = `Error al cargar los datos: ${error.message}`;
  }
})();
