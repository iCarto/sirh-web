# Iconografía de la landing

## Objetivo

Documentar el origen, la licencia y las convenciones de los iconos SVG usados en las plantillas de la landing comercial.

## Alcance

- Iconos decorativos e informativos en `templates/` (secciones y partials).
- No incluye favicons ni imágenes raster en `public/images/` (ver `gestionar-recursos-estaticos`).

## Fuente y fuente de verdad

Los iconos provienen de **[Heroicons](https://heroicons.com)** v2 (Tailwind Labs), variante **outline**, licencia **MIT**.

- Referencia de paths: tag [v2.1.5](https://github.com/tailwindlabs/heroicons/tree/v2.1.5/src/24/outline) del repositorio oficial.
- No hay dependencia npm ni CDN de iconos.
- La **fuente de verdad técnica** de los SVG está en `data/icons.mjs` (objeto `ICONS`).
- Copiar siempre desde el botón «Copy SVG» de heroicons.com (outline, 24×24); no reescribir el atributo `d` a mano.
- **No usar paths de Heroicons v1** (obsoletos y visualmente distintos).

## Reglas generales

| Regla | Valor |
| ------- | ------- |
| Versión | Heroicons **v2** outline únicamente |
| Formato | SVG centralizado en `data/icons.mjs` y renderizado desde plantilla |
| Trazo | `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"` |
| Tamaño habitual | `class="w-5 h-5"` en tabs; `w-6 h-6` en contenedores grandes |
| Accesibilidad | `aria-hidden="true"` si es decorativo; el texto adyacente aporta significado |
| Color | Heredado vía `currentColor` y clases Tailwind del contenedor (`text-primary-main`, etc.) |
| Prohibido | Emojis como iconografía (ver `criterios-anti-diseno-generico`) |

### Patrón en `capabilities.html`

La clave `icon` en `locales/*.json` se resuelve con el helper `{{iconSvg icon}}`, que toma el SVG desde `data/icons.mjs`. Ver `templates/sections/capabilities.html` y `build.mjs`.

## Fuentes de verdad operativas

- Catálogo técnico centralizado de SVG: `data/icons.mjs` (objeto `ICONS`).
- Resolución de iconos en el render: `lib/template-engine.mjs` (`iconSvg` / `renderIconSvg`), usado por `build.mjs`.
- Uso en secciones/partials:
  - `templates/sections/capabilities.html` (`{{iconSvg icon}}`)
  - `templates/sections/proven.html` (`{{iconSvg "globe"}}`, `{{iconSvg "check"}}`)
  - `templates/sections/contact.html` (`{{iconSvg "mail"}}`)
  - `templates/partials/header.html` (`{{iconSvg "menu"}}`, `{{iconSvg "x-mark"}}`)
  - `templates/partials/footer.html` (`{{iconSvg "mail"}}`, `{{iconSvg "link"}}`, `{{iconSvg "globe"}}`)

Al añadir un icono nuevo:

1) añadir la entrada en `data/icons.mjs`,
2) usar su clave (`icon`) en el contenido correspondiente,
3) si aplica, ajustar la plantilla para invocarlo vía `{{iconSvg ...}}`.

## Casos particulares

- **Tabs de capacidades**: cada icono va dentro de un contenedor `w-11 h-11 rounded-lg bg-neutral-0 border …` (ver skill `patrones-visuales-de-marca`) y se inyecta con `{{iconSvg icon}}`.
- **Iconos con varios `<path>`** (p. ej. `chart-bar`, `map-pin`): copiar todos los paths del SVG oficial; no fusionarlos en uno solo.
- **Iconos fuera de `capabilities`**: pegados directamente en la sección correspondiente sin clave `icon` en JSON.

## Anti-patrones

| Anti-patrón | Efecto |
| ----------- | ------ |
| Usar paths de Heroicons v1 | Inconsistencia visual con el resto de iconos v2 |
| Truncar o editar el atributo `d` del `<path>` al copiar | Icono roto o irreconocible |
| Mezclar `stroke-width` (1.5 vs 2) | Trazos desiguales entre secciones |
| Instalar Font Awesome u otra librería sin acuerdo | Dependencia extra incompatible con el stack estático sin npm |
| Usar emojis en locale o markup | Inconsistente con la identidad de marca y peor accesibilidad |
| Guardar `.svg` sueltos en `public/` para iconos de UI | Duplica fuente de verdad; el proyecto usa `data/icons.mjs` |

## Referencias

- Identidad visual: `IDENTITY.md`
- Patrones de maquetación: skill `patrones-visuales-de-marca`
- Heroicons: [https://heroicons.com](https://heroicons.com)
