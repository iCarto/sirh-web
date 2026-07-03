---
name: create-landing-section
description: >-
  Añadir o reemplazar una sección de la landing comercial: plantilla HTML, claves en
  locales en/es, registro en build.mjs y enlace en nav. Usar al crear bloques
  nuevos en el scroll o reordenar secciones.
---

# Skill: Crear sección de landing

## Propósito

Integrar una sección nueva (o sustituir una existente) en el pipeline estático: plantilla, i18n, build y navegación.

## Documentación del repositorio (leer según afecte)

- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Build y orden de secciones: `<build.mjs>`
- Patrones visuales: skill `brand-visual-patterns`
- Criterios de diseño: skill `anti-generic-design-criteria`

## Cuándo usar esta skill

- Añadir un bloque nuevo al scroll de la landing.
- Reemplazar por completo el HTML de una sección manteniendo o renovando claves JSON.
- Registrar una sección en el menú del header.

## Sintaxis de plantilla soportada (`build.mjs`)

- Escalares: `{{clave}}` o `{{objeto.prop}}`
- Condicionales: `{{#if clave}}…{{/if}}`, `{{#unless clave}}…{{/unless}}`
- Iteración: `{{#each array}}…{{/each}}` (contexto del item mezclado en el scope)
- Comparación: `{{#eq campo "valor"}}…{{/eq}}`

## Pasos operativos

1. **Nombrar** la sección en kebab-case (p. ej. `testimonials` → `testimonials.html`).
2. **Crear** `templates/sections/<nombre>.html` a partir de la plantilla de abajo o clonar la sección más parecida.
3. **Definir** claves en `locales/en.json` bajo un objeto raíz homónimo (p. ej. `"testimonials": { … }`).
4. **Replicar** las mismas claves en `locales/es.json` (el build **falla** si faltan claves en español).
5. **Registrar** el nombre en el array `SECTIONS` de `build.mjs` en la posición deseada del scroll.
6. Si debe aparecer en el menú: añadir entrada en `nav` de ambos locales con `href: "#<id>"` coincidiendo con `id` del `<section>`.
7. Aplicar `brand-visual-patterns` y `anti-generic-design-criteria`.
8. Verificar: `npm run build` (o `npm run dev` + refresh con `npm run preview`).

## Casos particulares

**Reordenar secciones:** solo cambiar el orden en `SECTIONS`; no hace falta tocar plantillas.

**Sección sin nav:** omitir paso 6 si es contenido secundario (p. ej. bloque legal).

**Partial compartido:** si el fragmento se repite, valorar `templates/partials/` (como `header.html`).

## Plantilla de sección

Punto de partida mínimo (sustituir `ejemplo` por el nombre de la sección):

```html
<section id="ejemplo" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{ejemplo.eyebrow}}</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-icarto-900 tracking-tight mt-1">
                {{ejemplo.title}}
            </h2>
            <p class="mt-4 text-slate-600 text-lg leading-relaxed">
                {{ejemplo.subtitle}}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {{#each ejemplo.items}}
            <div class="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                <h3 class="text-icarto-900 font-semibold text-lg">{{title}}</h3>
                <p class="mt-2 text-slate-600 text-sm leading-relaxed">{{description}}</p>
            </div>
            {{/each}}
        </div>

    </div>
</section>
```

## Anti‑patrones

- Texto visible hardcodeado en HTML en lugar del JSON de locale.
- Olvidar `es.json` → build roto con `es.json missing keys`.
- `id` de sección distinto del `href` del nav.
- Añadir sección sin revisar coherencia visual con vecinas.

## Checklist rápido

- [ ] `templates/sections/<nombre>.html` con `id` único en `<section>`.
- [ ] Claves en `en.json` y `es.json` (paridad completa).
- [ ] Entrada en `SECTIONS` de `build.mjs`.
- [ ] Nav actualizado en ambos locales (si aplica).
- [ ] Build OK (`npm run build`).
- [ ] Diseño alineado con skills de marca y anti-genérico.
