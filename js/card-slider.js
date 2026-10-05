document.querySelectorAll('.card-media').forEach(media => {
  const slider = media.querySelector('.card-slider');
  const previousButton = media.querySelector('.slider-btn.prev');
  const nextButton = media.querySelector('.slider-btn.next');

  if (!slider || !previousButton || !nextButton) {
    return;
  }

  const updateButtons = () => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    previousButton.disabled = slider.scrollLeft <= 1;
    nextButton.disabled = slider.scrollLeft >= maxScroll - 1;
  };

  previousButton.addEventListener('click', () => {
    slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
  });

  nextButton.addEventListener('click', () => {
    slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
  });

  slider.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
});
