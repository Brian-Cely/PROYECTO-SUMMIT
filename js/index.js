const searchForm = document.getElementById('searchForm');
const searchDate = document.getElementById('searchDate');

function getTodayDate() {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
}

searchDate.min = getTodayDate();

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const destination = document.getElementById('searchDestination').value;
  const date = searchDate.value;

  if (!destination || !date || date < getTodayDate()) {
    searchDate.setCustomValidity(date && date < getTodayDate()
      ? 'Selecciona una fecha igual o posterior a hoy.'
      : '');
    searchForm.reportValidity();
    return;
  }

  window.location.href = `paquetes.html?destino=${encodeURIComponent(destination)}&fecha=${encodeURIComponent(date)}#paquete-${encodeURIComponent(destination)}`;
});

searchDate.addEventListener('input', () => searchDate.setCustomValidity(''));
