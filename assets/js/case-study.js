document.querySelectorAll('[data-case-gallery]').forEach((gallery) => {
  const slides = Array.from(gallery.querySelectorAll('[data-case-slide]'));
  const previous = gallery.querySelector('[data-case-previous]');
  const next = gallery.querySelector('[data-case-next]');
  const current = gallery.querySelector('[data-case-current]');
  let activeIndex = 0;

  if (!slides.length || !previous || !next || !current) return;

  const render = () => {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.hidden = !isActive;
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    current.textContent = String(activeIndex + 1).padStart(2, '0');
  };

  const move = (amount) => {
    activeIndex = (activeIndex + amount + slides.length) % slides.length;
    render();
  };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  });

  render();
});
