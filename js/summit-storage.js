(() => {
  function readCollection(key) {
    const stored = localStorage.getItem(key);
    if (!stored) return [];

    const value = JSON.parse(stored);
    if (!Array.isArray(value)) {
      throw new TypeError(`El almacenamiento "${key}" no contiene una lista válida.`);
    }
    return value;
  }

  function writeCollection(key, value) {
    if (!Array.isArray(value)) {
      throw new TypeError('Solo se pueden guardar listas en el almacenamiento SUMMIT.');
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  window.SummitStorage = { readCollection, writeCollection };
})();
