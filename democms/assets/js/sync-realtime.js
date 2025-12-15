// assets/js/sync-realtime.js
// Sistema de sincronización OPTIMIZADO - SOLO LEE DESDE OPFS

(function() {
  const SYNC_INTERVAL = 500; // Verifica cada 500ms
  const OPFS_PATH = 'content';
  let lastModified = {};

  console.log('🔄 Sistema de sincronización iniciado - SOLO OPFS');

  // ============================================================================
  // FUNCIÓN: Leer SOLO desde OPFS (sin fallback)
  // ============================================================================
  async function readFromOPFS(sectionName) {
    try {
      if (!navigator.storage?.getDirectory) {
        return null;
      }

      const root = await navigator.storage.getDirectory();
      const fileHandle = await root.getFileHandle(`${OPFS_PATH}/${sectionName}.md`);
      const file = await fileHandle.getFile();
      
      return {
        content: await file.text(),
        lastModified: file.lastModified
      };
    } catch (e) {
      return null;
    }
  }

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
  // FUNCIÓN: Detectar cambios SOLO en OPFS
  // ============================================================================
  async function checkForChanges() {
    const sections = ['header', 'about', 'services', 'portfolio', 'callout', 'cta', 'footer', 'navigation'];
    
    for (const section of sections) {
      const fileData = await readFromOPFS(section);
      
      if (!fileData) continue; // No existe en OPFS
      
      const currentTime = fileData.lastModified;
      const lastTime = lastModified[section];
      
      if (lastTime && lastTime !== currentTime) {
        console.log(`🔴 CAMBIO DETECTADO EN OPFS: ${section}.md`);
        lastModified[section] = currentTime;
        
        // Recargar desde OPFS
        await reloadSectionFromOPFS(section, fileData.content);
      } else if (!lastTime) {
        lastModified[section] = currentTime;
      }
    }
  }

  // ============================================================================
  // FUNCIÓN: Recargar sección desde OPFS
  // ============================================================================
  async function reloadSectionFromOPFS(sectionName, content) {
    console.log(`🚀 Recargando ${sectionName} desde OPFS...`);
    
    const mappings = {
      header: {
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
      },
      about: {
        about_background_color: "about-section",
        about_title_es: "about-title",
        about_subtitle_es: "about-subtitle",
        about_button_link: "about-button-link",
        about_button_text_es: "about-button-link"
      },
      services: {
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
      },
      portfolio: {
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
      },
      callout: {
        callout_background: "callout-background",
        callout_title_es: "callout-title",
        callout_button_link: "callout-button-link",
        callout_button_text_es: "callout-button-link"
      },
      cta: {
        cta_background_color: "cta-section",
        cta_title_text_color: "cta-title",
        cta_title_es: "cta-title",
        cta_button_1_text_es: "cta-button-1-link",
        cta_button_1_link: "cta-button-1-link",
        cta_button_2_text_es: "cta-button-2-link",
        cta_button_2_link: "cta-button-2-link"
      },
      footer: {
        footer_link_facebook: "footer-link-facebook",
        footer_link_twitter: "footer-link-twitter",
        footer_link_github: "footer-link-github",
        footer_copy_text_es: "footer-copy-text"
      },
      navigation: {
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
      }
    };

    const data = parseFrontMatter(content);
    const mapping = mappings[sectionName] || {};

    let updatedCount = 0;
    for (const key in mapping) {
      const elementId = mapping[key];
      const el = document.getElementById(elementId);
      
      if (!el || !data[key]) continue;

      const rawValue = String(data[key]).trim();
      
      // ========== MANEJO ESPECIAL: header_background_mode ==========
      if (key === 'header_background_mode') {
        const header = document.getElementById('header-section');
        const img = document.getElementById('header-background');
        const mode = rawValue.toLowerCase();
        
        console.log(`🎨 [SYNC] Aplicando modo: ${mode}`);
        
        if (mode === 'image') {
          const src = data['header_background'];
          if (src) {
            console.log(`📸 [SYNC] Modo IMAGE: mostrando imagen ${src}`);
            if (img) {
              img.src = src;
              img.style.display = 'block';
              img.style.position = 'absolute';
              img.style.top = '0';
              img.style.left = '0';
              img.style.width = '100%';
              img.style.height = '100%';
              img.style.objectFit = 'cover';
              img.style.zIndex = '0';
            }
            if (header) {
              header.style.backgroundImage = 'none';
              header.style.backgroundColor = 'transparent';
            }
          }
        } else if (mode === 'color') {
          const color = data['header_background_color'];
          console.log(`🎨 [SYNC] Modo COLOR: aplicando color ${color}`);
          if (header) {
            header.style.backgroundColor = color || '';
            header.style.backgroundImage = 'none';
          }
          if (img) {
            img.style.display = 'none';
          }
        } else {
          // Modo "none" o cualquier otro valor
          console.log(`🎨 [SYNC] Modo NONE/DEFAULT: limpiando estilos`);
          if (header) {
            header.style.backgroundImage = '';
            header.style.backgroundColor = '';
          }
          if (img) {
            img.style.display = '';
          }
        }
        updatedCount++;
        continue;
      }
      
      // ========== APLICAR CAMBIOS NORMALES ==========
      if (key.endsWith('_es')) {
        const elEs = el.querySelector('.lang-es') || el;
        if (elEs && elEs.textContent !== rawValue) {
          elEs.textContent = rawValue;
          updatedCount++;
        }
      } else if (el.tagName === 'IMG') {
        if (el.src !== rawValue) {
          el.src = rawValue;
          updatedCount++;
        }
      } else if (el.tagName === 'A') {
        if (el.href !== rawValue && /^(#|https?:\/\/)/.test(rawValue)) {
          el.href = rawValue;
          updatedCount++;
        }
      } else if (key.includes('_color')) {
        if (el.style.color !== rawValue) {
          el.style.color = rawValue;
          updatedCount++;
        }
      } else if (key.includes('_background_color')) {
        if (el.style.backgroundColor !== rawValue) {
          el.style.backgroundColor = rawValue;
          updatedCount++;
        }
      } else {
        if (el.textContent !== rawValue) {
          el.textContent = rawValue;
          updatedCount++;
        }
      }
    }

    console.log(`✨ ${sectionName}: ${updatedCount} elementos actualizados\n`);
  }

  // ============================================================================
  // INICIAR SINCRONIZACIÓN
  // ============================================================================
  function initSync() {
    console.log('✅ Verificando OPFS cada 500ms\n');
    
    setInterval(checkForChanges, SYNC_INTERVAL);
    
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        console.log('👁️ Pestaña activa - verificando OPFS...');
        checkForChanges();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSync);
  } else {
    initSync();
  }
})();
