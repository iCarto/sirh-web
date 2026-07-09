# Identidad visual SIRH

Contrato de identidad visual portable entre productos del ecosistema SIRH (aplicación interna, landing comercial, marketing).  
Las **reglas** viven aquí (`IDENTITY.md`). Los **valores** semánticos portables viven en `docs/brand/tokens.json`, que debe actuar como fuente primaria para el tema de cada producto.

En **esta landing estática**: el build inyecta los colores de `docs/brand/tokens.json` en `templates/layout.html` (Tailwind CDN, roles semánticos `primary`, `secondary`, `neutral`, Inter). Los patrones operativos de maquetación viven en la skill `patrones-visuales-de-marca`.

## Overview

SIRH transmite una imagen institucional, sobria y legible. La landing comercial prioriza credibilidad, claridad del mensaje y conversión: jerarquía de scroll, CTAs visibles y coherencia entre idiomas. La aplicación interna mantiene la misma postura funcional con mayor densidad de información operativa.

Los roles de marca de la landing (`primary`, `secondary`, `neutral`) no sustituyen los roles de dominio de la app (`crop`, `abstraction`, etc.) salvo decisión explícita de unificación de marca.

## Colors

Usar siempre **roles semánticos**, no valores sueltos en código o diseño. Los hex concretos están en `tokens.json`.

**Landing comercial** — cuatro grupos en el tema (`layout.html`):

- `primary`: marca (cian), CTAs principales y anillos de foco.
- `secondary`: acento alternativo cuando el primario no encaje; mismos valores que en el ecosistema SIRH.
- `neutral` (`0`–`900`): escala única para fondos, bordes y texto. Sin grupo `text` aparte: la jerarquía tipográfica usa los tonos medios-altos (`600`–`900`); los fondos, los bajos (`0`–`100`).

Convenciones habituales en la landing:

| Uso | Rol |
|---|---|
| Fondo de página | `neutral-50` |
| Cards y secciones claras | `neutral-0` |
| Bloques hundidos | `neutral-100` |
| Bordes | `neutral-200` / `neutral-100` |
| Texto principal | `neutral-900` |
| Texto secundario | `neutral-600` |
| Metadatos | `neutral-400` / `neutral-500` |
| Fondo oscuro | `neutral-900` |
| Panel sobre oscuro | `neutral-800` |

**Aplicación SIRH (referencia compartida)**

- `accent`, `domain.*`: app interna; no forman parte del tema de la landing salvo alineación explícita.

Usar variantes `light`, `lighter` y `dark` del mismo rol para jerarquía, no nuevos roles ad hoc. Colores de alerta puntuales (ámbar, esmeralda) solo con justificación de estado, no como paleta de marca.

## Typography

Tipografía funcional y de alta legibilidad. En la landing, **Inter** como única familia sans.

Jerarquía clara en el scroll: badge/eyebrow → título de sección → subtítulo → cuerpo → metadatos. Los encabezados estructuran cada bloque sin competir con el CTA principal. Evitar saltos bruscos de tamaño y pesos decorativos que distraigan del mensaje comercial.

## Layout

Enfoque **mobile-first** y espaciado basado en unidad común (`spacing.unit` en `tokens.json`).

Cada sección del scroll debe dejar claro: contexto (eyebrow), contenido principal y acción cuando aplique. Ritmo vertical consistente entre secciones; alternancia de fondos para separar bloques sin sombras fuertes. El hero puede usar padding vertical distinto al resto por su función de apertura.

Evitar bloques visualmente inconexos o contenedores que rompan el ancho máximo habitual de la página.

## Elevation & Depth

Profundidad contenida: priorizar separación por espaciado, contraste y bordes (`neutral-200`) antes que sombras marcadas. Sombras suaves (`shadow-sm`, `shadow-md`) solo en cards, mockups y CTAs para indicar interactividad.

En la sección oscura de cierre, el contraste texto/fondo y los estados de foco deben mantenerse legibles.

## Shapes

Radios y bordes consistentes entre elementos equivalentes:

- Botones y CTAs: radio medio.
- Cards estándar: radio moderado.
- Bloques complejos y banners: radio amplio.
- Badges pill: forma completamente redondeada.

No mezclar estilos geométricos incompatibles dentro de la misma sección.

## Components

Patrones estables en la landing:

- Cabecera de sección: eyebrow + título + subtítulo centrados.
- CTAs primario y secundario con la misma jerarquía en hero, header y contacto.
- Cards con densidad y ritmo similares entre secciones vecinas.
- Iconos SVG inline con trazo uniforme; sin emojis como iconografía. Fuente y catálogo: `icons.md`.

Las variantes nuevas solo si resuelven un caso recurrente; deben aplicarse primero en `templates/layout.html` (si afectan tokens globales) y reflejarse en `tokens.json`. El detalle de clases y composiciones vive en `patrones-visuales-de-marca`, no en este documento.

## Do's and Don'ts

### Do

- Cambiar valores en `docs/brand/tokens.json`; el build sincroniza el tema de `layout.html`.
- Mantener jerarquía visual clara en cada sección del scroll.
- Priorizar contraste legible, foco visible y estados hover coherentes.
- Mantener consistencia entre idiomas y entre secciones del mismo tipo.
- Actualizar `IDENTITY.md` solo cuando cambien reglas o intención visual.
- Delegar patrones operativos de maquetación a la skill `patrones-visuales-de-marca`.

### Don't

- Editar colores hardcodeados en `layout.html` sin reflejarlos en `tokens.json`.
- Hardcodear colores de marca fuera de la paleta definida en `layout.html`.
- Duplicar valores entre tema y `tokens.json` sin sincronizar tras el cambio.
- Mezclar reglas de implementación Tailwind o rutas de plantillas en este documento.
- Confundir los roles de marca de la landing con roles de dominio de la app SIRH sin justificación.
- Usar color como único canal para estado o criticidad.
- Cambiar la apariencia de acciones equivalentes entre secciones sin motivo.
