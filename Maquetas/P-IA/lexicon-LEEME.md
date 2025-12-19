📄 Lexicon - Document Intelligence Template

Versión: 1.0.0
Nicho: Legal Tech / Research / EdTech / Chat with PDF
Estilo: Swiss Style, Academic, Clean & Trustworthy

📋 Descripción General

Lexicon es una plantilla diseñada para el mundo profesional de la gestión documental. Su estética "Swiss Style" (Estilo Suizo) prioriza la legibilidad, el orden y la confianza, alejándose deliberadamente de los diseños oscuros y neones de las otras plantillas de IA para ofrecer una experiencia de "papel digital".

Es ideal para startups que venden software a abogados, investigadores, universidades o departamentos financieros.

🚀 Características Principales (UX/UI)

1. 📃 Estética "Paper & Ink"

Paleta: Colores claros inspirados en el papel (#f8fafc) y tinta (#0f172a), con acentos en Azul Cobalto corporativo.

Tipografía Dual:

Merriweather (Serif): Para el documento simulado, facilitando la lectura prolongada y evocando libros impresos.

Inter (Sans): Para la interfaz de usuario (UI) y controles, manteniendo la modernidad.

Patrón de Fondo: Una rejilla milimétrica muy sutil (grid-pattern) que evoca cuadernos de ingeniería o blocs de notas legales.

2. 🖥️ Simulador de "Split View" (Hero)

El corazón de la plantilla es una demostración visual interactiva dividida en dos paneles:

Panel Izquierdo (Visor): Muestra un contrato ficticio con estilos de texto realista. Incluye una animación de subrayado amarillo (marker-highlight) que aparece automáticamente para mostrar que la IA está "leyendo" y encontrando datos clave.

Panel Derecho (Chat): Una interfaz de chat donde la IA responde preguntas citando el documento.

3. 📂 Drag & Drop "Secreto"

Si el usuario arrastra cualquier archivo desde su escritorio sobre la web, aparece un overlay de pantalla completa en azul invitándole a soltar el archivo. ¡Pruébalo! Es un detalle de UX (Experiencia de Usuario) que sorprende mucho y demuestra capacidad técnica.

4. 🔍 Detalles de Credibilidad

Citas en el Chat: Las respuestas de la IA incluyen "chips" visuales (ej. "Ir a pág 1") para reforzar la idea de precisión y evitar alucinaciones.

Iconografía Académica: Uso de iconos específicos (Balanza legal, Matraz de laboratorio, Edificio universitario) en la sección de prueba social.

🛠️ Stack Tecnológico

Plantilla Single File (Todo en uno).

HTML5 Semántico.

Tailwind CSS (CDN):

Configuración de fuentes serif/sans.

Animaciones de fade-in-up y highlight (marcador fluorescente).

Sombras suaves (shadow-float) para dar profundidad a los elementos blancos sobre fondo blanco.

Vanilla JavaScript:

Lógica para el evento de drag & drop (arrastrar y soltar) en toda la ventana.

Font Awesome 6: Iconos de interfaz.

Google Fonts: Inter, Merriweather y JetBrains Mono.

⚙️ Cómo Personalizar

1. Editar el Documento Simulado

En la sección Hero, dentro del div con clase font-serif, puedes cambiar el texto del "contrato" por cualquier otro texto (ej. un paper médico o un reporte financiero) para adaptar el nicho:

<div class="... font-serif ...">
    <h3>TU TÍTULO AQUÍ</h3>
    <p>Tu contenido...</p>
</div>


2. Cambiar el Color de Resaltado

Si prefieres un resaltador verde o rosa en lugar del amarillo clásico, edita la configuración de Tailwind en el <head>:

colors: {
    highlight: '#fef08a', // Cambia este Hex (Amarillo actual)
}


3. Eliminar el Drag & Drop

Si no quieres la funcionalidad de arrastrar archivos, simplemente borra el bloque <div id="dropZone">...</div> al final del HTML y el script correspondiente.

💡 Tips de Venta (Freelance)

Si vendes esta plantilla a una LegalTech o EdTech:

"Claridad Mental": El diseño limpio reduce la carga cognitiva, vital para usuarios que leen documentos densos todo el día.

"Demo Interactiva": La simulación del contrato y el chat en el Hero explica el producto mejor que 1000 palabras de marketing.

"Estética de Autoridad": Se ve como una herramienta establecida y segura (tipo banco o bufete), no como un experimento beta inestable.

Drafted by Lexicon AI.