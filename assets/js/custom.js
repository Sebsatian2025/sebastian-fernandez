document.addEventListener("DOMContentLoaded", function () {
    
    /* -------------------------
        1. Lógica de Hover Simulado
        ------------------------- */
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
            // Usamos el 'toggle' para aplicar/quitar la clase eficientemente
            cards[i].classList.toggle("hover-simulada", estaEnZona);
        });
    }

    calcularRectangulos(); // Ejecución inicial
    activarHoverSimulado();

    // Re-calcula en resize para mantener la precisión
    window.addEventListener("resize", () => {
        calcularRectangulos();
        activarHoverSimulado();
    });

    // Usa requestIdleCallback de forma segura para ahorrar recursos, aunque setInterval(200) es muy frecuente
    setInterval(() => {
        if (window.requestIdleCallback) {
            requestIdleCallback(activarHoverSimulado);
        } else {
            activarHoverSimulado(); // Fallback si el navegador no lo soporta
        }
    }, 200);

    /* -------------------------
        2. Lógica del Preloader y Carga de JSON
        ------------------------- */

    function ocultarPreloader() {
        const loader = document.getElementById("loader");
        if (loader) {
            // Añadimos la clase CSS para iniciar la transición (opacity: 0)
            loader.classList.add("hidden"); 
            
            // Eliminamos el elemento después del tiempo de la transición (500ms)
            setTimeout(() => {
                loader.remove(); 
                document.body.style.overflow = '';
            }, 500); 
        }
    }
    
    // Carga asincrónica del JSON
    fetch('/assets/js/lang.json')
        .then(res => res.json())
        .then(data => {
            window.langData = data;
            // OPCIÓN A: Ocultar el preloader cuando el recurso clave (JSON) termina de cargar
            // ocultarPreloader(); // Descomenta si el JSON es lo último que debe cargar
        })
        .catch(error => {
            console.error('Error cargando lang.json:', error);
            // Si el fetch falla, ocultamos el preloader para no bloquear al usuario
            ocultarPreloader();
        });


    // OPINIÓN DE RENDIMIENTO:
    // Es mejor ocultar el preloader cuando la carga VISUAL termina (window.onload).
    // Esto asegura que todas las imágenes y fuentes estén listas.

    // Caso de emergencia/Finalización: Ocultar el preloader cuando todos los recursos (imágenes, CSS asíncrono) han cargado.
    window.addEventListener('load', ocultarPreloader);

// Cierre correcto de document.addEventListener("DOMContentLoaded", ...)
});
