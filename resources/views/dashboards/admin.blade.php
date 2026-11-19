<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Summit - Panel de Administración</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a class="sidebar-brand" href="{{ url('/') }}">
          <img src="{{ asset('images/logoSUMMIT.PNG') }}" alt="Logo SUMMIT" class="header-logo-img">
          <span>SUMMIT</span>
        </a>
      </div>
      <ul class="sidebar-menu">
        <li class="active"><a href="#estadisticas"><i class="fa-solid fa-chart-line"></i> Estadísticas</a></li>
        <li><a href="#usuarios"><i class="fa-solid fa-users"></i> Gestión de Usuarios</a></li>
        <li><a href="#negocios"><i class="fa-solid fa-store"></i> Negocios y Paquetes</a></li>
        <li><a href="#reservas"><i class="fa-solid fa-calendar-check"></i> Control de Reservas</a></li>
        <li><a href="#configuracion"><i class="fa-solid fa-gear"></i> Configuración</a></li>
        <li><a href="{{ url('/') }}"><i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</a></li>
      </ul>
    </aside>

    <main class="dashboard-main">
      <header class="dashboard-header">
        <h1>Panel de Administración</h1>
        <span class="user-role-badge">Rol: Administrador</span>
      </header>

      <section class="dashboard-section" id="estadisticas">
        <h2>Estadísticas</h2>
        <div class="dashboard-grid">
          <article class="dashboard-stat">
            <span>Proveedores aprobados</span>
            <strong id="approvedProviderCount">0</strong>
          </article>
          <article class="dashboard-stat">
            <span>Solicitudes de viaje</span>
            <strong id="customPackageCount">0</strong>
          </article>
          <article class="dashboard-stat">
            <span>Ventas estimadas</span>
            <strong id="estimatedSales">$0 COP</strong>
          </article>
          <article class="dashboard-stat">
            <span>Destinos con solicitudes</span>
            <strong id="popularDestination">—</strong>
          </article>
        </div>
      </section>

      <section class="dashboard-section" id="usuarios">
        <h2>Gestión de Usuarios</h2>
        <div class="dashboard-list">
          <article class="dashboard-item">
            <div>
              <h3>Clientes y operadores</h3>
              <p>Consulta los perfiles registrados y el estado de sus cuentas.</p>
            </div>
            <a class="btn2 btn-secondary" href="#usuarios">Ver usuarios</a>
          </article>
        </div>
      </section>

      <section class="dashboard-section" id="negocios">
        <h2>Gestión de Negocios y Paquetes</h2>
        <div class="dashboard-list" id="providerApprovalList" aria-live="polite"></div>
        <div class="dashboard-list">
          <article class="dashboard-item">
            <div>
              <h3>Negocios turísticos</h3>
              <p>Revisa las solicitudes, aprueba establecimientos y publica su catálogo.</p>
            </div>
            <a class="btn2 btn-secondary" href="#negocios">Ver solicitudes</a>
          </article>
          <article class="dashboard-item">
            <div>
              <h3>Paquetes personalizados</h3>
              <p>Consulta las solicitudes creadas en esta demostración local.</p>
            </div>
            <a class="btn2 btn-secondary" href="#reservas">Ver reservas</a>
          </article>
        </div>
      </section>

      <section class="dashboard-section" id="reservas">
        <h2>Control de Reservas</h2>
        <div class="dashboard-list">
          <article class="dashboard-item">
            <div>
              <h3>Solicitudes del constructor</h3>
              <p>El estado y los importes son datos de demostración del navegador.</p>
            </div>
            <span class="status-badge status-pending" id="reservationStatus">0 solicitudes</span>
          </article>
        </div>
      </section>

      <section class="dashboard-section" id="configuracion">
        <h2>Configuración</h2>
        <div class="dashboard-list">
          <article class="dashboard-item">
            <div>
              <h3>Preferencias de la plataforma</h3>
              <p>Administra los parámetros generales y las notificaciones.</p>
            </div>
            <a class="btn2 btn-secondary" href="#configuracion">Abrir configuración</a>
          </article>
        </div>
      </section>
    </main>
  </div>
  <script src="{{ asset('js/summit-storage.js') }}" defer></script>
  <script src="{{ asset('js/dashboard-admin.js') }}" defer></script>
</body>
</html>
