---
name: patrones-visuales-de-marca
description: >-
  Sistema visual de facto de la landing comercial: paleta icarto, tipografía
  Inter, ritmo de secciones, cabeceras, cards, CTAs y referencias a plantillas
  existentes. Usar al maquetar o rediseñar para mantener coherencia de marca
  entre secciones e idiomas.
---

# Skill: Patrones visuales de marca

## Propósito

Documentar el **design system de facto** ya presente en el código: tokens, composiciones y clases Tailwind reutilizables. Es la fuente operativa de cómo se ve el sitio hoy. Para prohibiciones y anti-patrones genéricos de LLM, combinar con skill `criterios-anti-diseno-generico`.

## Documentación del repositorio (leer según afecte)

- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Configuración Tailwind y tokens: `<templates/layout.html>`
- Referencia de secciones: `<templates/sections/>`, `<templates/partials/header.html>`

## Cuándo usar esta skill

- Al crear o editar una sección y necesitar decidir colores, tipografía, bordes o espaciado.
- Al revisar si un cambio “encaja” con el resto de la landing.
- Antes de introducir un patrón visual nuevo: comprobar si ya existe uno equivalente en otra sección.

---

## Tokens de marca

Definidos en `templates/layout.html`:

| Token | Uso |
|-------|-----|
| `icarto-50` / `icarto-100` | Fondos suaves, badges, icon containers |
| `icarto-600` / `icarto-700` | Acento primario, CTAs, highlights, hover |
| `icarto-800` / `icarto-900` | Texto principal, sección oscura de cierre |
| `slate-50` … `slate-900` | Neutros, bordes, texto secundario |
| Fuente **Inter** | Única familia sans (`font-sans`) |
| Body | `bg-slate-50 text-icarto-900 antialiased` |

No añadir colores fuera de esta paleta sin motivo de accesibilidad puntual (p. ej. ámbar en alertas de `challenges.html`).

---

## Ritmo de página

- Contenedor principal: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Padding vertical de sección: `py-20` (hero: `pt-12 pb-20 md:pt-20 md:pb-28`)
- Alternancia de fondos: `bg-white` ↔ `bg-slate-50` entre secciones
- Grids habituales: `gap-8`; cards internas `gap-4` o `gap-6`
- Sección de cierre: `contact.html` — `bg-icarto-900 text-white`

---

## Cabecera de sección (patrón estándar)

Usado en `capabilities.html`, `proven.html`, etc.:

```html
<div class="text-center max-w-3xl mx-auto mb-16">
    <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{seccion.eyebrow}}</span>
    <h2 class="text-2xl sm:text-3xl font-bold text-icarto-900 tracking-tight mt-1">{{seccion.title}}</h2>
    <p class="mt-4 text-slate-600 text-lg leading-relaxed">{{seccion.subtitle}}</p>
</div>
```

Variante hero: badge pill + `h1` con span highlight en `text-icarto-600` (`hero.html`).

---

## Componentes recurrentes

### Badge / eyebrow (hero)

`inline-flex … rounded-full bg-icarto-50 border border-icarto-100 text-xs font-semibold text-icarto-700 uppercase tracking-wider`

### CTA primario

`inline-flex … px-6 py-3 rounded-md text-white bg-icarto-600 hover:bg-icarto-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-icarto-600 transition-all shadow-md`

### CTA secundario

`… border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 focus:ring-icarto-600 …`

### Card estándar

`bg-white p-8 rounded-lg border border-slate-200 shadow-sm` (+ `hover:border-slate-300 transition-all` si es interactiva)

### Card elevada (bloques complejos)

`bg-white rounded-xl border border-slate-200 shadow-sm` con cabecera `border-b border-slate-100`

### Contenedor de icono

`w-12 h-12 rounded bg-icarto-50 text-icarto-600 flex items-center justify-center` + SVG `w-6 h-6`

### Banner destacado

Ver `proven.html`: gradiente sutil `from-icarto-50 to-white`, borde `border-icarto-200`, acento lateral `w-1 bg-icarto-600`

### Header sticky

`templates/partials/header.html`: `sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80`

---

## Secciones canónicas (referencia)

| Sección | Archivo | Patrón dominante |
|---------|---------|------------------|
| Hero | `hero.html` | Split 50/50, mockup browser, CTAs dual |
| Impacto | `proven.html` | Cabecera + banner + grid complejo |
| Retos | `challenges.html` | Comparativa problema/solución, alerta ámbar |
| Capacidades | `capabilities.html` | Grid 2 cols + iconos `{{#eq icon}}` |
| Contacto | `contact.html` | Fondo oscuro, CTA email, footer info |

Al añadir contenido, **copiar el tono visual** de la sección más parecida en propósito.

---

## Iconos

- SVG **inline** en plantilla; clave `icon` en JSON + bloques `{{#eq icon "registry"}}` (ver `capabilities.html`).
- Trazo: `stroke="currentColor" stroke-width="1.5"`, `fill="none"`.
- No emojis (ver skill `criterios-anti-diseno-generico`).

---

## Pasos operativos

1. Identificar la sección vecina más similar en propósito y abrir su plantilla.
2. Reutilizar cabecera, contenedor, card o CTA de esta skill sin reinventar clases.
3. Si hace falta un token nuevo, extender solo en `layout.html` (`tailwind.config`) y documentar aquí en la siguiente iteración.
4. Validar contraste en secciones oscuras (`contact`) y en texto `text-slate-600` sobre blanco.

## Anti‑patrones

- Introducir Geist, serif o paleta ajena a icarto/slate.
- Mezclar `rounded-md`, `rounded-xl` y `rounded-2xl` sin criterio en la misma sección.
- Duplicar estilos de CTA con clases distintas al hero/header.
- Hardcodear copy en HTML en lugar de `locales/*.json`.

## Checklist rápido

- [ ] Colores solo de icarto + slate (salvo alertas justificadas).
- [ ] Inter / `font-sans` en todo el contenido.
- [ ] Contenedor `max-w-7xl` y `py-20` (salvo hero).
- [ ] Cabecera de sección con eyebrow + h2 + subtítulo si aplica.
- [ ] CTAs con clases alineadas a hero/header.
- [ ] Patrón visual coherente con sección vecina de referencia.
