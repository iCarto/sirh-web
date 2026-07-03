---
name: redactar-copy-de-conversion
description: >-
  Redactar copy nuevo para la landing comercial SIRH: brief confirmado, claims
  honestos sin inventar pruebas, estructura por sección y claves JSON. Usar al
  escribir textos desde cero; después pulir con revisar-copy-de-conversion e
  implementar con gestionar-contenido-i18n.
---

# Skill: Redactar copy de conversión

## Propósito

Producir copy **nuevo**, claro, creíble y orientado a la acción para la landing comercial SIRH, alineado con la audiencia B2G y las convenciones del repositorio. Evita escribir sin contexto, mensajes vagos o hype, CTAs desalineados y claims inventados.

Basada en el marco de copywriting de sickn33/antigravity-awesome-skills, adaptada a esta landing estática.

## Documentación del repositorio (leer según afecte)

- Identidad y tono: `<docs/brand/IDENTITY.md>`
- Contenido y estructura de secciones: `<locales/en.json>`, `<locales/es.json>`
- Orden del scroll: `<build.mjs>` (array `SECTIONS`)
- Arquitectura del mensaje: skill `auditar-arquitectura-informacion`
- Pulir borrador: skill `revisar-copy-de-conversion`
- Guardar en JSON: skill `gestionar-contenido-i18n`
- Anti-patrones: skill `criterios-anti-diseno-generico`

## Cuándo usar esta skill

- Redactar copy **desde cero** para una sección nueva o un bloque vacío.
- Reescribir por completo el mensaje de una sección (no solo pulir frases).
- Preparar propuestas de titulares, CTAs y cuerpo antes de tocar locales.
- **No** usar para pulir copy existente con ediciones incrementales → `revisar-copy-de-conversion`.
- **No** usar para fusionar secciones o reordenar el scroll → `auditar-arquitectura-informacion`.
- **No** usar para maquetar HTML o registrar secciones → `crear-seccion-landing`.

## Modo de operación

Actuar como **copywriter de conversión institucional**, no como redactor creativo de marca.

- Claridad antes que ingenio.
- Resultados antes que listas de features.
- Especificidad antes que buzzwords.
- Honestidad antes que hype.

El objetivo es que **la persona adecuada** (autoridad hídrica, equipo técnico) realice **la acción adecuada** (demo técnica en `#contact`).

## Pasos operativos

### Fase 1 — Recoger contexto (obligatorio)

Antes de escribir, reunir o confirmar lo siguiente. Si falta información relevante, preguntar **antes** de redactar.

#### Propósito del bloque

- Tipo: sección del scroll (`hero`, `challenges`, `contact`, …) o bloque concreto dentro de una sección.
- **Una** acción principal (CTA); acción secundaria solo si aplica.
- Relación con el arco narrativo (gancho → credibilidad → problema → solución → acción).

#### Audiencia

- Rol del lector (director de autoridad hídrica, técnico GIS, facturación, …).
- Problema principal que intenta resolver.
- Qué han probado ya (hojas de cálculo, sistemas aislados, procesos manuales).
- Objeciones habituales (coste, despliegue, cambio organizativo, soberanía de datos).
- Lenguaje que usan para describir el problema.

#### Producto / oferta (SIRH)

- Qué se ofrece en este bloque (no repetir toda la plataforma si el bloque es acotado).
- Diferenciador frente a alternativas genéricas o procesos manuales.
- Resultado o transformación principal para la autoridad.
- Prueba **disponible** en el repo: cifras en `proven`, países, capturas, metodología en `methodology`, etc.

#### Contexto de visita

- Nivel de conocimiento esperado (desconoce SIRH / conoce el problema / evalúa soluciones).
- Qué ya ha visto en secciones anteriores del scroll.
- Coherencia con `nav` y CTAs existentes (`cta.header`, `#contact`).

### Fase 2 — Brief de copy (puerta obligatoria)

Presentar un **resumen de brief** y **pausar** hasta confirmación del usuario.

#### Resumen de brief (4–6 bullets)

- Objetivo del bloque
- Audiencia objetivo
- Propuesta de valor central
- CTA principal
- Contexto de awareness / posición en el scroll

#### Supuestos explícitos

Listar lo que se asume (p. ej. nivel técnico del lector, urgencia, pruebas disponibles).

Preguntar:

> «¿Este brief refleja lo que buscamos? Confirma o corrige antes de que redacte el copy.»

**No redactar hasta recibir confirmación**, salvo que el usuario pida explícitamente un borrador exploratorio.

### Fase 3 — Principios de redacción

#### No negociables

- Claridad sobre ingenio.
- Beneficios sobre features (siempre: feature → beneficio → resultado).
- Especificidad sobre vaguedad.
- Lenguaje del cliente sobre lenguaje de la empresa.
- Una idea por sección o ítem de lista.

#### Disciplina de claims

- **Prohibido** inventar datos, testimonios, logos o garantías.
- No prometer velocidad o certeza exageradas.
- Si falta prueba, usar placeholder explícito (`[cifra a confirmar]`) o suavizar el claim.
- Reutilizar solo cifras ya presentes en locales o documentación acordada.

