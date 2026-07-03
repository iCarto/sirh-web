---
name: patrones-visuales-de-marca
description: >-
  Sistema visual de facto de la landing comercial: paleta primary/neutral,
  tipografía Inter, ritmo de secciones, arquetipos de composición, cabeceras,
  cards, CTAs y referencias a plantillas existentes. Usar al maquetar o
  rediseñar para mantener coherencia de marca entre bloques del scroll e idiomas.
---

# Skill: Patrones visuales de marca

## Propósito

Documentar el **design system de facto** ya presente en el código: tokens, composiciones y clases Tailwind reutilizables. Es la fuente operativa de cómo se ve el sitio hoy. Para prohibiciones y anti-patrones genéricos de LLM, combinar con skill `criterios-anti-diseno-generico`.

Para **mensaje, orden del scroll o nombres de bloques**, usar `auditar-arquitectura-informacion`; esta skill no inventaría bloques ni duplica el inventario.

## Documentación del repositorio (leer según afecte)

- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Configuración Tailwind y tokens: `<templates/layout.html>`
- Orden actual del scroll: `<build.mjs>` (array `SECTIONS`) — no duplicar aquí
- Implementaciones de referencia: `<templates/sections/>`, `<templates/partials/header.html>`

## Cuándo usar esta skill

- Al crear o editar un bloque del scroll y necesitar decidir colores, tipografía, bordes o espaciado.
- Al revisar si un cambio “encaja” con el resto de la landing.
- Antes de introducir un patrón visual nuevo: comprobar si ya existe un arquetipo equivalente en `templates/sections/`.

---

## Tokens de marca

Definidos en `templates/layout.html`:

| Token | Uso |
|-------|-----|
| `primary-lighter` / `primary-light` | Fondos suaves, badges, icon containers |
| `primary-main` / `primary-dark` | Acento primario, CTAs, highlights, hover |
| `primary-contrastText` | Texto sobre fondos primary |
| `neutral-0` … `neutral-900` | Fondos, bordes, texto (escala única de neutros) |
| Fuente **Inter** | Única familia sans (`font-sans`) |
| Body | `bg-neutral-50 text-neutral-900 antialiased` |

No añadir colores fuera de `primary` + `neutral` sin motivo de accesibilidad puntual (p. ej. ámbar en alertas de estado).

---

## Ritmo de página

- Contenedor principal: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Padding vertical de sección: `py-20` (apertura: `pt-12 pb-20 md:pt-20 md:pb-28`)
- Alternancia de fondos: `bg-neutral-0` ↔ `bg-neutral-50` entre bloques del scroll
- Grids habituales: `gap-8`; cards internas `gap-4` o `gap-6`
- Cierre oscuro: última sección del array `SECTIONS` — `bg-neutral-900 text-neutral-0`

---

## Cabecera de sección (patrón estándar)

Referencia canónica: `templates/sections/capabilities.html` (cabecera + grid de cards).

```html
<div class="text-center max-w-3xl mx-auto mb-16">
    <span class="text-xs font-semibold uppercase tracking-wider text-neutral-400">{{bloque.eyebrow}}</span>
    <h2 class="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">{{bloque.title}}</h2>
    <p class="mt-4 text-neutral-600 text-lg leading-relaxed">{{bloque.subtitle}}</p>
</div>
```

Variante apertura: badge pill + `h1` con span highlight en `text-primary-main` (primer bloque del scroll; inspeccionar su plantilla en `templates/sections/`).

---

## Componentes recurrentes

### Badge / eyebrow (apertura)

`inline-flex … rounded-full bg-primary-lighter border border-primary-light text-xs font-semibold text-primary-dark uppercase tracking-wider`

### CTA primario

`inline-flex … px-6 py-3 rounded-md text-primary-contrastText bg-primary-main hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main transition-all shadow-md`

### CTA secundario

`… border border-neutral-200 text-neutral-600 bg-neutral-50 hover:bg-neutral-100 focus:ring-primary-main …`

### Card estándar

`bg-neutral-0 p-8 rounded-lg border border-neutral-200 shadow-sm` (+ `hover:border-neutral-300 transition-all` si es interactiva)

### Card elevada (bloques complejos)

`bg-neutral-0 rounded-xl border border-neutral-200 shadow-sm` con cabecera `border-b border-neutral-100`

