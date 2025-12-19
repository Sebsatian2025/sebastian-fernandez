🎬 Motion AI - Cinematic Video Generation Template

Versión: 1.0.0
Nicho: Video AI / Text-to-Video / Filmmaking Tools / VFX
Estilo: Dark Cinema, Film Grain & Red Carpet

📋 Descripción General

Motion es la plantilla definitiva para herramientas de generación de video por IA (como Sora, Runway o Pika). A diferencia de las plantillas corporativas, Motion adopta un lenguaje visual cinematográfico.

El diseño utiliza un "Dark Mode" puro (Negro #000000) con superposiciones de grano de película y acentos en Rojo Carmesí (#dc2626), evocando la estética de cámaras de cine RED, salas de edición y alfombras rojas.

🚀 Características Principales (UX/UI)

1. 🎥 Atmósfera "Director's Cut"

Fondo Ken Burns: La imagen del Hero no es estática; se mueve y escala lentamente (scale 1.15), creando una sensación de movimiento perpetuo sin usar video pesado.

Film Grain Overlay: Una capa fija (fixed overlay) con ruido SVG que añade textura y elimina la sensación "plana" de las webs digitales.

Tipografía: Oswald, una fuente condensada y fuerte, típica de los créditos de películas y pósters de cine.

2. 🎞️ Simulación de Estudio de Edición

Timeline UI: La sección "Studio Mode" recrea visualmente la interfaz de un software de edición no lineal (NLE) como Premiere o DaVinci Resolve usando solo CSS.

Playhead Animado: Una línea de tiempo con cabezal de reproducción y pistas de video/audio simuladas, demostrando que la herramienta ofrece control granular.

3. 🔴 Acentos "Recording"

Botones y detalles en Rojo Puro que recuerdan al piloto de "GRABANDO" (REC) de una cámara.

Animaciones de pulso (animate-pulse-rec) en los indicadores de estado.

4. ♾️ Infinite Video Reel

Un carrusel infinito (marquee) que muestra thumbnails de videos generados.

Efecto Hover: Al pasar el mouse, las imágenes hacen zoom y aparece un botón de "Play", invitando a ver el contenido.

5. ⚡ Preloader de Cuenta Regresiva

En lugar de una barra de carga, usamos una cuenta regresiva de cine clásico (5, 4, 3...), preparando al usuario para el "estreno".

🛠️ Stack Tecnológico

Plantilla Single File de alto rendimiento visual.

HTML5 Semántico: Estructura optimizada.

Tailwind CSS (CDN):

Filtros SVG inline para el efecto de ruido (Grain).

Animaciones personalizadas: ken-burns, scroll, grain.

Gradientes de viñeta (radial-gradient) para enfocar la atención en el centro.

Vanilla JavaScript:

Lógica de cuenta regresiva del preloader.

Sin dependencias pesadas de video players.

Font Awesome 6: Iconos de multimedia (Play, Pause, Camera, Clapperboard).

Google Fonts: Oswald (Títulos) & Inter (Cuerpo).

⚙️ Cómo Personalizar

1. Cambiar la Imagen de Fondo (Hero)

En la sección Hero, busca el div con la clase bg-[url('...')] y cambia la URL por un fotograma impactante de tu producto:

<div class="w-full h-full bg-[url('TU_IMAGEN.jpg')] ..."></div>


2. Ajustar el Color de Acento (Branding)

Si la marca de tu cliente no es roja, cambia la configuración en el <head>:

colors: {
    black: '#000000',
    red: '#dc2626',      // <--- CAMBIA ESTO (Ej. Naranja #f97316)
    redHover: '#b91c1c', // <--- Y SU VERSIÓN OSCURA
}


3. Modificar el Reel Infinito

Simplemente duplica o reemplaza los div dentro del contenedor animate-scroll con tus propias imágenes de demostración.

📦 Instalación

Guarda el archivo como index.html.

Ábrelo en tu navegador.

Listo para producción en cualquier servidor estático.

💡 Tips de Venta (Freelance)

Si vendes esta plantilla a una startup de video o agencia creativa:

"Narrativa Visual": Explica que el diseño cuenta una historia. El usuario se siente un creador nada más entrar.

"Calidad Percibida": El uso de negro puro y tipografías condensadas se asocia con marcas de lujo y alta tecnología (High-End).

"Sin Video Pesado": Logramos una web que parece video pero carga instantáneamente porque usamos trucos de CSS (Ken Burns) en lugar de mp4 de fondo.

Directed by Motion AI.