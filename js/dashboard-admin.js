(() => {
  const providerKey = 'summit_provider_sites';
  const packageKey = 'summit_custom_packages';
  const numberFormat = new Intl.NumberFormat('es-CO');
  const approvalList = document.getElementById('providerApprovalList');

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function render() {
    const providers = window.SummitStorage.readCollection(providerKey);
    const packages = window.SummitStorage.readCollection(packageKey);
    const approved = providers.filter((provider) => provider.status === 'approved');
    const totalsByDestination = packages.reduce((totals, item) => {
      totals[item.destination] = (totals[item.destination] || 0) + 1;
      return totals;
    }, {});
    const mostPopular = Object.entries(totalsByDestination)
      .sort((left, right) => right[1] - left[1])[0];

    document.getElementById('approvedProviderCount').textContent = String(approved.length);
    document.getElementById('customPackageCount').textContent = String(packages.length);
    document.getElementById('estimatedSales').textContent =
      `$${numberFormat.format(packages.reduce((sum, item) => sum + item.total, 0))} COP`;
    document.getElementById('popularDestination').textContent = mostPopular
      ? `${mostPopular[0]} (${mostPopular[1]})`
      : '—';
    document.getElementById('reservationStatus').textContent = `${packages.length} solicitudes`;

    const pending = providers.filter((provider) => provider.status === 'pending');
    approvalList.innerHTML = pending.length
      ? pending.map((provider) => `
        <article class="dashboard-item">
          <div>
            <h3>${escapeHtml(provider.name)}</h3>
            <p>${provider.type === 'hotel' ? 'Hotel' : 'Restaurante'} · ${escapeHtml(provider.destination)}</p>
            <p>${escapeHtml(provider.description)}</p>
            <p>${provider.services.length} servicios en el catálogo</p>
          </div>
          <div class="admin-provider-actions">
            <button type="button" class="btn2 btn-primary" data-provider-action="approve" data-provider-id="${escapeHtml(provider.id)}">Aprobar</button>
            <button type="button" class="btn2 btn-secondary" data-provider-action="reject" data-provider-id="${escapeHtml(provider.id)}">Rechazar</button>
          </div>
        </article>`).join('')
      : '<p class="dashboard-empty">No hay establecimientos pendientes de aprobación.</p>';
  }

  approvalList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-provider-action]');
    if (!button) return;

    try {
      const providers = window.SummitStorage.readCollection(providerKey);
      const provider = providers.find((item) => item.id === button.dataset.providerId);
      if (!provider || provider.status !== 'pending') {
        throw new Error('El establecimiento ya no está pendiente de revisión.');
      }
      provider.status = button.dataset.providerAction === 'approve' ? 'approved' : 'rejected';
      window.SummitStorage.writeCollection(providerKey, providers);
      render();
    } catch (error) {
      console.error(error);
      approvalList.insertAdjacentHTML('afterbegin',
        `<p class="provider-feedback" role="alert">No fue posible actualizar la solicitud: ${escapeHtml(error.message)}</p>`);
    }
  });

  try {
    render();
  } catch (error) {
    console.error(error);
    approvalList.innerHTML = `<p class="dashboard-empty" role="alert">No se pudieron cargar las métricas: ${escapeHtml(error.message)}</p>`;
  }
})();
