<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contacto - SUMMIT</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>

  <!-- HEADER -->
  <header class="main-header">
    <div class="logo">
      <img src="{{ asset('images/logoSUMMIT.PNG') }}" alt="Logo SUMMIT" class="header-logo-img">
      <div class="logo-text">
        <span class="logo-title">SUMMIT</span>
        <span class="logo-subtitle">PAQUETES</span>
      </div>
    </div>
    <nav class="main-nav buttons" aria-label="Navegación principal">
      <ul>
        <li><a class="button" href="{{ url('/') }}">INICIO</a></li>
        <li><a class="button" href="{{ url('/destinos') }}">DESTINOS</a></li>
        <li><a class="button" href="{{ url('/paquetes') }}">PAQUETES</a></li>
        <li><a class="button" href="{{ url('/nosotros') }}">NOSOTROS</a></li>
        <li><a class="button active" href="{{ url('/contactanos') }}">CONTACTANOS</a></li>
      </ul>
    </nav>
    <div class="header-action buttons">
      <a href="{{ url('/login') }}" class="button">INICIAR SESIÓN</a>
    </div>
  </header>

  <!-- CONTENIDO PRINCIPAL -->
  <main class="destinations-section">
    <h1 class="section-title">Contáctanos</h1>
    <section class="dashboard-section">
      <h2>¿Necesitas ayuda con tu viaje?</h2>
      <p>Escríbenos para recibir información sobre destinos, paquetes y reservas.</p>
      <div class="profile-info">
        <p><strong>Ubicación:</strong> Bogotá D.C., Colombia</p>
        <p><strong>Teléfono:</strong> +57 300 123 4567</p>
        <p><strong>Correo:</strong> contacto@summit.com</p>
      </div>
      <br>
      <a href="{{ url('/paquetes') }}" class="btn2 btn-primary">Ver paquetes</a>
      <a href="{{ url('/login') }}" class="btn2 btn-secondary">Iniciar sesión</a>
    </section>
  </main>

  <!-- Pie de página -->
  <footer class="main-footer" id="contactanos">
    <div class="footer-content">
      <section class="footer-info">
        <h3>Ubícanos</h3>
        <p>Dirección: Calle Falsa 123, Ciudad, País</p>
        <p>Teléfono: +1 234 567 890</p>
      </section>

      <section class="footer-location">
        <h3>Ubicación Satelital</h3>
      </section>

      <section class="footer-social">
        <h3>Redes Sociales</h3>
        <p><i class="fa-brands fa-facebook"></i> Facebook</p>
        <p><i class="fa-brands fa-instagram"></i> Instagram</p>
      </section>
    </div>
    
    <hr class="footer-divider">
    
    <div class="footer-copyright">
      <p>SUMMIT PAQUETES • 2026 TODOS LOS DERECHOS RESERVADOS</p>
    </div>
  </footer>

</body>
</html>