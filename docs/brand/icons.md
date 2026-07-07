# Iconografía de la landing

## Objetivo

Documentar el origen, la licencia y las convenciones de los iconos SVG usados en las plantillas de la landing comercial.

## Alcance

- Iconos decorativos e informativos en `templates/` (secciones y partials).
- No incluye favicons ni imágenes raster en `public/images/` (ver `gestionar-recursos-estaticos`).

## Fuente

Los iconos provienen de **[Heroicons](https://heroicons.com)** v2 (Tailwind Labs), variante **outline**, licencia **MIT**.

- Referencia de paths: tag [v2.1.5](https://github.com/tailwindlabs/heroicons/tree/v2.1.5/src/24/outline) del repositorio oficial.
- No hay dependencia npm ni CDN de iconos: el markup SVG se copia **inline** en las plantillas HTML.
- Copiar siempre desde el botón «Copy SVG» de heroicons.com (outline, 24×24); no reescribir el atributo `d` a mano.
- **No usar paths de Heroicons v1** (obsoletos y visualmente distintos).

## Reglas generales

| Regla | Valor |
|-------|-------|
| Versión | Heroicons **v2** outline únicamente |
| Formato | SVG inline en plantilla |
| Trazo | `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"` |
| Tamaño habitual | `class="w-5 h-5"` en tabs; `w-6 h-6` en contenedores grandes |
| Accesibilidad | `aria-hidden="true"` si es decorativo; el texto adyacente aporta significado |
| Color | Heredado vía `currentColor` y clases Tailwind del contenedor (`text-primary-main`, etc.) |
| Prohibido | Emojis como iconografía (ver `criterios-anti-diseno-generico`) |

### Patrón en `capabilities.html`

La clave `icon` en `locales/*.json` se resuelve con bloques `{{#eq icon "…"}}` que renderizan el SVG correspondiente. Ver `templates/sections/capabilities.html`.

## Catálogo en uso

| Clave / ubicación | Heroicons v2 (nombre) | Plantilla |
|-------------------|----------------------|-----------|
| `registry` | `document-text` | `capabilities.html` |
| `gis` | `map` | `capabilities.html`, `proven.html` (placeholder) |
| `estimation` | `chart-bar` | `capabilities.html` |
| `workflow` | `clipboard-document-list` | `capabilities.html` |
| `document` | `arrow-down-tray` | `capabilities.html` |
| `billing` | `banknotes` | `capabilities.html` |
| — (placeholder imagen) | `photo` | `capabilities.html`, `hero.html` |
| — (contacto) | `envelope` | `contact.html` |
| `portal` | `user-group` | `ecosystem.html` |
| `mobile` | `device-phone-mobile` | `ecosystem.html` |
| — (contextos) | `globe-alt` | `proven.html` |
| — (país) | `map-pin` | `proven.html` |
| — (escala) | `chart-bar` | `proven.html` |
| — (resultados) | `check-circle` | `proven.html` |
| — (ítem resultado) | `check` | `proven.html` |
| — (menú móvil) | `bars-3` | `partials/header.html` |

Al añadir un icono nuevo, actualizar esta tabla.

## Casos particulares

- **Tabs de capacidades**: cada icono va dentro de un contenedor `w-11 h-11 rounded-lg bg-neutral-0 border …` (ver skill `patrones-visuales-de-marca`).
- **Iconos con varios `<path>`** (p. ej. `chart-bar`, `map-pin`): copiar todos los paths del SVG oficial; no fusionarlos en uno solo.
- **Iconos fuera de `capabilities`**: pegados directamente en la sección correspondiente sin clave `icon` en JSON.

## Anti-patrones

| Anti-patrón | Efecto |
|-------------|--------|
| Usar paths de Heroicons v1 | Inconsistencia visual con el resto de iconos v2 |
| Truncar o editar el atributo `d` del `<path>` al copiar | Icono roto o irreconocible |
| Mezclar `stroke-width` (1.5 vs 2) | Trazos desiguales entre secciones |
| Instalar Font Awesome u otra librería sin acuerdo | Dependencia extra incompatible con el stack estático sin npm |
| Usar emojis en locale o markup | Inconsistente con la identidad de marca y peor accesibilidad |
| Guardar `.svg` sueltos en `public/` para iconos de UI | Duplica fuente de verdad; el proyecto usa inline en plantillas |

## Referencias

- Identidad visual: `IDENTITY.md`
- Patrones de maquetación: skill `patrones-visuales-de-marca`
- Heroicons: https://heroicons.com
