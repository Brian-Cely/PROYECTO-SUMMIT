// banner.js - Rotador opcional de imágenes de fondo
document.addEventListener("DOMContentLoaded", () => {
  const heroBanner = document.querySelector(".hero-banner");
  
  // Lista de imágenes de paisajes de Cundinamarca / Aventura
  const imagenesFondo = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80"
  ];

  let indice = 0;

  // Cambia la imagen de fondo cada 6 segundos
  setInterval(() => {
    indice = (indice + 1) % imagenesFondo.length;
    if (heroBanner) {
      heroBanner.style.backgroundImage = `url('${imagenesFondo[indice]}')`;
    }
  }, 6000);
});