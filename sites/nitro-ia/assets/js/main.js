(() => {
  const button = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (button && menu) {
    const close = () => { button.setAttribute('aria-expanded','false'); menu.hidden = true; };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('resize', () => { if (window.innerWidth > 1000) close(); });
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [...document.querySelectorAll('[data-reveal]')];
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.dataset.revealed = 'true');
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.dataset.revealed='true'; io.unobserve(e.target); }
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    items.forEach(el => io.observe(el));
  }

  const spine = document.querySelector('[data-causal-spine]');
  if (spine) {
    if (reduce || !('IntersectionObserver' in window)) spine.classList.add('spine-active');
    else {
      const sio = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { spine.classList.add('spine-active'); sio.disconnect(); }
      }, {threshold:.2});
      sio.observe(spine);
    }
  }
})();
