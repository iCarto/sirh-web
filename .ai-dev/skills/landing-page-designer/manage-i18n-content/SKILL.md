---
name: manage-i18n-content
description: >-
  Editar textos, cifras, enlaces y metadatos de la landing en locales/en.json y
  locales/es.json manteniendo paridad de claves y layouts compatibles con ES más
  largo. Usar al cambiar copy, CTAs, nav o traducciones sin tocar layout.
---

# Skill: Gestionar contenido i18n

## Propósito

Separar cambios de **contenido** (JSON) de cambios de **presentación** (HTML). Garantizar paridad `en`/`es` y layouts que no se rompan con traducciones más largas.

## Documentación del repositorio (leer según afecte)

- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Locales: `<locales/en.json>`, `<locales/es.json>`
- Validación en build: `<build.mjs>` (`validateLocales`)
- Qué editar: `<README.md>`

## Cuándo usar esta skill

- Cambiar titulares, descripciones, cifras, labels o CTAs.
- Añadir traducciones al español.
- Actualizar enlaces (`href`, `mailto:`, URLs externas).
- Cambiar metadatos (`meta.title`) o rutas de imágenes en JSON.

## Estructura del locale

| Bloque | Contenido |
|--------|-----------|
| `meta` | `title`, `lang` |
| `alternate` | URLs `/en/`, `/es/` |
| `langActive` | Clases Tailwind del idioma activo en header |
| `brand` | Logo, nombre, enlace corporativo |
| `nav` | Array `{ label, href }` — anclas `#seccion` |
| `cta` | Texto y href del botón del header |
| `<seccion>` | Objeto por sección (`hero`, `proven`, …) |

## Pasos operativos

1. Editar **primero** `locales/en.json` (referencia de claves).
2. Copiar la misma estructura de claves a `locales/es.json` con traducción.
3. Para arrays (`nav`, `items`, `figures`): mantener **mismo número de elementos** y mismas claves en cada item salvo rediseño acordado.
4. Rutas de imagen: valor en JSON (p. ej. `hero.screenshot: "/images/…"`), no en HTML.
5. Ejecutar `npm run build` para validar paridad; corregir claves faltantes en `es.json`.
6. Si el texto ES es mucho más largo y rompe el layout → escalar cambio a plantilla HTML (skill `create-landing-section`), no acortar traducción artificialmente.

## Reglas de copy y layout

- CTAs: verbos claros (“Request a technical demo”, “Solicitar demo técnica”).
- Anclas: `href` debe coincidir con `id` de la sección (`#contact`, `#capabilities`).
- No usar emojis en valores JSON (skill `anti-generic-design-criteria`).
- `langActive`: idioma activo lleva clases (`bg-icarto-50 text-icarto-700`); el otro idioma string vacío.

## Anti‑patrones

- Clave solo en un locale.
- Texto visible en HTML que debería ser traducible.
- URLs relativas incorrectas para imágenes (usar `/images/...` desde raíz del sitio).
- Truncar traducción española para encajar en diseño rígido.

## Checklist rápido

- [ ] Cambio aplicado en `en.json`.
- [ ] Mismas claves en `es.json`.
- [ ] `npm run build` sin error de keys missing.
- [ ] Nav/CTAs/anclas coherentes.
- [ ] Sin emojis en strings.
- [ ] Layout revisado con copy ES más largo (mental o en preview).
