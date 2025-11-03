document.addEventListener("DOMContentLoaded", function () {
  // Hover simulado optimizado
  const cards = document.querySelectorAll(".pillar-servicios");
  let rects = [];

  function calcularRectangulos() {
    rects = Array.from(cards).map(card => card.getBoundingClientRect());
  }

  function activarHoverSimulado() {
    const centroX = window.innerWidth / 2;

    rects.forEach((rect, i) => {
      const cardCentro = rect.left + rect.width / 2;
      const estaEnZona = Math.abs(cardCentro - centroX) < rect.width / 2;
      cards[i].classList.toggle("hover-simulada", estaEnZona);
    });
  }

  calcularRectangulos(); // inicial
  activarHoverSimulado();

  window.addEventListener("resize", () => {
    calcularRectangulos();
    activarHoverSimulado();
  });

  setInterval(() => {
    requestIdleCallback(activarHoverSimulado);
  }, 200);

  // Carga asincrónica del JSON
  fetch('/assets/js/lang.json')
    .then(res => res.json())
    .then(data => {
      window.langData = data;
    });
});
