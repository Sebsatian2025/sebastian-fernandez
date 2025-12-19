⚡ TaskFlow - Autonomous Agents & Productivity Template

Versión: 1.0.0
Nicho: Productivity Tools / Automation / DevTools / SaaS
Estilo: Dark Mode Zen, Developer-First, Linear-Style

📋 Descripción General

TaskFlow es la plantilla definitiva para herramientas de productividad y automatización de última generación. Se inspira en el diseño de interfaces "de culto" como Linear, Raycast o Vercel: oscuras, minimalistas y centradas en la eficiencia.

A diferencia de las webs de marketing tradicionales, TaskFlow transmite una sensación de "sistema operativo". Es ideal para startups que venden orquestación de agentes de IA, gestión de tareas o herramientas para desarrolladores.

🚀 Características Principales (UX/UI)

1. 🌑 Estética "Productivity Zen"

Paleta: Un sistema de grises profundos (#08090a, #121417) diseñado para reducir la fatiga visual. No es negro puro, sino capas de profundidad sutiles.

Tipografía Híbrida:

Inter Tight: Para una UI compacta y densa en información.

Fira Code: Para datos, logs y elementos técnicos, reforzando la naturaleza "programable" de la herramienta.

Detalles: Bordes ultra-finos (1px), gradientes de brillo sutiles (gradient-glow) y sombras difusas.

2. 🔌 Constructor de Flujos (Hero Interactivo)

La pieza central es una simulación técnica de un Workflow de Automatización:

SVG Dinámico: Las líneas de conexión entre nodos (Gmail -> IA -> Slack) se animan (stroke-dasharray) para mostrar el flujo de datos en tiempo real.

Lógica de Estado: Al pulsar "Ejecutar Demo", los nodos cambian de estado visualmente (Thinking -> Done) y aparecen badges de notificación, simulando un proceso real de backend.

3. ⌨️ Command Palette (CMD+K)

Ninguna herramienta moderna está completa sin una paleta de comandos.

TaskFlow incluye una simulación funcional accesible mediante atajo de teclado (Ctrl+K o Cmd+K) o clic en el botón flotante.

Efecto Glass: Un desenfoque de fondo (backdrop-blur) que mantiene el contexto visual.

4. 🧬 Componentes de Alta Fidelidad

Floating Status Bar: Una barra de estado persistente en la esquina inferior derecha, típica de aplicaciones de monitoreo.

Pricing "Developer": Tablas de precios limpias sin distracciones, enfocadas en límites de API y características técnicas.

🛠️ Stack Tecnológico

Plantilla Single File de alto rendimiento.

HTML5 Semántico.

Tailwind CSS (CDN):

Configuración avanzada de colores "Dark Theme".

Animaciones personalizadas para el flujo de datos (keyframes flow).

Vanilla JavaScript:

Lógica asíncrona (async/await) para simular los tiempos de espera de la IA en el Hero.

Gestión de eventos de teclado para la Command Palette.

Sistema de "máquina de escribir" para el texto de la IA.

Font Awesome 6: Iconos de marcas y UI.

Google Fonts: Inter Tight y Fira Code.

⚙️ Cómo Personalizar

1. Modificar el Flujo de la Demo

La lógica del simulador está al final del archivo HTML, dentro de la función runBtn.addEventListener. Puedes cambiar los tiempos de espera o los textos:

// Cambiar el texto que escribe la IA
typewriter(aiText, 'Tu nuevo texto de proceso...');
await wait(2000); // Cambiar duración


2. Ajustar los Colores del Tema

El diseño usa una paleta semántica en la configuración de Tailwind:

colors: {
    bg: '#08090a',       // Fondo principal
    surface: '#121417',  // Fondo de tarjetas
    primary: '#6366f1',  // Color de acento (Indigo actual)
    success: '#22c55e',  // Color de éxito (Verde)
}


3. Editar la Command Palette

Busca el div con id commandPalette. Puedes añadir o quitar opciones de menú (div con clases flex items-center...) para reflejar las funciones reales de tu software.

📦 Instalación

Guarda el archivo como index.html.

Ábrelo en tu navegador.

Despliega en Vercel, Netlify o cualquier servidor estático.

💡 Tips de Venta (Freelance)

Si vendes esta plantilla a una SaaS B2B o DevTool:

"Developer Experience (DX)": El diseño grita "hecho por desarrolladores, para desarrolladores". Esto genera confianza inmediata en el público técnico.

"Velocidad y Eficiencia": La interfaz compacta y oscura sugiere que el software es rápido y ligero.

"Sofisticación": Al imitar el estilo de herramientas líderes como Linear, posicionas el producto de tu cliente en una categoría "Premium/Modern".

Engineered by TaskFlow Systems.