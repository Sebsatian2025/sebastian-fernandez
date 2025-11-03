document.addEventListener('DOMContentLoaded', () => {
  // ---------- helpers ----------
  const rIC = window.requestIdleCallback || function (fn) { return setTimeout(fn, 50); };
  const cancelRIC = window.cancelIdleCallback || function (id) { clearTimeout(id); };

  function debounce(fn, wait = 150) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // ---------- Hover simulado optimizado ----------
  const cards = Array.from(document.querySelectorAll('.pillar-servicios'));
  let rects = [];

  function calcularRectangulos() {
    // Si no hay cards o están diferidas, salimos
    if (!cards.length) return;
    rects = cards.map(card => card.getBoundingClientRect());
  }

  function activarHoverSimulado() {
    if (!rects.length || !cards.length) return;
    const centroX = window.innerWidth / 2;
    rects.forEach((rect, i) => {
      const cardCentro = rect.left + rect.width / 2;
      const estaEnZona = Math.abs(cardCentro - centroX) < rect.width / 2;
      cards[i].classList.toggle('hover-simulada', estaEnZona);
    });
  }

  // inicial: calculamos solo si los elementos están renderizados
  calcularRectangulos();
  activarHoverSimulado();

  // resize con debounce y recalculo de rects
  window.addEventListener('resize', debounce(() => {
    calcularRectangulos();
    activarHoverSimulado();
  }, 150), { passive: true });

  // run periódicamente pero usando rIC para no bloquear
  const intervalId = setInterval(() => {
    rIC(activarHoverSimulado);
  }, 200);

  // Si fuera necesario limpiar en navegación SPA, exportar clearInterval/clearTimeout

  // ---------- Carga asincrónica del JSON ----------
  fetch('/assets/js/lang.json')
    .then(res => res.json())
    .then(data => { window.langData = data; })
    .catch(() => { /* silencioso: no romper si falla */ });

  // ---------- Auto-defer: IntersectionObserver para secciones fuera del primer fold ----------
  const candidates = document.querySelectorAll('main > section, .stats-section, .services-section, .skills-section, .contact-section');
  const rootMargin = '200px';
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('defer-render');
          observer.unobserve(el);
          // Si este elemento contiene .pillar-servicios y aún no hemos calculado rects, recalcular
          if (el.querySelector && el.querySelector('.pillar-servicios')) {
            // pequeña demora para permitir al navegador renderizar
            setTimeout(() => { calcularRectangulos(); activarHoverSimulado(); }, 60);
          }
        } else {
          // no marcar hero / home / header
          if (!el.matches('#home') && !el.closest('#header') && !el.classList.contains('hero')) {
            el.classList.add('defer-render');
          }
        }
      });
    }, { root: null, rootMargin, threshold: 0.01 });

    candidates.forEach(el => {
      if (el.id === 'home' || el.closest('#header') || el.classList.contains('hero')) return;
      io.observe(el);
    });
  } else {
    // fallback: si no hay IntersectionObserver, aplicamos defer por defecto a secciones no críticas
    candidates.forEach(el => {
      if (el.id === 'home' || el.closest('#header') || el.classList.contains('hero')) return;
      el.classList.add('defer-render');
    });
  }
});
