(() => {
  const concepts = [...document.querySelectorAll('.concept')];
  const tabs = [...document.querySelectorAll('[data-slide]')];
  const count = document.querySelector('#current-count');
  const toggle = document.querySelector('#autoplay-toggle');
  const toggleLabel = toggle?.querySelector('.lab-play__label');
  const directionAction = document.querySelector('#direction-action');
  const progress = document.querySelector('.lab-progress span');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 8000;
  let active = 0;
  let timer = null;
  let paused = reduceMotion.matches;

  const restartProgress = () => {
    if (!progress) return;
    progress.classList.remove('is-running');
    progress.style.setProperty('--progress-time', `${interval}ms`);
    void progress.offsetWidth;
    if (!paused) progress.classList.add('is-running');
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (paused) return;
    restartProgress();
    timer = window.setTimeout(() => show((active + 1) % concepts.length, false), interval);
  };

  const show = (next, focusTab = false) => {
    active = (next + concepts.length) % concepts.length;
    concepts.forEach((concept, index) => {
      const selected = index === active;
      concept.classList.toggle('is-active', selected);
      concept.setAttribute('aria-hidden', String(!selected));
    });
    tabs.forEach((tab, index) => {
      const selected = index === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    if (count) count.textContent = String(active + 1).padStart(2, '0');
    const version = `V${active + 1}`;
    if (directionAction) {
      directionAction.textContent = `Discuss ${version}`;
      directionAction.href = `mailto:clarkswift1@gmail.com?subject=${encodeURIComponent(`OpenSeason decision direction ${version}`)}`;
    }
    document.body.dataset.activeConcept = `v${active + 1}`;
    tabs[active]?.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    if (focusTab) tabs[active]?.focus();
    schedule();
  };

  const setPaused = (nextPaused) => {
    paused = nextPaused;
    toggle?.setAttribute('aria-pressed', String(paused));
    if (toggleLabel) toggleLabel.textContent = paused ? 'Resume auto' : 'Pause auto';
    if (paused) {
      window.clearTimeout(timer);
      progress?.classList.remove('is-running');
    } else {
      schedule();
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => show(Number(tab.dataset.slide), false));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      show(active + (event.key === 'ArrowRight' ? 1 : -1), true);
    });
  });

  toggle?.addEventListener('click', () => setPaused(!paused));
  document.addEventListener('keydown', (event) => {
    if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) return;
    if (event.key === 'ArrowLeft') show(active - 1);
    if (event.key === 'ArrowRight') show(active + 1);
    if (event.key === ' ') {
      event.preventDefault();
      setPaused(!paused);
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearTimeout(timer);
    else schedule();
  });
  reduceMotion.addEventListener('change', (event) => setPaused(event.matches));

  setPaused(paused);
  show(0);
})();