### Contenedor de icono

`w-12 h-12 rounded bg-primary-lighter text-primary-main flex items-center justify-center` + SVG `w-6 h-6`

### Banner destacado

Gradiente sutil `from-primary-lighter to-neutral-0`, borde `border-primary-light`, acento lateral `w-1 bg-primary-main` (ver implementación en plantillas con banner centrado en `templates/sections/`).

### Header sticky

`templates/partials/header.html`: `sticky top-0 z-50 bg-neutral-0/95 backdrop-blur-md border-b border-neutral-200/80`

---

## Arquetipos de composición

Elegir por **estructura visual**, no por nombre de bloque ni copy. Para ejemplos concretos, inspeccionar `templates/sections/*.html` y comparar el DOM.

| Arquetipo | Cuándo usarlo | Señales en el HTML | Referencia en repo |
|-----------|---------------|-------------------|-------------------|
| **Apertura** | Primer bloque del scroll; gancho + CTA principal | `h1`, badge pill, split 50/50, mockup browser, CTAs dual, padding vertical distinto | Primera entrada de `SECTIONS` |
| **Bloque estándar** | Contenido con cabecera + grid homogéneo de ítems | Cabecera centrada (eyebrow + `h2` + subtítulo) + `grid grid-cols-1 md:grid-cols-2 gap-8` + cards con icono | `capabilities.html` |
| **Split editorial** | Texto narrativo + panel o lista al lado | `lg:grid-cols-12`, columnas desiguales (p. ej. 5+7) | Plantilla con split asimétrico en `templates/sections/` |
| **Banner + layout complejo** | Mensaje destacado + composición asimétrica | Banner con gradiente/borde lateral + `lg:grid-cols-12` con cards anidadas | Plantilla con banner + grid 12 cols |
| **Lista comparativa** | Pares problema/solución o filas con estado | Lista con `divide-y`, badges de estado, alerta puntual (ámbar) | Plantilla con lista comparativa |
| **Cierre oscuro** | Último bloque de conversión | `bg-neutral-900 text-neutral-0`, CTA de acción final | Última entrada de `SECTIONS` |

Al maquetar un bloque nuevo, **clonar la plantilla cuyo árbol de componentes encaje con el arquetipo**. Por defecto, partir de `capabilities.html` salvo que el layout requiera otro arquetipo.

---

## Iconos

- SVG **inline** en plantilla; clave `icon` en JSON + bloques `{{#eq icon "registry"}}` (ver `capabilities.html`).
- Trazo: `stroke="currentColor" stroke-width="1.5"`, `fill="none"`.
- No emojis (ver skill `criterios-anti-diseno-generico`).

---

## Pasos operativos

1. Elegir el **arquetipo de composición** que encaje con el layout deseado (bloque estándar → `capabilities.html`).
2. Abrir la plantilla en `templates/sections/` con estructura más parecida (mismo grid, misma cabecera, mismo tipo de card).
3. Reutilizar cabecera, contenedor, card o CTA de esta skill sin reinventar clases.
4. Si hace falta un token nuevo, extender solo en `layout.html` (`tailwind.config`) y documentar aquí en la siguiente iteración.
5. Validar contraste en bloques oscuros (`bg-neutral-900`) y en texto `text-neutral-600` sobre fondo claro.

## Anti‑patrones

- Introducir Geist, serif o paleta ajena a primary/neutral.
- Mezclar `rounded-md`, `rounded-xl` y `rounded-2xl` sin criterio en el mismo bloque.
- Duplicar estilos de CTA con clases distintas al de apertura/header.
- Hardcodear copy en HTML en lugar de `locales/*.json`.
- Fijar en esta skill nombres de bloques o inventario del scroll (usar `build.mjs` y `auditar-arquitectura-informacion`).

## Checklist rápido

- [ ] Colores solo de primary + neutral (salvo alertas justificadas).
- [ ] Inter / `font-sans` en todo el contenido.
- [ ] Contenedor `max-w-7xl` y `py-20` (salvo apertura).
- [ ] Cabecera de sección con eyebrow + h2 + subtítulo si aplica (patrón `capabilities.html`).
- [ ] CTAs con clases alineadas a apertura/header.
- [ ] Arquetipo coherente con bloques vecinos (misma densidad, fondo alternado, mismos radios en elementos equivalentes).
