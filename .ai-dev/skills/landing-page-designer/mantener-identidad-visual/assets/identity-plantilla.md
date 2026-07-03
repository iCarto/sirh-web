# Identidad visual (plantilla)

Contrato de identidad visual portable entre productos SIRH.  
Las **reglas** viven aquí. Los **valores** portables viven en `docs/brand/tokens.json`, sincronizados desde el tema de cada producto.

En **esta landing estática**: sincronizar desde `templates/layout.html` (Tailwind CDN, paleta `icarto`, Inter).

## Overview

<!-- Personalidad visual, audiencia, postura comercial. Indicar que los valores de la landing se sincronizan desde layout.html. -->

## Colors

<!-- Uso de roles semánticos. Sin listar hex; remitir a tokens.json. Paleta icarto en la landing; roles compartidos con la app SIRH si aplica. -->

## Typography

<!-- Jerarquía, legibilidad, Inter en la landing. Tono de encabezados vs cuerpo. -->

## Layout

<!-- Mobile-first, ritmo entre secciones, jerarquía de conversión en la landing. -->

## Elevation & Depth

<!-- Uso contenido de sombras y capas; bordes antes que sombras fuertes. -->

## Shapes

<!-- Consistencia de radios y bordes (rounded-lg, rounded-xl, etc.). -->

## Components

<!-- Patrones estables: cabeceras de sección, cards, CTAs, nav. Sin detalle de clases Tailwind. -->

## Do's and Don'ts

### Do

- Cambiar valores primero en `templates/layout.html`; sincronizar `tokens.json` después.
- Mantener jerarquía visual clara en cada sección del scroll.
- Actualizar `IDENTITY.md` solo cuando cambien reglas o intención.
- Delegar patrones operativos de maquetación a la skill `brand-visual-patterns`.

### Don't

- Editar `tokens.json` como primer paso del cambio visual en esta landing.
- Hardcodear colores de marca fuera de la paleta definida en `layout.html`.
- Mezclar reglas de implementación Tailwind o rutas de plantillas en este documento.
- Confundir la paleta comercial `icarto` con roles de dominio de la app SIRH sin justificación.
