(() => {
  const packageKey = 'summit_custom_packages';
  const providerKey = 'summit_provider_sites';
  const destinations = {
    'La Calera': {
      image: 'images/calera.jpg',
      hotels: [
        { id: 'calera-hotel-1', name: 'Refugio El Mirador', price: 180000 },
        { id: 'calera-hotel-2', name: 'Cabañas del Bosque', price: 240000 }
      ],
      restaurants: [
        { id: 'calera-restaurant-1', name: 'Fogón de la Montaña', meal: 'Almuerzo', price: 38000 },
        { id: 'calera-restaurant-2', name: 'Cocina de la Abuela', meal: 'Cena', price: 32000 }
      ],
      activities: [
        { id: 'calera-activity-1', name: 'Caminata por sendero rural', price: 45000 },
        { id: 'calera-activity-2', name: 'Tour de café y productos locales', price: 52000 }
      ]
    },
    'Choachí': {
      image: 'images/choachi.jpg',
      hotels: [
        { id: 'choachi-hotel-1', name: 'Posada La Chorrera', price: 210000 },
        { id: 'choachi-hotel-2', name: 'Termales del Valle', price: 280000 }
      ],
      restaurants: [
        { id: 'choachi-restaurant-1', name: 'Sazón de Choachí', meal: 'Almuerzo', price: 35000 },
        { id: 'choachi-restaurant-2', name: 'Mesa Campestre', meal: 'Cena', price: 42000 }
      ],
      activities: [
        { id: 'choachi-activity-1', name: 'Caminata guiada a La Chorrera', price: 68000 },
        { id: 'choachi-activity-2', name: 'Circuito de aguas termales', price: 75000 }
      ]
    },
    'Zipaquirá': {
      image: 'images/zipaquira.jpg',
      hotels: [
        { id: 'zipaquira-hotel-1', name: 'Hotel Plaza de la Sal', price: 195000 },
        { id: 'zipaquira-hotel-2', name: 'Casa Colonial Zipaquirá', price: 225000 }
      ],
      restaurants: [
        { id: 'zipaquira-restaurant-1', name: 'La Mesa Zipaquireña', meal: 'Almuerzo', price: 36000 },
        { id: 'zipaquira-restaurant-2', name: 'Patio de la Sabana', meal: 'Cena', price: 44000 }
      ],
      activities: [
        { id: 'zipaquira-activity-1', name: 'Entrada a la Catedral de Sal', price: 98000 },
        { id: 'zipaquira-activity-2', name: 'Recorrido histórico por el centro', price: 40000 }
      ]
    }
  };

  const form = document.getElementById('tripBuilderForm');
  const destinationInput = document.getElementById('destination');
  const arrivalInput = document.getElementById('arrivalDate');
  const departureInput = document.getElementById('departureDate');
  const travelerInput = document.getElementById('travelerCount');
  const hotelOptions = document.getElementById('hotelOptions');
  const restaurantOptions = document.getElementById('restaurantOptions');
  const activityOptions = document.getElementById('activityOptions');
  const summaryDetails = document.getElementById('summaryDetails');
  const summaryTotal = document.getElementById('summaryTotal');
  const message = document.getElementById('builderMessage');
  const currency = new Intl.NumberFormat('es-CO');
  const today = new Date();
  const todayValue = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  arrivalInput.min = todayValue;
  departureInput.min = todayValue;

  function price(value) {
    return `$${currency.format(value)} COP`;
  }

  function createId() {
    return window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `summit-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function getApprovedProviderOptions(destination, type) {
    return window.SummitStorage.readCollection(providerKey)
      .filter((site) => site.status === 'approved' && site.destination === destination && site.type === type)
      .flatMap((site) => site.services.filter((service) => service.available !== false).map((service) => ({
        id: service.id,
        providerId: site.id,
        providerName: site.name,
        image: site.image,
        name: service.name,
        meal: service.meal || 'A la carta',
        price: service.price
      })));
  }

  function renderOptions(container, options, groupName, inputType) {
    if (!options.length) {
      container.innerHTML = '<p class="dashboard-empty">No hay opciones disponibles para este destino.</p>';
      return;
    }

    container.innerHTML = options.map((option) => `
      <label class="builder-option">
        <input type="${inputType}" name="${groupName}" value="${escapeHtml(option.id)}">
        <img class="builder-option-image" src="${escapeHtml(option.image || destinations[destinationInput.value].image)}" alt="">
        <span class="builder-option-copy">
          <strong>${escapeHtml(option.name)}</strong>
          ${option.providerName ? `<small>${escapeHtml(option.providerName)}</small>` : ''}
          ${groupName === 'restaurant' ? `<small>${escapeHtml(option.meal || 'A la carta')}</small>` : ''}
          <small>${price(option.price)}${groupName === 'hotel' ? ' / noche' : ' / viajero'}</small>
        </span>
      </label>
    `).join('');
  }

  function getTrip() {
    const destination = destinations[destinationInput.value];
    if (!destination) return null;

    let hotels = [...destination.hotels];
    let restaurants = [...destination.restaurants];
    try {
      hotels = hotels.concat(getApprovedProviderOptions(destinationInput.value, 'hotel'));
      restaurants = restaurants.concat(getApprovedProviderOptions(destinationInput.value, 'restaurant'));
    } catch (error) {
      message.textContent = `No fue posible leer los servicios de proveedores: ${error.message}`;
      return null;
    }

    const selectedHotelId = form.querySelector('input[name="hotel"]:checked')?.value;
    const hotel = hotels.find((option) => option.id === selectedHotelId);
    const restaurantIds = Array.from(form.querySelectorAll('input[name="restaurant"]:checked'))
      .map((input) => input.value);
    const selectedRestaurants = restaurants.filter((option) => restaurantIds.includes(option.id));
    const activityIds = Array.from(form.querySelectorAll('input[name="activity"]:checked'))
      .map((input) => input.value);
    const activities = destination.activities.filter((option) => activityIds.includes(option.id));
    const nights = arrivalInput.value && departureInput.value
      ? Math.max(0, (new Date(`${departureInput.value}T00:00:00`) - new Date(`${arrivalInput.value}T00:00:00`)) / 86400000)
      : 0;
    const travelers = Number(travelerInput.value);
    const total = (hotel ? hotel.price * nights : 0) +
      (selectedRestaurants.reduce((sum, option) => sum + option.price, 0) * travelers) +
      (activities.reduce((sum, option) => sum + option.price, 0) * travelers);

    return { destination, hotel, selectedRestaurants, activities, nights, travelers, total };
  }

  function renderSummary() {
    const trip = getTrip();
    if (!trip) {
      summaryDetails.innerHTML = '<p>Selecciona un destino para comenzar a calcular.</p>';
      summaryTotal.textContent = price(0);
      return;
    }

    const lines = [
      `<p><span>${escapeHtml(destinationInput.value)} · ${trip.travelers || 0} viajeros</span></p>`,
      `<p><span>${trip.nights} noches</span><strong>${price(trip.hotel ? trip.hotel.price * trip.nights : 0)}</strong></p>`,
      ...trip.selectedRestaurants.map((item) =>
        `<p><span>${escapeHtml(item.meal || 'A la carta')}: ${escapeHtml(item.name)} · ${trip.travelers} viajeros</span><strong>${price(item.price * trip.travelers)}</strong></p>`),
      ...trip.activities.map((item) =>
        `<p><span>${escapeHtml(item.name)} · ${trip.travelers} viajeros</span><strong>${price(item.price * trip.travelers)}</strong></p>`)
    ];
    summaryDetails.innerHTML = lines.join('');
    summaryTotal.textContent = price(trip.total);
  }

  function renderDestinationOptions() {
    const destination = destinations[destinationInput.value];
    if (!destination) {
      hotelOptions.innerHTML = '<p class="dashboard-empty">Primero selecciona destino y fechas.</p>';
      restaurantOptions.innerHTML = '<p class="dashboard-empty">Primero selecciona un destino.</p>';
      activityOptions.innerHTML = '<p class="dashboard-empty">Primero selecciona un destino.</p>';
      renderSummary();
      return;
    }

    let hotels = [...destination.hotels];
    let restaurants = [...destination.restaurants];
    try {
      hotels = hotels.concat(getApprovedProviderOptions(destinationInput.value, 'hotel'));
      restaurants = restaurants.concat(getApprovedProviderOptions(destinationInput.value, 'restaurant'));
    } catch (error) {
      message.textContent = `No fue posible leer los servicios de proveedores: ${error.message}`;
      return;
    }

    renderOptions(hotelOptions, hotels, 'hotel', 'radio', true);
    renderOptions(restaurantOptions, restaurants, 'restaurant', 'checkbox', true);
    renderOptions(activityOptions, destination.activities, 'activity', 'checkbox');
    renderSummary();
  }

  destinationInput.addEventListener('change', () => {
    message.textContent = '';
    renderDestinationOptions();
  });
  form.addEventListener('input', renderSummary);
  arrivalInput.addEventListener('change', () => {
    departureInput.min = arrivalInput.value || todayValue;
    if (departureInput.value && departureInput.value <= arrivalInput.value) {
      departureInput.value = '';
    }
    renderSummary();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = '';

    if (!form.reportValidity()) return;
    if (arrivalInput.value < todayValue || departureInput.value <= arrivalInput.value) {
      message.textContent = 'La salida debe ser posterior a la llegada y ambas fechas deben ser futuras.';
      return;
    }

    const trip = getTrip();
    if (!trip || !trip.hotel || trip.nights < 1 || trip.travelers < 1 || trip.travelers > 12) {
      message.textContent = 'Selecciona destino, alojamiento y fechas válidas para continuar.';
      return;
    }

    try {
      const packages = window.SummitStorage.readCollection(packageKey);
      const reservation = {
        id: createId(),
        destination: destinationInput.value,
        arrivalDate: arrivalInput.value,
        departureDate: departureInput.value,
        travelers: trip.travelers,
        hotel: {
          id: trip.hotel.id,
          providerId: trip.hotel.providerId || null,
          name: trip.hotel.name,
          pricePerNight: trip.hotel.price
        },
        restaurants: trip.selectedRestaurants.map((item) => ({
          id: item.id,
          providerId: item.providerId || null,
          name: item.name,
          meal: item.meal || 'A la carta',
          pricePerTraveler: item.price
        })),
        activities: trip.activities.map((item) => ({
          id: item.id,
          name: item.name,
          pricePerTraveler: item.price
        })),
        nights: trip.nights,
        total: trip.total,
        status: 'pending',
        providerStatuses: {},
        createdAt: new Date().toISOString()
      };
      packages.push(reservation);
      window.SummitStorage.writeCollection(packageKey, packages);
      window.location.href = 'dashboard-cliente.html#reservas';
    } catch (error) {
      message.textContent = `No fue posible guardar el paquete: ${error.message}`;
    }
  });
})();
