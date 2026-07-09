---
name: modificar-envoltura-del-sitio
description: >-
  Modificar el shell técnico del sitio: layout.html, partials estructurales,
  meta/OG, hreflang, favicons y tokens Tailwind CDN. Usar para cambios de
  documento base sin rediseñar secciones.
---

# Skill: Modificar envoltura del sitio

## Propósito

Gobernar la envoltura HTML del sitio: `<head>`, estructura del documento, partials reutilizables y configuración técnica de Tailwind vía CDN. No cubre maquetación visual de secciones de scroll (rol designer).

## Documentación del repositorio (leer según afecte)

- Shell del documento: `<templates/layout.html>`
- Header y nav: `<templates/partials/header.html>`
- Ensamblado en build: `<build.mjs>` (`renderPage`)
- Tokens de marca: `<docs/brand/tokens.json>`, `<docs/brand/IDENTITY.md>`
- Estructura del repo: `<docs/devs/repository-structure.md>`

## Cuándo usar esta skill

- Cargar siempre `escribir-codigo-limpio` junto con esta skill cuando haya cambios en código.
- Añadir o cambiar meta tags, Open Graph, `hreflang` o favicons.
- Actualizar `tailwind.config` embebido en `layout.html` (colores, fuentes).
- Modificar skip link, clases base de `<body>` o punto de inyección `{{sections}}`.
- Crear o alterar un partial estructural en `templates/partials/` (p. ej. footer compartido).
- Sincronizar tokens técnicos del layout con `docs/brand/tokens.json`.

## Cómo se ensambla la página

`renderPage` en `build.mjs`:

1. Renderiza `templates/partials/header.html` con el locale activo.
2. Concatena cada sección de `SECTIONS` dentro de `<main id="main-content">`.
3. Inyecta el bloque resultante en `layout.html` como `{{sections}}`.
4. Renderiza de nuevo el layout con el contexto del locale (meta, alternate, etc.).

## Pasos operativos

1. Identificar si el cambio es de shell (`layout.html`, `partials/`) o de sección (`templates/sections/`); solo lo primero entra en esta skill.
2. Para meta/OG: preferir claves de `locales/` (`meta.title`, `meta.description`) en lugar de texto fijo en HTML.
3. Para favicons y OG image: usar rutas absolutas `/images/...` y comprobar que el archivo existe en `public/`.
4. Para colores Tailwind (`primary`, `secondary`, `neutral`): alinear valores hex con `<docs/brand/tokens.json>`; el criterio visual lo valida el designer.
5. Para partials nuevos: crear en `templates/partials/` e incluirlos desde `renderPage` o desde secciones según corresponda.
6. Ejecutar `npm run build` y revisar `<head>` y estructura en `dist/en/index.html` y `dist/es/index.html`.
7. Si el cambio afecta navegación o CTAs visibles, coordinar con el designer.

## Casos particulares

**Skip link:** el texto "Skip to content" está hardcodeado en inglés en `layout.html`; unificar i18n del shell requiere claves en locales y plantilla del layout.

**OG image global:** actualmente fija en layout; mover a locale si debe variar por idioma.

**Header sticky:** cambios estructurales en `header.html` pueden afectar anclas y responsive; revisar con skill `revisar-adaptabilidad-y-accesibilidad` del designer.

**Clases `icarto-*` en secciones:** algunas secciones usan alias no definidos en `tailwind.config` del layout; al tocar tokens, comprobar coherencia en `templates/sections/`.

## Anti‑patrones

- Texto visible traducible hardcodeado en `layout.html` o partials (debe vivir en `locales/`).
- Rutas relativas a assets que fallan según `/en/` o `/es/`.
- Cambiar colores solo en secciones sin actualizar tokens del layout o `docs/brand/`.
- Rediseñar el header completo aquí sin criterio del designer (marca, CTAs, espaciado).

## Checklist rápido

- [ ] Cambio en `layout.html` y/o `templates/partials/` según alcance.
- [ ] Meta y OG usan claves de locale cuando el contenido es traducible.
- [ ] Favicons y OG image resuelven desde `public/`.
- [ ] Tokens de color alineados con `docs/brand/tokens.json` si se modificaron.
- [ ] `npm run build` OK; `<head>` y `<main>` correctos en ambos idiomas.
- [ ] Sin regresión obvia en header/nav (preview manual).
