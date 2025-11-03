document.addEventListener("DOMContentLoaded", function () {
    
    /* -------------------------------------------
        1. Lógica de Hover Simulado (Carrusel)
        ------------------------------------------- */
    const cards = document.querySelectorAll(".pillar-servicios");
    let rects = [];

    function calcularRectangulos() {
        // Almacena las dimensiones y posición de las tarjetas.
        rects = Array.from(cards).map(card => card.getBoundingClientRect());
    }

    function activarHoverSimulado() {
        // Determina el centro de la ventana.
        const centroX = window.innerWidth / 2;

        rects.forEach((rect, i) => {
            const cardCentro = rect.left + rect.width / 2;
            // Determina si el centro de la tarjeta está cerca del centro de la pantalla.
            const estaEnZona = Math.abs(cardCentro - centroX) < rect.width / 2;
            
            // Aplica la clase para las animaciones CSS aceleradas (will-change: transform).
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

    // Usa setInterval junto con requestIdleCallback para actualizar la animación
    // de forma periódica, optimizando recursos si el navegador está ocupado.
    setInterval(() => {
        if (window.requestIdleCallback) {
            requestIdleCallback(activarHoverSimulado);
        } else {
            activarHoverSimulado(); 
        }
    }, 200);

    /* -------------------------------------------
        2. Lógica del Preloader y Carga de JSON
        ------------------------------------------- */

    // ********** TIEMPO AJUSTADO A 2000 MS **********
    const TIEMPO_MINIMO_MS = 2000; 

    function ocultarPreloader() {
        const loader = document.getElementById("loader");
        if (loader) {
            // 1. Inicia la transición de CSS (opacity: 0)
            loader.classList.add("hidden"); 
            
            // 2. Elimina el elemento del DOM después de que termine la transición (500ms)
            setTimeout(() => {
                loader.remove(); 
                // Restaura el scroll del cuerpo, si fue bloqueado por el preloader
                document.body.style.overflow = '';
            }, 500); 
        }
    }
    
    // Promesa 1: Esperar que el 100% de la página (recursos visuales) cargue.
    const cargaCompleta = new Promise(resolve => {
        window.addEventListener('load', resolve);
    });

    // Promesa 2: Esperar que pasen 2.0 segundos.
    const tiempoMinimo = new Promise(resolve => {
        setTimeout(resolve, TIEMPO_MINIMO_MS);
    });

    // Carga asincrónica del JSON de idiomas
    fetch('/assets/js/lang.json')
        .then(res => res.json())
        .then(data => {
            window.langData = data;
        })
        .catch(error => {
            console.error('Error cargando lang.json:', error);
        });


    // Ejecuta 'ocultarPreloader' solo cuando AMBAS promesas se resuelvan.
    // Esto garantiza que:
    // a) El usuario vea el preloader durante al menos 2.0 segundos.
    // b) El preloader se muestre hasta que la página haya cargado completamente.
    Promise.all([cargaCompleta, tiempoMinimo])
        .then(ocultarPreloader);

});