#### Estilo SIRH (B2G)

- Tono institucional, sobrio y legible (`docs/brand/IDENTITY.md`).
- Sin emojis en strings JSON (`criterios-anti-diseno-generico`).
- CTAs con verbos claros («Request a technical demo», «Solicitar demo técnica»).
- Evitar hype de startup, urgencia falsa y corporate speak.

### Fase 4 — Estructura por tipo de bloque

Adaptar al esquema de claves JSON de la sección. Referencia habitual:

| Bloque | Claves típicas en `locales/en.json` |
|--------|-------------------------------------|
| Hero | `badge`, `title`, `titleHighlight`, `description`, `ctaPrimary`, `ctaSecondary` |
| Sección estándar | `eyebrow`, `title`, `subtitle`, `items[]` |
| Lista problema/solución | `items[].title`, `items[].problem`, `items[].solution` |
| Cifras | `figures[]` con `value`, `label` |
| Contacto / CTA final | `title`, `description`, `ctaPrimary`, campos de formulario |

#### Above the fold (hero o apertura de sección)

- **Titular**: mensaje más importante; propuesta de valor específica; orientado a resultado.
- **Subtítulo / description**: aclara contexto; 1–2 frases como máximo.
- **CTA primario**: acción concreta; describe qué obtiene el visitante.

#### Cuerpo (según arco narrativo)

Usar solo lo que el bloque necesita:

- Prueba social (stats, países, capturas) — priorizar datos de `proven`.
- Articulación del problema / dolor operativo.
- Solución y 3–5 beneficios clave (no saturar).
- Cómo funciona (3–4 pasos) si aplica.
- Objeciones o FAQ si el bloque es de cierre.
- CTA final con reducción de riesgo cerca de `contact`.

Evitar apilar features sin hilo narrativo.

### Fase 5 — Entregar el copy

Incluir siempre:

#### Copy estructurado

Organizado por sección y **mapeado a claves JSON** (p. ej. `challenges.items[0].title`).

#### Alternativas

2–3 opciones para **titular** y **CTA primario**, cada una con breve justificación.

#### Anotaciones

En bloques clave: por qué se eligió ese enfoque, qué principio aplica y qué alternativas se descartaron.

#### Idioma

- Redactar primero en **inglés** (`en.json` es referencia de claves).
- Indicar si hace falta traducción a español o proponer borrador ES si el usuario lo pide.
- Tener en cuenta que el ES suele ser más largo al implementar.

### Fase 6 — Cierre y siguiente paso

La skill está completa cuando:

- [ ] Brief confirmado por el usuario.
- [ ] Copy entregado con estructura y claves JSON.
- [ ] Alternativas de titular y CTA principal.
- [ ] Supuestos documentados.
- [ ] Sin claims inventados.

**Siguiente paso recomendado:**

1. Pulir borrador → `revisar-copy-de-conversion`
2. Implementar en `locales/en.json` y `locales/es.json` → `gestionar-contenido-i18n`
3. Si el texto rompe layout → `crear-seccion-landing`

## Criterios de decisión

- Si el bloque repite la promesa de otra sección → consultar `auditar-arquitectura-informacion` antes de redactar.
- Si hay más de 5 beneficios en un bloque → priorizar 3–5 y mover el resto a subcopy u otra sección.
- Si no hay prueba para un claim fuerte → suavizar o marcar placeholder; no inventar.
- Si el usuario pide «algo más vendedor» en contexto B2G → más claridad y prueba, no más adjetivos.

## Relación con otras skills

| Tarea | Skill |
|-------|-------|
| Inventariar o reorganizar mensaje | `auditar-arquitectura-informacion` |
| Redactar copy nuevo | **esta skill** |
| Pulir copy existente o borrador | `revisar-copy-de-conversion` |
| Guardar textos en JSON | `gestionar-contenido-i18n` |
| Nueva sección HTML + locales | `crear-seccion-landing` |

## Anti‑patrones

- Escribir titulares sin brief confirmado.
- Copiar estructura de landing SaaS genérica ignorando tono institucional SIRH.
- Inventar cifras, países, testimonios o «clientes líderes».
- Listar todas las capacidades de SIRH en un solo bloque.
- CTA vago («Contact us») sin alinear con demo técnica y `#contact`.
- Entregar solo prosa sin mapeo a claves `locales/`.
- Omitir alternativas de titular cuando el usuario debe decidir dirección.

## Checklist rápido

- [ ] Contexto recogido (propósito, audiencia, oferta, prueba disponible).
- [ ] Brief presentado y confirmado por el usuario.
- [ ] Copy con claves JSON y alternativas de titular/CTA.
- [ ] Feature → beneficio → resultado en ítems clave.
- [ ] Sin claims fabricados; placeholders explícitos donde falte dato.
- [ ] Tono B2G institucional; sin emojis.
- [ ] Siguiente paso indicado (`revisar-copy-de-conversion` → `gestionar-contenido-i18n`).
