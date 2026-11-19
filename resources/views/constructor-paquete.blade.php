<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Arma tu viaje - SUMMIT</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
  <header class="main-header">
    <a class="sidebar-brand builder-brand" href="{{ url('/') }}">
      <img src="{{ asset('images/logoSUMMIT.PNG') }}" alt="Logo SUMMIT" class="header-logo-img">
      <span>SUMMIT</span>
    </a>
    <nav class="main-nav buttons" aria-label="Navegación principal">
      <ul>
        <li><a class="button" href="{{ url('/') }}">INICIO</a></li>
        <li><a class="button" href="{{ url('/destinos') }}">DESTINOS</a></li>
        <li><a class="button active" href="{{ url('/paquetes') }}">PAQUETES</a></li>
      </ul>
    </nav>
    <div class="header-action buttons"><a class="button" href="{{ url('/dashboard/cliente') }}">MIS VIAJES</a></div>
  </header>

  <main class="builder-page">
    <div class="builder-heading">
      <p class="builder-eyebrow">TU VIAJE, A TU MANERA</p>
      <h1>Arma tu paquete turístico</h1>
      <p>Combina alojamiento, gastronomía y experiencias. Revisa el presupuesto antes de enviar tu solicitud.</p>
    </div>

    <div class="builder-layout">
      <form class="builder-form" id="tripBuilderForm">
        <section class="builder-section" aria-labelledby="tripDetailsTitle">
          <span class="builder-step">PASO 1</span>
          <h2 id="tripDetailsTitle">Destino y fechas</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="destination">Destino</label>
              <select id="destination" required>
                <option value="">Selecciona un destino</option>
                <option value="La Calera">La Calera</option>
                <option value="Choachí">Choachí</option>
                <option value="Zipaquirá">Zipaquirá</option>
              </select>
            </div>
            <div class="form-group">
              <label for="travelerCount">Viajeros</label>
              <input id="travelerCount" type="number" min="1" max="12" value="2" required>
            </div>
            <div class="form-group">
              <label for="arrivalDate">Llegada</label>
              <input id="arrivalDate" type="date" required>
            </div>
            <div class="form-group">
              <label for="departureDate">Salida</label>
              <input id="departureDate" type="date" required>
            </div>
          </div>
        </section>

        <section class="builder-section" aria-labelledby="hotelTitle">
          <span class="builder-step">PASO 2</span>
          <h2 id="hotelTitle">Alojamiento</h2>
          <p class="builder-help">Elige un hotel disponible en el destino. La tarifa se calcula por noche.</p>
          <div class="builder-options" id="hotelOptions" aria-live="polite">
            <p class="dashboard-empty">Primero selecciona destino y fechas.</p>
          </div>
        </section>

        <section class="builder-section" aria-labelledby="restaurantTitle">
          <span class="builder-step">PASO 3</span>
          <h2 id="restaurantTitle">Gastronomía</h2>
          <p class="builder-help">Opcional. Selecciona restaurantes y experiencias gastronómicas para tus viajeros.</p>
          <div class="builder-options" id="restaurantOptions" aria-live="polite">
            <p class="dashboard-empty">Primero selecciona un destino.</p>
          </div>
        </section>

        <section class="builder-section" aria-labelledby="activityTitle">
          <span class="builder-step">PASO 4</span>
          <h2 id="activityTitle">Experiencias y actividades</h2>
          <p class="builder-help">Selecciona las actividades que deseas agregar al viaje.</p>
          <div class="builder-options" id="activityOptions" aria-live="polite">
            <p class="dashboard-empty">Primero selecciona un destino.</p>
          </div>
        </section>

        <p id="builderMessage" class="builder-message" role="status" aria-live="polite"></p>
        <button class="btn2 btn-primary builder-submit" type="submit">Guardar paquete y solicitar reserva</button>
      </form>

      <aside class="builder-summary" aria-labelledby="summaryTitle">
        <span class="builder-step">PASO 5</span>
        <h2 id="summaryTitle">Tu presupuesto</h2>
        <div id="summaryDetails" class="summary-details">
          <p>Selecciona un destino para comenzar a calcular.</p>
        </div>
        <div class="summary-total">
          <span>Total estimado</span>
          <strong id="summaryTotal">$0 COP</strong>
        </div>
        <p class="builder-disclaimer">Precios de demostración en COP. La disponibilidad y el precio final deben confirmarse con cada proveedor.</p>
      </aside>
    </div>
  </main>

  <script src="{{ asset('js/summit-storage.js') }}" defer></script>
  <script src="{{ asset('js/paquete-builder.js') }}" defer></script>
</body>
</html>
