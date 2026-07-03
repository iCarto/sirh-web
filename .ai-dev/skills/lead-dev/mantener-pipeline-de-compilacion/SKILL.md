---
name: mantener-pipeline-de-compilacion
description: >-
  Mantener y depurar build.mjs: SECTIONS, LOCALES, validateLocales, watch y
  salida en dist/. Usar ante errores de build, cambios en el pipeline o
  ampliación de idiomas.
---

# Skill: Mantener pipeline de compilación

## Propósito

Gobernar el script de build del sitio estático: carga de locales, validación i18n, ensamblado de plantillas, escritura en `dist/` y copia de `public/`. Es la skill por defecto ante cualquier cambio en `<build.mjs>` o error de compilación.

## Documentación del repositorio (leer según afecte)

- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Script de build: `<build.mjs>`
- Scripts npm: `<package.json>`
- Salida generada: `<dist/>` (no editar a mano)

## Cuándo usar esta skill

- Depurar errores de `npm run build` o del modo watch (`npm run dev`).
- Añadir, quitar o reordenar entradas en el array `SECTIONS`.
- Añadir un idioma nuevo al array `LOCALES`.
- Modificar `validateLocales`, `copyPublic` o el watch sobre `locales/`, `templates/`, `public/`.
- Integrar una sección ya creada por el designer (solo el registro en `SECTIONS`, no el diseño).

## Flujo del build (resumen)

1. Cargar `locales/en.json` y `locales/es.json`.
2. `validateLocales`: comprobar que `es.json` contiene todas las claves de `en.json`.
3. Por cada idioma en `LOCALES`: renderizar plantillas → escribir `dist/<lang>/index.html`.
4. `copyPublic`: copiar recursivamente `public/` a la raíz de `dist/`.

## Pasos operativos

1. Identificar el síntoma (mensaje de error en consola o salida incompleta en `dist/`).
2. Si el error es `es.json missing keys: …` → añadir las claves faltantes en `locales/es.json` (o coordinar con skill `gestionar-contenido-i18n` del designer).
3. Si el error es JSON inválido → corregir sintaxis en el locale indicado.
4. Si falta una sección en el HTML generado → comprobar que su nombre está en `SECTIONS` y que existe `templates/sections/<nombre>.html`.
5. Si falta un asset → comprobar `public/` y skill `gestionar-recursos-estaticos`.
6. Tras cualquier cambio en `build.mjs` → ejecutar `npm run build` y, si aplica, `npm run preview`.
7. En desarrollo continuo → `npm run dev` (watch con debounce de 150 ms sobre `locales/`, `templates/`, `public/`).

## Casos particulares

**Reordenar secciones:** cambiar solo el orden en `SECTIONS`; no hace falta renombrar archivos.

**Sección nueva (flujo completo):** el designer usa `crear-seccion-landing`; lead-dev interviene si hace falta registrar en `SECTIONS` o depurar el build.

**Añadir idioma:** ampliar `LOCALES`, crear `locales/<code>.json` con paridad de claves respecto a `en.json`, y ajustar `validateLocales` si la regla de referencia cambia.

**Export `build()`:** la función está exportada para uso programático; no eliminar el export sin revisar consumidores.

## Anti‑patrones

- Editar archivos en `dist/` a mano (se sobrescriben en el siguiente build).
- Commitear `dist/` (está en `.gitignore`; el despliegue debe generar salida fresca).
- Añadir plantilla de sección sin registrarla en `SECTIONS` (no aparece en la página).
- Asumir paridad bidireccional `en`/`es`: el build solo exige que `es` no falte respecto a `en`.
- Modificar el motor de plantillas aquí; usar skill `extender-motor-plantillas`.

## Checklist rápido

- [ ] `npm run build` termina con `[build] … OK`.
- [ ] Existen `dist/en/index.html` y `dist/es/index.html`.
- [ ] `SECTIONS` refleja el orden deseado del scroll.
- [ ] `copyPublic` deja los assets en `dist/images/`, etc.
- [ ] No hay cambios manuales en `dist/`.
- [ ] Watch funciona si se tocó la lógica de `--watch`.
