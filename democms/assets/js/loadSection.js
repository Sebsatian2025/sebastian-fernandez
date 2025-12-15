// assets/js/loadSection.js (VERSIÓN COMPLETA CON PRIORIDAD OPFS)
(async function() {

  // ============================================================================
  // FUNCIÓN: Parsear FrontMatter
  // ============================================================================
  function parseFrontMatter(text) {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return {};
    
    const yaml = match[1];
    const lines = yaml.split("\n");
    const data = {};

    lines.forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;
      
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) return;
      
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      data[key] = value;
    });
    
    return data;
  }

// ============================================================================
// FUNCIÓN: Leer desde OPFS (PRIORITARIO) - VERSIÓN CORREGIDA
// ============================================================================
async function loadSectionFromOPFS(sectionName) {
  try {
    // Verificar que OPFS esté disponible
    if (!navigator.storage || !navigator.storage.getDirectory) {
      console.log(`⚠️ OPFS: ${sectionName}.md - Navigator storage no disponible`);
      return null;
    }

    // Obtener el directorio raíz con permisos
    const root = await navigator.storage.getDirectory();
    console.log(`📂 OPFS raíz obtenido correctamente`);

    // Obtener la carpeta 'content'
    const contentDir = await root.getDirectoryHandle('content');
    console.log(`📂 Carpeta 'content' encontrada`);

    // Obtener el archivo
    const fileHandle = await contentDir.getFileHandle(`${sectionName}.md`);
    console.log(`📄 Archivo encontrado: ${sectionName}.md`);

    // Leer el contenido
    const file = await fileHandle.getFile();
    const text = await file.text();

    console.log(`✅ OPFS: ${sectionName}.md cargado exitosamente desde OPFS`);
    return text;

  } catch (e) {
    console.log(`⚠️ OPFS: ${sectionName}.md - Error: ${e.message}`);
    return null;
  }
}


  // ============================================================================
  // HELPERS: Limpieza de nodos
  // ============================================================================
  function cleanWhitespaceTextNodes(container) {
    if (!container || !container.childNodes) return;
    const toRemove = [];
    container.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && /^[\s\u00A0]*$/.test(node.nodeValue)) {
        toRemove.push(node);
      }
    });
    toRemove.forEach(n => n.parentNode.removeChild(n));
  }

  function removeAllChildTextNodes(el) {
    if (!el || !el.childNodes) return;
    const toRemove = [];
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) toRemove.push(node);
    });
    toRemove.forEach(n => n.parentNode.removeChild(n));
  }

  // ============================================================================
  // FUNCIÓN: Aplicar clase de icono
  // ============================================================================
  function applyIconClass(el, classString) {
    const newClasses = String(classString || '').trim().split(/\s+/).filter(Boolean);
    if (!newClasses.length) return;

    const iconClassPrefixes = ['icon-', 'fa-', 'fas', 'far', 'fab', 'fi-', 'mdi-'];
    const prefixRe = new RegExp('^(?:' + iconClassPrefixes.map(s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|') + ')');

    if (el.tagName === 'I') {
      const filtered = newClasses.filter(c => /[A-Za-z_-]/.test(c));
      if (!filtered.length) return;
      el.className = filtered.join(' ');
      return;
    }

    const kept = Array.from(el.classList).filter(c => !prefixRe.test(c));
    const final = [...kept, ...newClasses].join(' ').trim();
    el.className = final;
  }

  // ============================================================================
  // FUNCIÓN: Inyección bilingüe
  // ============================================================================
  function injectBilingualContent(el, data, keyEs, keyEn) {
    const textEs = data[keyEs] || '';
    const textEn = data[keyEn] || '';

    const elEs = el.querySelector('.lang-es');
    const elEn = el.querySelector('.lang-en');

    if (elEs) elEs.textContent = textEs;
    if (elEn) elEn.textContent = textEn;

    const colorKey = keyEs.replace('_es', '_color');
    if (colorKey && data[colorKey]) {
      const color = data[colorKey];
      if (elEs) elEs.style.color = color;
      if (elEn) elEn.style.color = color;
    }
  }

  // ============================================================================
  // FUNCIÓN PRINCIPAL: Cargar sección (PRIORIDAD: OPFS > Fetch)
  // ============================================================================
  async function loadSection(sectionName, mapping) {
    let contentText = null;
    let source = null;

    // 1. INTENTA OPFS PRIMERO (MÁXIMA PRIORIDAD)
    if (window.navigator?.storage?.getDirectory) {
      contentText = await loadSectionFromOPFS(sectionName);
      if (contentText) {
        source = 'OPFS';
      }
    }

    // 2. Si NO está en OPFS, intenta fetch del archivo local
    if (!contentText) {
      try {
        const response = await fetch(`content/${sectionName}.md`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        contentText = await response.text();
        source = 'Fetch';
        console.log(`✅ Fetch: ${sectionName}.md cargado desde archivo local`);
      } catch (err) {
        console.warn(`❌ No se pudo cargar: ${sectionName}.md`);
        return;
      }
    }

    console.log(`📚 Fuente: [${source}] ${sectionName}`);
    const data = parseFrontMatter(contentText);

    // Procesar cada mapeo
    for (const key in mapping) {
      const elementId = mapping[key];
      const el = document.getElementById(elementId);
      if (!el || typeof data[key] === 'undefined') continue;

      const rawValue = String(data[key]).trim();

      // ========================================================
      // MANEJO ESPECÍFICO: header background mode
      // ========================================================
      if (key === 'header_background_mode') {
        const header = document.getElementById('header-section');
        const img = document.getElementById('header-background');
        const mode = rawValue.toLowerCase();

        function applyColor(color) {
          if (!header) return;
          header.style.backgroundImage = 'none';
          header.style.backgroundColor = color || '';
          if (img) img.style.display = 'none';
        }

        if (mode === 'image') {
          const src = data['header_background'];
          if (src) {
            const pre = new Image();
            pre.src = src;
            pre.onload = () => {
              if (header) {
                header.style.backgroundImage = `url("${src}")`;
                header.style.backgroundSize = data['header_background_size'] || 'cover';
                header.style.backgroundPosition = data['header_background_position'] || 'center';
              }
              if (img) img.style.display = 'none';
            };
            pre.onerror = () => {
              if (img) img.style.display = '';
            };
          } else {
            if (img) img.style.display = '';
          }
        } else if (mode === 'color') {
          applyColor(data['header_background_color']);
        } else {
          if (header) {
            header.style.backgroundImage = '';
            header.style.backgroundColor = '';
          }
          if (img) img.style.display = '';
        }
        continue;
      }

      // ========================================================
      // MANEJO BILINGÜE: Títulos, Subtítulos, Botones
      // ========================================================
      if (key.endsWith('_es') && !key.includes('_link') && !key.includes('_color') && !key.includes('_bg')) {
        const keyEn = key.replace('_es', '_en');

        if (key.includes('_desc_')) {
          // Descripciones
          const elEs = el.querySelector('.lang-es') || el;
          const elEn = el.querySelector('.lang-en');
          
          if (typeof marked !== 'undefined' && !/^(BUTTON|A|SPAN|H1|H2|H3|H4|H5|H6)$/.test(el.tagName)) {
            elEs.innerHTML = marked.parse(rawValue);
            if (elEn) elEn.innerHTML = marked.parse(data[keyEn] || '');
          } else {
            elEs.textContent = rawValue;
            if (elEn) elEn.textContent = data[keyEn] || '';
          }
        } else {
          // Títulos, Subtítulos y Botones
          injectBilingualContent(el, data, key, keyEn);
        }
        continue;
      }

      // ========================================================
      // ICONOS: Clases explícitas
      // ========================================================
      if (/^service_icon_\d+_class$/.test(key) || key.includes('_icon_class')) {
        if (el.tagName === 'I') applyIconClass(el, rawValue);
        continue;
      }

      if (el.tagName === 'I' && !rawValue.startsWith('#') && /[A-Za-z_-]/.test(rawValue) && !rawValue.includes('\n')) {
        applyIconClass(el, rawValue);
        continue;
      }

      // ========================================================
      // IMÁGENES
      // ========================================================
      if (el.tagName === 'IMG') {
        el.src = rawValue;
        continue;
      }

      // ========================================================
      // ICONOS DE SERVICIOS: Color, Tamaño, Fondo
      // ========================================================
      if (/^service_icon_\d+_color$/.test(key)) {
        if (el.tagName === 'I') {
          if (rawValue) el.style.color = rawValue;
          else el.style.color = '';
        }
        continue;
      }

      if (/^service_icon_\d+_size$/.test(key)) {
        if (el.tagName === 'I') {
          const px = Number(rawValue) || 0;
          if (px > 0) {
            el.style.fontSize = px + 'px';
            el.style.lineHeight = px + 'px';
          } else {
            el.style.fontSize = '';
            el.style.lineHeight = '';
          }
        }
        continue;
      }

      if (/^service_icon_\d+_bg$/.test(key)) {
        const wrapper = el;
        if (wrapper) {
          if (rawValue) {
            wrapper.style.backgroundColor = rawValue;

            const m = key.match(/^service_icon_(\d+)_bg$/);
            const idx = m ? m[1] : null;
            const sizeKey = idx ? `service_icon_${idx}_size` : null;
            const iconSize = sizeKey && typeof data[sizeKey] !== 'undefined' ? Number(data[sizeKey]) : 36;
            
            const diameterFactor = 3.11;
            const diameter = Math.round(iconSize * diameterFactor);

            wrapper.style.width = diameter + 'px';
            wrapper.style.height = diameter + 'px';
            wrapper.style.display = 'inline-flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';
            wrapper.style.borderRadius = '50%';
          } else {
            wrapper.style.backgroundColor = '';
            wrapper.style.width = '';
            wrapper.style.height = '';
            wrapper.style.display = '';
            wrapper.style.alignItems = '';
            wrapper.style.justifyContent = '';
            wrapper.style.borderRadius = '';
          }
        }
        continue;
      }

      // ========================================================
      // BOTÓN DEL HEADER: Color de fondo y borde
      // ========================================================
      if (key === 'header_button_bg_color') {
        cleanWhitespaceTextNodes(el);

        if (rawValue) {
          el.style.backgroundColor = rawValue;
          el.style.borderColor = rawValue;
        } else {
          el.style.backgroundColor = '';
          el.style.borderColor = '';
        }

        const textColor = data['header_button_text_color'];
        if (textColor) {
          const spans = el.querySelectorAll('.lang-es, .lang-en');
          spans.forEach(span => {
            span.style.color = textColor;
          });
        }
        continue;
      }

      // ⭐⭐⭐ AGREGAR AQUÍ ⭐⭐⭐
// ========================================================
// ========================================================
// BOTÓN DEL HEADER: Link del botón (ESPECÍFICO)
// ========================================================
if (key === 'header_button_link') {
  if (rawValue && /^(#|https?:\/\/)/.test(rawValue)) {
    el.href = rawValue;
    
    // ⭐ Si el link es externo (https://), abrir en nueva pestaña
    if (/^https?:\/\//.test(rawValue)) {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      console.log(`🔗 Link externo configurado: ${rawValue} (se abrirá en nueva pestaña)`);
    } else {
      // Si es un anchor interno (#about), remover target
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  }
  continue;
}

// ⭐ AGREGAR AQUÍ ⭐
// BOTÓN DEL HEADER: Color del texto del botón
if (key === 'header_button_text_color') {
  if (rawValue) {
    const spans = el.querySelectorAll('.lang-es, .lang-en');
    spans.forEach(span => {
      span.style.color = rawValue;
    });
  }
  continue;
}
// ⭐ FIN ⭐
// ⭐⭐⭐ FIN ⭐⭐⭐
      // ========================================================
      // ENLACES GENÉRICOS
      // ========================================================
      if (el.tagName === 'A') {
        if (/^(#|https?:\/\/)/.test(rawValue)) {
          el.href = rawValue;
        }
        continue;
      }

      // ========================================================
      // DESCRIPCIONES DE SERVICIOS
      // ========================================================
      if (elementId && /^service-desc-\d+(?:-en)?$/.test(elementId)) {
        continue;
      }

      // ========================================================
      // COLOR DE FONDO
      // ========================================================
      if (key.includes('_background_color')) {
        el.style.backgroundColor = rawValue;
        continue;
      }

      // ========================================================
      // COLOR DE TEXTO
      // ========================================================
      if (key.includes('_color')) {
        if (rawValue) el.style.color = rawValue;
        continue;
      }

      // ========================================================
      // SPANs
      // ========================================================
      if (el.tagName === 'SPAN') {
        removeAllChildTextNodes(el);
        el.textContent = rawValue;
        continue;
      }

      // ========================================================
      // CONTENIDO GENÉRICO
      // ========================================================
      if (/^[\w- ]+$/.test(rawValue) && !rawValue.includes('\n')) {
        el.textContent = rawValue;
      } else {
        if (typeof marked !== 'undefined' && !/^(BUTTON|A|SPAN|H1|H2|H3|H4|H5|H6)$/.test(el.tagName)) {
          el.innerHTML = marked.parse(rawValue);
        } else {
          el.textContent = rawValue;
        }
      }
    }
  }

  // ============================================================================
// ============================================================================
// INICIALIZAR SECCIONES (CON PRIORIDAD AL CMS)
// ============================================================================
// ============================================================================
// INICIALIZAR SECCIONES (CARGAR SIEMPRE, CMS SOBRESCRIBE DESPUÉS)
// ============================================================================
async function initializeSections() {
  console.log('🚀 Iniciando carga de todas las secciones...\n');

  // ⭐ SIEMPRE cargar todos los archivos originales primero
  // Esto asegura que todos los elementos del DOM estén disponibles
  
  await loadSection("header", {
    header_background: "header-background",
    header_background_color: "header-section",
    header_background_mode: "header-section",
    header_title_es: "header-title",
    header_subtitle_es: "header-subtitle",
    header_button_link: "header-button-link",
    header_button_text_es: "header-button-link",
    header_title_color: "header-title",
    header_subtitle_color: "header-subtitle",
    header_button_bg_color: "header-button-link"
  });

  await loadSection("navigation", {
    nav_link_1_text_es: "nav-link-1",
    nav_link_1_href: "nav-link-1",
    nav_link_2_text_es: "nav-link-2",
    nav_link_2_href: "nav-link-2",
    nav_link_3_text_es: "nav-link-3",
    nav_link_3_href: "nav-link-3",
    nav_link_4_text_es: "nav-link-4",
    nav_link_4_href: "nav-link-4",
    nav_link_5_text_es: "nav-link-5",
    nav_link_5_href: "nav-link-5"
  });

  await loadSection("about", {
    about_background_color: "about-section",
    about_title_es: "about-title",
    about_subtitle_es: "about-subtitle",
    about_button_link: "about-button-link",
    about_button_text_es: "about-button-link"
  });

  await loadSection("services", {
    services_background_color: "services-section",
    services_subtitle_color: "services-subtitle",
    services_subtitle_es: "services-subtitle",
    services_title_es: "services-title",
    
    service_icon_1_class: "service-icon-1",
    service_icon_1_color: "service-icon-1",
    service_icon_1_size: "service-icon-1",
    service_icon_1_bg: "service-icon-wrapper-1",
    service_title_1_es: "service-title-1",
    service_desc_1_es: "service-desc-1",
    
    service_icon_2_class: "service-icon-2",
    service_icon_2_color: "service-icon-2",
    service_icon_2_size: "service-icon-2",
    service_icon_2_bg: "service-icon-wrapper-2",
    service_title_2_es: "service-title-2",
    service_desc_2_es: "service-desc-2",
    
    service_icon_3_class: "service-icon-3",
    service_icon_3_color: "service-icon-3",
    service_icon_3_size: "service-icon-3",
    service_icon_3_bg: "service-icon-wrapper-3",
    service_title_3_es: "service-title-3",
    service_desc_3_es: "service-desc-3",
    
    service_icon_4_class: "service-icon-4",
    service_icon_4_color: "service-icon-4",
    service_icon_4_size: "service-icon-4",
    service_icon_4_bg: "service-icon-wrapper-4",
    service_title_4_es: "service-title-4",
    service_desc_4_es: "service-desc-4"
  });

  await loadSection("portfolio", {
    portfolio_subtitle_es: "portfolio-subtitle",
    portfolio_title_main_es: "portfolio-title-main",
    portfolio_img_1: "portfolio-img-1",
    portfolio_img_2: "portfolio-img-2",
    portfolio_img_3: "portfolio-img-3",
    portfolio_img_4: "portfolio-img-4",
    portfolio_title_1_es: "portfolio-title-1",
    portfolio_title_2_es: "portfolio-title-2",
    portfolio_title_3_es: "portfolio-title-3",
    portfolio_title_4_es: "portfolio-title-4",
    portfolio_desc_1_es: "portfolio-desc-1",
    portfolio_desc_2_es: "portfolio-desc-2",
    portfolio_desc_3_es: "portfolio-desc-3",
    portfolio_desc_4_es: "portfolio-desc-4"
  });

  await loadSection("callout", {
    callout_background: "callout-background",
    callout_title_es: "callout-title",
    callout_button_link: "callout-button-link",
    callout_button_text_es: "callout-button-link"
  });

  await loadSection("cta", {
    cta_background_color: "cta-section",
    cta_title_text_color: "cta-title",
    cta_title_es: "cta-title",
    cta_button_1_text_es: "cta-button-1-link",
    cta_button_1_link: "cta-button-1-link",
    cta_button_2_text_es: "cta-button-2-link",
    cta_button_2_link: "cta-button-2-link"
  });

  await loadSection("footer", {
    footer_link_facebook: "footer-link-facebook",
    footer_link_twitter: "footer-link-twitter",
    footer_link_github: "footer-link-github",
    footer_copy_text_es: "footer-copy-text"
  });

  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden-preloader');
    setTimeout(() => preloader.remove(), 500);
  }

  console.log('✅ Todas las secciones cargadas. Ahora applyCMSUpdate puede sobrescribir.\n');
}



  // ============================================================================
  // ESPERAR DOM LISTO
  // ============================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSections);
  } else {
    initializeSections();
  }

  // ============================================================================
  // EXPORTAR FUNCIÓN PARA SINCRONIZACIÓN EN TIEMPO REAL
  // ============================================================================
  window.loadSectionFunction = loadSection;
  
})();
