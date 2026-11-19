<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de proveedor - SUMMIT</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
  <div class="provider-page">
    <header class="dashboard-header">
      <div>
        <p class="builder-eyebrow">ALIADOS SUMMIT</p>
        <h1>Panel de proveedor</h1>
      </div>
      <a class="btn2 btn-secondary" href="{{ url('/') }}">Volver al sitio</a>
    </header>

    <p class="builder-disclaimer">Prototipo local: los cambios se guardan en este navegador. El estado pendiente requiere aprobación administrativa antes de publicar el establecimiento.</p>

    <div class="provider-grid">
      <section class="provider-panel" aria-labelledby="siteFormTitle">
        <h2 id="siteFormTitle">Registrar establecimiento</h2>
        <form id="siteForm">
          <label for="siteName">Nombre del establecimiento
            <input id="siteName" name="name" maxlength="100" required>
          </label>
          <label for="siteType">Tipo de negocio
            <select id="siteType" name="type" required>
              <option value="">Selecciona un tipo</option>
              <option value="hotel">Hotel</option>
              <option value="restaurant">Restaurante</option>
            </select>
          </label>
          <label for="siteDestination">Destino
            <select id="siteDestination" name="destination" required>
              <option value="">Selecciona un destino</option>
              <option>La Calera</option>
              <option>Choachí</option>
              <option>Zipaquirá</option>
            </select>
          </label>
          <label for="siteAddress">Ubicación o dirección
            <input id="siteAddress" name="address" maxlength="160" required>
          </label>
          <label for="siteImage">Fotografía del establecimiento
            <input id="siteImage" name="image" type="file" accept="image/*">
          </label>
          <label for="siteDescription">Descripción y políticas
            <textarea id="siteDescription" name="description" maxlength="600" required></textarea>
          </label>
          <button class="btn2 btn-primary" id="siteSubmitButton" type="submit">Enviar a aprobación</button>
          <p class="provider-feedback" id="siteFeedback" role="status" aria-live="polite"></p>
        </form>
      </section>

      <section class="provider-panel" aria-labelledby="catalogTitle">
        <h2 id="catalogTitle">Catálogo de servicios</h2>
        <form id="serviceForm">
          <label for="siteSelect">Establecimiento
            <select id="siteSelect" class="provider-site-select" required>
              <option value="">Registra o selecciona un establecimiento</option>
            </select>
          </label>
          <label for="serviceName">Nombre de habitación o ítem del menú
            <input id="serviceName" maxlength="100" required>
          </label>
          <label for="serviceMeal" id="serviceMealGroup">Momento de consumo
            <select id="serviceMeal">
              <option value="Desayuno">Desayuno</option>
              <option value="Almuerzo">Almuerzo</option>
              <option value="Cena">Cena</option>
              <option value="A la carta">A la carta</option>
            </select>
          </label>
          <label for="servicePrice">Tarifa en COP
            <input id="servicePrice" type="number" min="1000" step="1000" required>
          </label>
          <label class="provider-checkbox" for="serviceAvailable">
            <input id="serviceAvailable" type="checkbox" checked>
            Disponible para reserva
          </label>
          <button class="btn2 btn-primary" type="submit">Agregar al catálogo</button>
          <p class="provider-feedback" id="serviceFeedback" role="status" aria-live="polite"></p>
        </form>
        <div id="serviceCatalog" class="dashboard-list"></div>
      </section>

      <section class="provider-panel provider-panel-full" aria-labelledby="sitesTitle">
        <h2 id="sitesTitle">Mis establecimientos</h2>
        <div class="provider-table-wrap">
          <table class="provider-table">
            <thead>
              <tr><th>Establecimiento</th><th>Tipo</th><th>Destino</th><th>Estado</th><th>Descripción / políticas</th><th>Acciones</th></tr>
            </thead>
            <tbody id="siteList"></tbody>
          </table>
        </div>
      </section>

      <section class="provider-panel provider-panel-full" aria-labelledby="providerReservationsTitle">
        <h2 id="providerReservationsTitle">Reservas recibidas</h2>
        <div id="providerReservations" class="provider-table-wrap"></div>
      </section>
    </div>
  </div>
  <script src="{{ asset('js/summit-storage.js') }}" defer></script>
  <script src="{{ asset('js/dashboard-proveedor.js') }}" defer></script>
</body>
</html>
