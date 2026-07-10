---
name: gestionar-recursos-estaticos
description: >-
  Añadir o referenciar assets en public/: imágenes, favicons e iconos. Mantener
  rutas absolutas /images/... y verificar copia a dist/ en el build. Usar al
  incorporar archivos estáticos nuevos.
---

# Skill: Gestionar recursos estáticos

## Propósito

Gobernar archivos en `public/` y sus referencias desde locales, layout o plantillas. El build copia `public/` a la raíz de `dist/` sin transformación; las rutas deben ser coherentes con ese esquema.

## Documentación del repositorio (leer según afecte)

- Carpeta de assets: `<public/>`
- Copia en build: `<build.mjs>` (`copyPublic`, `copyDir`)
- Referencias en contenido: `<locales/en.json>`, `<locales/es.json>`
- Favicons y OG en shell: `<templates/layout.html>`
- Estructura del repo: `<docs/devs/repository-structure.md>`

## Cuándo usar esta skill

- Cargar siempre `escribir-codigo-limpio` junto con esta skill cuando haya cambios en código.
- Añadir imágenes, iconos, PDFs u otros archivos estáticos.
- Actualizar rutas de imagen en JSON o en `layout.html`.
- Sustituir favicons o apple-touch-icon.
- Depurar assets que no aparecen en preview o en despliegue (404).

## Convención de rutas

- Desde el sitio servido: rutas **absolutas desde la raíz** → `/images/nombre.png`.
- En disco: archivo bajo `public/images/nombre.png` → URL `/images/nombre.png` en `dist/`.
- No usar rutas relativas al idioma (`../images/`) ni rutas que asuman `dist/en/` como raíz del host.

## Pasos operativos

1. Colocar el archivo en `public/` (p. ej. `public/images/hero-screenshot.png`).
2. Referenciar con ruta absoluta:
   - Contenido traducible → clave en `locales/en.json` y `locales/es.json` (skill `gestionar-contenido-i18n`).
   - Meta global (favicon, OG) → `templates/layout.html`.
   - Atributo fijo en plantilla → solo si no es traducible; preferir locale.
3. Ejecutar `npm run build`.
4. Comprobar que existe `dist/images/...` (o ruta equivalente).
5. Verificar en `npm run preview` que la URL carga (p. ej. `http://localhost:3000/images/...`).

## Casos particulares

**Favicon legacy:** existe `public/favicon.ico` además de PNG en `layout.html`; mantener coherencia si se renueva la marca.

**Imágenes en HTML de sección:** evitar `src` hardcodeado; usar `{{seccion.imagen}}` desde locale.

**Assets solo en `dist/`:** incorrecto; siempre añadir la fuente en `public/`.

**Tamaño y formato:** optimizar imágenes antes de commit; sin pipeline de optimización en build. Criterios y prioridades: `<docs/devs/web-sustainability.md>`.

## Anti‑patrones

- Referenciar `/images/foo.png` sin archivo en `public/images/foo.png`.
- Rutas relativas en JSON (`images/foo.png` sin barra inicial) que rompen según el host.
- Commitear assets generados solo en `dist/`.
- Duplicar el mismo asset con nombres distintos en `public/` y `dist/`.

## Checklist rápido

- [ ] Archivo presente en `public/` con nombre estable.
- [ ] Referencia con ruta absoluta `/images/...` (o subcarpeta bajo `public/`).
- [ ] Si el texto alt es traducible, clave en ambos locales.
- [ ] `npm run build` copia el asset a `dist/`.
- [ ] Preview sin 404 en el asset añadido o sustituido.
