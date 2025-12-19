🛍️ CartGenius - Retail AI Personalization Template

Versión: 1.0.0
Nicho: E-commerce / Retail Tech / Shopify Apps / Personalization
Estilo: Pop Tech, Gen Z, High Energy & Clean Retail

📋 Descripción General

CartGenius rompe con la monotonía de las webs corporativas B2B. Diseñada para el vertiginoso mundo del E-commerce, adopta una estética "Pop Tech" vibrante que mezcla la limpieza del diseño escandinavo con acentos de color neón (Fucsia/Violeta) para mantener la atención del usuario.

Es la plantilla perfecta para herramientas que prometen aumentar ventas, personalizar la experiencia de compra o gestionar inventarios con IA.

🚀 Características Principales (UX/UI)

1. 🎨 Estética "Impulse Buy" (Compra por Impulso)

Paleta: Fondo Blanco Puro (#ffffff) y Gris Hielo (#f8fafc) para que el producto sea el héroe, contrastado con degradados "Gradient Pop" (Rosa a Violeta) que guían la acción.

Tipografía: Outfit, una fuente geométrica y moderna muy popular en marcas D2C (Direct to Consumer) y Plus Jakarta Sans para una UI legible.

Micro-interacciones: Botones que rebotan (animate-bounce-slow), sombras de colores (shadow-pop) y elementos flotantes.

2. 🎮 Simulador de Personalización (Hero)

El factor "Wow" de esta plantilla. En lugar de explicar la personalización, la mostramos:

Selector de Perfil: El usuario puede hacer clic en "Streetwear", "Minimalist" o "Tech Bro".

Cambio Dinámico: Al seleccionar un perfil, la grilla de productos en el "iPhone" simulado cambia instantáneamente (imágenes, títulos y precios) sin recargar la página, demostrando la velocidad de la IA.

Notificaciones Flotantes: Simulación de alertas de conversión ("Recomendación Exitosa") que aparecen para reforzar la propuesta de valor.

3. 🍪 Cookie Banner Gamificado

Olvida los avisos legales aburridos. CartGenius convierte el consentimiento de cookies en una oportunidad de venta, ofreciendo un código de descuento a cambio de aceptar el rastreo. Esto aumenta drásticamente la tasa de aceptación (Opt-in).

4. 🏷️ Componentes de Retail Moderno

Precios Dinámicos: Tarjetas visuales que muestran el precio anterior tachado y el nuevo precio optimizado por IA.

Bento Grid Comercial: Sección de características con elementos visuales potentes (Búsqueda por cámara, Constructor de Bundles) en lugar de solo texto.

5. 🏃 Ticker de Marcas Infinito

Un carrusel de logotipos de marcas famosas (Nike, Asos, Shopify) que se mueve suavemente, generando prueba social inmediata.

🛠️ Stack Tecnológico

Plantilla Single File optimizada para velocidad de carga (Core Web Vitals).

HTML5 Semántico.

Tailwind CSS (CDN):

Degradados personalizados (bg-gradient-pop).

Animaciones de entrada (pop-in) y brillo (shine).

Sombras de colores personalizados para dar profundidad "glossy".

Vanilla JavaScript:

Lógica del simulador de tienda (objeto JSON con productos y renderizado dinámico).

Gestión del banner de cookies y desbloqueo de descuento.

Font Awesome 6: Iconos de UI.

Google Fonts: Outfit y Plus Jakarta Sans.

⚙️ Cómo Personalizar

1. Cambiar los Productos del Simulador

Ve al final del archivo HTML, dentro del <script>, y busca el objeto const products. Puedes cambiar las imágenes (URLs de Unsplash), títulos y precios para adaptarlo a cualquier nicho (ej. Joyería, Comida, Muebles):

const products = {
    street: [
        { img: "URL_IMAGEN", title: "Tu Producto", price: "$99" },
        // ...
    ],
    // ... otros perfiles
};


2. Modificar los Colores de Marca

Si tu cliente usa otros colores (ej. Verde y Negro), edita la configuración de Tailwind en el <head>:

colors: {
    brand: {
        pink: '#ec4899',   // Color Primario Vibrante
        purple: '#8b5cf6', // Color Secundario
        dark: '#1e1b4b',   // Color de Texto/Fondo Oscuro
    }
}


3. Ajustar el Descuento de Cookies

En la función acceptCookies() del script, puedes cambiar el mensaje de alerta o la lógica de redirección:

alert("¡Código desbloqueado: TU_CODIGO_NUEVO!");


📦 Instalación

Guarda el archivo como index.html.

Ábrelo en tu navegador.

Súbelo a cualquier hosting estático.

💡 Tips de Venta (Freelance)

Si vendes esta plantilla a una tienda online o app de Shopify:

"Conversión es Rey": Todo el diseño está orientado a que el usuario haga clic en "Start Free Trial". Los colores y botones están optimizados para CTR.

"Velocidad Percibida": El simulador instantáneo en el Hero hace sentir que el software es increíblemente rápido.

"Lenguaje Visual Moderno": Se alinea con lo que esperan los consumidores jóvenes (Gen Z / Millennials), alejándose de los diseños "aburridos" de software empresarial antiguo.

Designed for Growth by CartGenius.