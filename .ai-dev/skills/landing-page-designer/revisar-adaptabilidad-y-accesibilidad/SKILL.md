---
name: revisar-adaptabilidad-y-accesibilidad
description: >-
  Checklist de revisión mobile-first, estados focus, contraste y semántica HTML
  antes de cerrar cambios visuales en la landing comercial. Usar al finalizar
  maquetación o rediseño de secciones.
---

# Skill: Revisar adaptabilidad y accesibilidad

## Propósito

Verificar que un cambio visual es usable en móvil y desktop, accesible en lo esencial y coherente con el header sticky y la navegación por anclas.

## Documentación del repositorio (leer según afecte)

- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Header y nav: `<templates/partials/header.html>`
- Preview local: `<README.md>` (`npm run dev`, `npm run preview`)

## Cuándo usar esta skill

- Tras crear o rediseñar una sección.
- Antes de dar por cerrada una iteración visual.
- Cuando el usuario reporte problemas en móvil, foco de teclado o contraste.

## Checklist responsive (mobile-first)

- [ ] Contenido legible en ~375px de ancho sin scroll horizontal involuntario.
- [ ] Grids colapsan: `grid-cols-1` base → `md:` / `lg:` para multi-columna.
- [ ] CTAs apilables: `flex-col sm:flex-row` donde haya botones lado a lado.
- [ ] Imágenes con `object-cover` o contenedor `aspect-*` sin desbordar.
- [ ] Textos largos (ES) no rompen cards ni desbordan contenedores fijos.
- [ ] Header sticky no tapa anclas al hacer scroll (margen superior de sección si hiciera falta).

## Limitación conocida

El header oculta el nav en móvil (`hidden md:flex`) **sin menú hamburguesa**. No prometer navegación móvil completa salvo que se implemente un partial nuevo.

## Checklist accesibilidad

- [ ] Un solo `h1` por página (hero); secciones usan `h2`/`h3` en orden lógico.
- [ ] Landmarks: contenido en `<section>` con `id` para anclas; header en `<header>`, nav en `<nav>`.
- [ ] Imágenes informativas con `alt` desde locale; decorativas con `alt=""` si aplica.
- [ ] Enlaces y botones con `:focus` visible (`focus:ring-2 focus:ring-icarto-600`).
- [ ] Contraste: texto `text-slate-600` sobre blanco; en `contact` texto claro sobre `bg-icarto-900`.
- [ ] No depender solo del color (iconos o texto acompañan estados).
- [ ] Sin emojis como sustituto de iconos accesibles.

## Checklist interacción

- [ ] Hover en CTAs y enlaces del nav.
- [ ] `mailto:` y enlaces externos con destino claro en copy.
- [ ] `scroll-smooth` en `<html>` (layout) — anclas del nav funcionan.

## Pasos operativos

1. `npm run build` sin errores.
2. `npm run preview` → http://localhost:3000
3. Revisar `/en/` y `/es/` si se tocó copy o layout.
4. Redimensionar viewport (móvil / tablet / desktop).
5. Tabular hasta CTAs principales comprobando anillo de foco.
6. Corregir issues antes de cerrar la tarea.

## Anti‑patrones

- Alt genérico (“image”, “logo”) en capturas de producto.
- Botones `<div onclick>` en lugar de `<a>` / `<button>`.
- Ocultar focus con `outline-none` sin `focus:ring`.
- Alturas fijas en px que recortan texto traducido.
