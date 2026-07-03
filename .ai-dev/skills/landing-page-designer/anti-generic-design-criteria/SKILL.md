---
name: anti-generic-design-criteria
description: >-
  Criterios de diseño senior y anti-patrones de UI genérica de LLM para la
  landing comercial (HTML estático, Tailwind, SVG). Usar al crear, mejorar o
  revisar UI cuando haga falta gusto visual, estados, tipografía, espaciado,
  color o responsive sin caer en clichés (heroes centrados, gradientes morados,
  filas de 3 cards, glows, H1 enormes, emojis).
---

# Skill: Criterios de diseño anti-genérico

## Propósito

Aplicar criterio de diseño senior y restricciones explícitas que eviten la UI repetitiva que generan los LLM. Complementa la skill `brand-visual-patterns`: allí vive el sistema de marca; aquí viven las **prohibiciones y alternativas** de calidad visual.

## Documentación del repositorio (leer según afecte)

- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Patrones de marca: skill `brand-visual-patterns` en la misma carpeta
- Comandos de preview: `<README.md>`

## Cuándo usar esta skill

- Al crear, mejorar o revisar UI de la landing con fuerte criterio de diseño.
- Cuando haya que decidir tipografía, espaciado, color, estados hover/focus o comportamiento responsive con juicio senior.
- Cuando el usuario pida evitar UI genérica de LLM o elevar el nivel visual sin perder credibilidad institucional (B2G).
- **No usar** para deploy, build, alcance funcional del producto interno ni arquitectura de aplicaciones complejas.

## Alcance del stack

- HTML estático en `templates/`, estilos con **Tailwind CSS** (CDN), iconos **SVG inline**.
- Sin React, Next.js, librerías de motion ni dependencias npm de iconos salvo que el proyecto las incorpore explícitamente.
- Animaciones: solo CSS/Tailwind discretas (`transition-*`, `animate-pulse` puntual); no motion engines ni cursores custom.

## Regla de convivencia con secciones existentes

- **Secciones ya publicadas** (`hero`, `proven`, `capabilities`, etc.): mantener coherencia con vecinas salvo que el usuario pida **rediseño explícito**.
- **Secciones nuevas o rediseño acordado**: aplicar aquí todos los criterios anti-genéricos, incluso si implica alejarse de un patrón antiguo (p. ej. grid de 3 columnas iguales).

---

## ANTI-EMOJI POLICY [CRITICAL]

**NUNCA** usar emojis en código, markup, textos de locale, `alt` ni comentarios visibles.

- Sustituir símbolos por **SVG inline** limpios (como en `templates/sections/capabilities.html`).
- Los emojis están **PROHIBIDOS**.

---

## Visual y CSS

| Prohibido | Alternativa recomendada |
|-----------|---------------------|
| Glows / outer neon (`shadow-cyan-500/50`, halos) | `shadow-sm` o sombra difusa ligera; profundidad con `border border-slate-200` |
| `#000000` / negro puro | `text-icarto-900`, `bg-slate-900`, `bg-icarto-900` |
| Acentos oversaturados (cyan chillón, purple SaaS) | Paleta `icarto` de `templates/layout.html`; acentos contenidos |
| Gradient text en titulares grandes | Color sólido + peso (`font-bold`, `text-icarto-600` en highlight) |
| Cursores personalizados | Cursor del sistema |
| Gradientes decorativos cliché (morado→rosa, blobs) | Fondos `bg-white` / `bg-slate-50`; acento puntual con gradiente de marca muy sutil (como banner en `proven.html`) |
| `shadow-2xl` exagerado en bloques de contenido | `shadow-sm` / `shadow-md` en CTAs; bordes antes que sombras pesadas |

**Production-ready cleanliness:** el código debe ser limpio, memorable y refinado en detalle (estados hover/focus, alineación, sin clases redundantes).

---

## Tipografía

| Prohibido | Alternativa recomendada |
|-----------|---------------------|
| H1 que “grita” (`text-6xl`, `text-7xl`) | Máximo ~`text-4xl lg:text-5xl` en hero; jerarquía con **peso y color**, no solo escala |
| Serif en landing institucional/comercial | **Inter** (sans) exclusivamente, vía `layout.html` |
| Tracking laxo en titulares | `tracking-tight` en headings; `tracking-wider` solo en eyebrows/labels |
| Párrafos demasiado anchos | `max-w-2xl` / `max-w-3xl` en bloques de lectura |

---

## Layout y espaciado

| Prohibido | Alternativa recomendada |
|-----------|---------------------|
| Fila genérica de **3 cards iguales** en horizontal | Grid **2 columnas**, **zig-zag** (imagen/texto alternados), lista vertical con separadores o scroll horizontal en móvil |
| Elementos “flotando” con gaps incoherentes | Escala consistente: `py-20` secciones, `gap-8` grids, `p-8` interior de cards |
| Padding/margin arbitrarios (`p-7`, `mt-9`) | Preferir escala Tailwind estándar (`4`, `6`, `8`, `12`, `16`, `20`) |
| Hero solo centrado + blob gradient + un CTA | Hero **split** (contenido + visual), como `templates/sections/hero.html` |
| Card overuse (todo en cajas) | Mezclar superficies: texto libre, listas, banners lineales, una card destacada |

**Alinear y espaciar con intención:** revisar que columnas, iconos y baselines queden alineados; evitar huecos accidentales entre bloques relacionados.

---

## Superficies premium (principios destilados, no Bento literal)

Cuando el usuario pida un rediseño más premium **sin** imponer otro stack:

- Fondo de página: `bg-slate-50` (body) o `bg-white` en sección.
- Cards: `bg-white`, borde `border-slate-200` (opcional `/50`), `rounded-xl`.
- Sombra difusa opcional: `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]` — ligera, no glow.
- Padding interior generoso: `p-8` o `p-10`.
- **No** imponer Geist/Satoshi ni `rounded-[2.5rem]` si rompe coherencia con Inter y `rounded-lg`/`rounded-xl` del resto del sitio.

El paradigma “Bento / motion-engine” completo queda **fuera de alcance** salvo rediseño global explícito.

---

## Estados interactivos (obligatorio)

Todo enlace o botón de acción debe incluir como mínimo:

- `hover:` coherente con marca (`hover:bg-icarto-700`, `hover:text-icarto-600`)
- `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-icarto-600`
- `transition-all` o `transition-colors` donde aplique

No entregar CTAs “planos” sin estados.

---

## Anti‑patrones (síntoma → corrección)

- Hero centrado con gradiente morado y dos párrafos genéricos → split layout + copy desde locales + paleta icarto.
- Tres icon-cards idénticas en fila → 2 cols, zig-zag o lista con `divide-y`.
- Texto con emoji en JSON → quitar; usar SVG o texto plano.
- Titular gigante sin subtítulo ni eyebrow → restaurar jerarquía (eyebrow + h2 + lead).
- Layout que rompe en español → flex-wrap, sin alturas fijas, probar copy más largo.
- Sombras de neón en cards → borde + `shadow-sm`.

## Checklist rápido

- [ ] Sin emojis en markup, locales ni alt.
- [ ] Sin `#000`, glows ni purple-gradient cliché.
- [ ] H1/H2 con escala contenida; Inter only.
- [ ] Sin fila genérica de 3 cards en trabajo nuevo/rediseño.
- [ ] Espaciado en escala Tailwind coherente (`py-20`, `gap-8`, `p-8`).
- [ ] CTAs y enlaces con hover + focus visibles.
- [ ] Layout probado mentalmente con textos ES más largos.
- [ ] Coherencia con `brand-visual-patterns` y secciones vecinas.
