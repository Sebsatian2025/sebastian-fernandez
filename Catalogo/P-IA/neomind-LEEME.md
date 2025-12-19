🤖 NeoMind AI - Landing Page "Cognitive Interface"

Versión: 1.0.0
Nicho: Chatbots / LLMs / Análisis de Datos / DevTools
Estilo: Clean Tech, Terminal Futurista & Dark Mode

📋 Descripción General

NeoMind es una plantilla HTML5 diseñada para transmitir inteligencia, precisión y velocidad. A diferencia de los diseños artísticos, NeoMind utiliza una estética "Engineer-First" (pensada para ingenieros), inspirada en terminales de código, editores IDE (como VS Code) y películas de ciencia ficción técnica.

Es perfecta para startups que venden APIs, asistentes de codificación o herramientas de análisis de datos.

🚀 Características Principales (UX/UI)

1. 📟 Estética "System Core"

Paleta de Colores: Fondo Slate Profundo (#020617) con acentos en Verde Esmeralda (#10b981) para denotar "sistemas operativos" y éxito.

Tipografía Híbrida:

Outfit: Para titulares (limpieza moderna).

JetBrains Mono: Para datos, etiquetas y código (estética hacker).

Detalles Visuales: Patrones de circuitos de fondo y líneas de escaneo (Scanlines).

2. 💬 Hero Section con Simulador de Chat

Consola Interactiva: El elemento central no es una imagen estática, es una interfaz HTML/CSS viva.

Auto-Demo: Si el usuario no interactúa, el sistema ejecuta una demostración automática escribiendo comandos y generando respuestas.

Intervención del Usuario: En cualquier momento, el usuario puede escribir en el input real y el "bot" responderá con un mensaje genérico de procesamiento.

3. 🛡️ Consola de Privacidad (Cookies)

No es un banner: Hemos reemplazado el típico aviso de cookies por una mini-ventana de terminal flotante (privacy_policy.sh).

Animación: Aparece deslizándose desde abajo con opacidad progresiva.

Persistencia: Al aceptar/rechazar, guarda la preferencia en localStorage y desaparece con una animación de cierre de proceso.

4. ⚡ Preloader estilo "BIOS Boot"

Pantalla de carga que simula el arranque de un sistema operativo.

Barra de progreso técnica y logs de texto que se generan dinámicamente (> Loading Core Modules...).

5. 🧊 Componentes Bento Grid

Grid de características con bordes sutiles y efectos de iluminación al pasar el mouse (Hover Glow).

Snippets de código decorativos que aparecen en las tarjetas para reforzar la temática de desarrollo.

🛠️ Stack Tecnológico

Plantilla Single File (Todo en uno) para máxima portabilidad.

HTML5 Semántico: Estructura optimizada para SEO.

Tailwind CSS (CDN): Configuración avanzada inyectada en el <head> para controlar colores, fuentes y animaciones personalizadas (scan, glitch).

Vanilla JavaScript:

Lógica del Chatbot simulado.

Sistema de "Typewriter" (efecto máquina de escribir).

Gestión de estado del Preloader y Cookies.

Font Awesome 6: Iconos vectoriales.

Fuentes Google: Outfit y JetBrains Mono.

⚙️ Cómo Personalizar

1. Cambiar los Textos de la Demo (Chat)

Ve al final del archivo HTML, dentro del <script>, y busca el array demoPrompts. Estos son los textos que el sistema escribirá automáticamente:

const demoPrompts = [
    "Tu nuevo comando aquí...",
    "Analiza mi base de datos...",
    "Genera un componente React..."
];


2. Personalizar la Respuesta del Bot

En la función addBotReply(), puedes cambiar el texto que el bot responde por defecto:

<div class="text-gray-300 ...">
    <span class="text-green-400 ...">> Processing request...</span>
    He analizado tu solicitud... (CAMBIA ESTO)
</div>


3. Ajustar Colores (Theme)

En la configuración de Tailwind en el <head>:

colors: {
    bg: '#020617',       // Fondo Principal (Slate 950)
    surface: '#0f172a',  // Fondo de Paneles (Slate 900)
    primary: '#10b981',  // Color de Acento (Emerald)
    secondary: '#3b82f6',// Color Secundario (Blue)
}


📦 Instalación

No requiere npm install ni servidores complejos.

Guarda el archivo como index.html.

Ábrelo en tu navegador para probarlo.

Súbelo a cualquier hosting estático (GitHub Pages, Netlify, Vercel, o FTP tradicional).

💡 Tips de Venta (Freelance)

Si vas a vender esta plantilla a un cliente, destaca estos puntos:

"Latencia Cero": La web carga instantáneamente gracias a la ausencia de librerías pesadas.

"Interacción Real": La demo del chat retiene al usuario 3 veces más que una imagen estática.

"Confianza Técnica": El diseño transmite seguridad y robustez, ideal para software B2B.

Developed by NeoMind Architecture.