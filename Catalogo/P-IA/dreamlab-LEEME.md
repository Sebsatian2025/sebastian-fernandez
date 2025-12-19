🧠 DreamLab AI - Landing Page Premium

Versión: 1.0.0
Nicho: Inteligencia Artificial / SaaS / Herramientas Generativas
Estilo: Cyberpunk, Dark Mode & Glassmorphism

📋 Descripción General

DreamLab es una plantilla HTML5 de alto impacto diseñada específicamente para startups de Inteligencia Artificial y productos SaaS modernos. No requiere instalación compleja (Node.js, Webpack, etc.), ya que utiliza librerías vía CDN para una implementación inmediata.

El diseño se centra en la conversión y la experiencia de usuario (UX), utilizando efectos visuales avanzados como Glassmorphism (cristal esmerilado), gradientes de neón y animaciones fluidas.

🚀 Características Principales (UX/UI)

1. 🎨 Estética Cyberpunk & Glassmorphism

Paleta de Colores: Fondo "Deep Space" (#030014) con acentos en Violeta, Magenta y Cyan Neón.

Efecto Cristal: Paneles semitransparentes con backdrop-filter: blur para dar profundidad.

Background Animado: Malla (Grid) sutil y orbes de luz flotantes con mezcla de capas (mix-blend-screen).

2. ⚡ Hero Section Interactiva

Input Dinámico: El campo de texto simula escribir prompts automáticamente (efecto máquina de escribir) para educar al usuario.

Interacción Real: El usuario puede pausar la animación haciendo clic y escribir su propio texto.

Focus States: Anillos de luz brillante al seleccionar el input.

3. 🖼️ Galería Infinita (Marquee)

Carrusel de imágenes generado por CSS puro.

Scroll horizontal automático infinito.

Se detiene suavemente al pasar el mouse por encima (hover:pause).

4. 🧱 Bento Grid (Casos de Uso)

Diseño de cuadrícula moderna (estilo Apple/Bento) para mostrar las aplicaciones de la IA (Gaming, Marketing, Arquitectura).

Imágenes de fondo con superposición de degradados y efectos de escala al hacer hover.

5. 💎 Tablas de Precios Reactivas

Tarjetas con efecto de levitación (translate-y).

Sombras de neón dinámicas que cambian según el plan.

Etiqueta "Popular" con brillo pulsante.

6. 🍪 Gestión de Cookies y Privacidad

Banner flotante con diseño acorde a la estética.

Funcionalidad JS: Recuerda la elección del usuario usando localStorage (no vuelve a aparecer si ya se aceptó).

Animación de entrada deslizante.

7. ⏳ Preloader Personalizado

Pantalla de carga inicial con animación de "Cerebro Digital".

Transición suave de desvanecimiento (fade-out) al cargar el contenido.

🛠️ Stack Tecnológico

Esta plantilla es Single File (Todo en uno), lo que facilita su edición y despliegue.

HTML5 Semántico: Estructura clara y accesible.

Tailwind CSS (CDN): Framework de estilos utilitarios. Configuración personalizada inyectada directamente en el <head>.

Vanilla JavaScript: Lógica ligera para el preloader, cookies y efecto de escritura. Sin dependencias pesadas (ni jQuery ni React).

Font Awesome 6: Para los iconos (CDN).

Fuentes Google:

Space Grotesk: Para títulos (aire tecnológico).

Inter: Para textos de lectura (legibilidad).

Recursos Gráficos:

Imágenes de Unsplash (libres de derechos).

Favicon SVG inline (código directo, sin archivo externo).

⚙️ Cómo Personalizar

Cambiar Colores (Theme)

Busca la configuración de Tailwind en el <head> y modifica los códigos HEX:

colors: {
    bg: '#030014',       // Fondo Principal
    surface: '#0F0728',  // Fondo de Tarjetas
    primary: '#a855f7',  // Color Principal (Violeta)
    secondary: '#d946ef',// Color Secundario (Magenta)
    accent: '#00f2ff',   // Color de Acento (Cyan)
}


Editar el Texto del Input (Hero)

Al final del archivo, en el bloque <script>, modifica el array texts:

const texts = [
    "Tu nuevo texto aquí...",
    "Otro ejemplo de prompt...",
    "Escribe lo que quieras..."
];


Cambiar Imágenes

Busca las etiquetas <img> o los div con bg-[url('...')] y reemplaza las URLs de Unsplash por las de tus propios recursos.

📦 Instalación / Despliegue

Guarda el código como index.html (o el nombre que prefieras).

Ábrelo directamente en tu navegador (Chrome, Edge, Safari, Firefox).

Para subirlo a internet, simplemente arrastra el archivo a servicios como Netlify Drop, Vercel o súbelo a tu hosting vía FTP.

© Licencia y Créditos

Diseño y Código: Generado por Gemini (Google).

Imágenes: Unsplash.com

Iconos: FontAwesome Free License.

Uso: Libre para uso personal y comercial.

Hecho con ❤️ e Inteligencia Artificial.