---
name: revisar-copy-de-conversion
description: >-
  Mejorar copy existente de la landing comercial mediante pasadas de edición
  enfocadas (claridad, tono, beneficio, prueba, especificidad, emoción, riesgo).
  Usar al revisar o pulir textos en locales antes de implementar cambios en
  en.json/es.json; no para redactar desde cero ni para cambios estructurales.
---

# Skill: Revisar copy de conversión

## Propósito

Mejorar copy **existente** de la landing SIRH mediante pasadas de edición enfocadas, preservando el mensaje central y la voz institucional B2G. Esta skill es de **revisión y recomendación**; la implementación en JSON vive en `gestionar-contenido-i18n`.

Basada en el marco *Seven Sweeps* (sickn33/antigravity-awesome-skills, adaptada a este repositorio).

## Documentación del repositorio (leer según afecte)

- Identidad y tono de marca: `<docs/brand/IDENTITY.md>`
- Contenido actual: `<locales/en.json>` (referencia), `<locales/es.json>`
- Arquitectura del mensaje: skill `auditar-arquitectura-informacion`
- Implementación de textos: skill `gestionar-contenido-i18n`
- Anti-patrones visuales y de copy: skill `criterios-anti-diseno-generico`

## Cuándo usar esta skill

- Revisar o pulir titulares, descripciones, CTAs, listas o metadatos **ya escritos**.
- Editar copy recién redactado antes de commitear en locales.
- Preparar recomendaciones concretas de mejora para el usuario.
- **No** usar para redactar una sección nueva desde cero → `redactar-copy-de-conversion` (y, si hace falta, `auditar-arquitectura-informacion` antes).
- **No** usar para fusionar secciones, reordenar scroll o nav → `auditar-arquitectura-informacion`.
- **No** usar para cambios de layout o HTML → `crear-seccion-landing`.

## Contexto SIRH (voz y audiencia)

Antes de editar, tener presente:

| Dimensión | Criterio en esta landing |
|-----------|--------------------------|
| Audiencia | Autoridades hídricas, equipos técnicos e institucionales (B2G) |
| Tono | Institucional, sobrio, creíble; sin hype de startup ni jerga vacía |
| Promesa | Gestión integral de permisos, facturación, usuarios y análisis GIS |
| Prueba disponible | Despliegues en Mozambique y Eswatini, cifras en `proven`, casos en secciones |
| Acción deseada | Demo técnica (`#contact`); CTA principal del header |
| Idiomas | Paridad `en`/`es`; el español suele ser más largo — no acortar artificialmente |

## Pasos operativos

### 0. Preparación

1. Leer el bloque completo **sin editar** (sección en `locales/en.json` o texto pegado por el usuario).
2. Identificar: objetivo del bloque, audiencia, acción deseada y pruebas disponibles.
3. Si faltan esos datos, preguntar antes de proponer cambios amplios.
4. Decidir alcance:
   - **Revisión rápida** → sección «Pasadas rápidas» más abajo.
   - **Revisión completa** → las siete pasadas en orden.

### 1–7. Las siete pasadas (Seven Sweeps)

Ejecutar en orden. Tras cada pasada, **volver a comprobar** las anteriores por si la edición introdujo regresiones.

#### Pasada 1 — Claridad

¿El lector entiende de inmediato qué decimos?

- Marcar frases largas, jerga sin explicar, pronombres ambiguos, contexto faltante.
- Una idea principal por bloque (regla de uno); hablar al lector («usted/su autoridad»), no solo de la empresa.
- **No corregir aún**: anotar problemas y proponer ediciones concretas.

#### Pasada 2 — Voz y tono

¿Suena coherente con SIRH institucional?

- Detectar saltos formal↔coloquial, mezcla «nosotros»/«la plataforma»/«SIRH», humor o hype fuera de lugar.
- Leer en voz alta; alinear con `<docs/brand/IDENTITY.md>` (sobrio, legible, creíble).
- Volver a Pasada 1.

#### Pasada 3 — «¿Y qué?»

¿Cada afirmación responde por qué importa al lector?

- Por cada feature o claim, preguntar «¿y qué?»; si no hay beneficio, añadir puente «lo que significa…».
- Conectar capacidades (permisos, facturación, GIS) con resultados para la autoridad hídrica.
- Volver a Pasadas 2 y 1.

#### Pasada 4 — Demuéstralo

¿Las afirmaciones tienen respaldo?

- Cifras de `proven`, países, casos de uso, capturas; evitar «líder» o «miles de clientes» sin datos.
- Si no hay prueba, suavizar el claim o señalar qué evidencia haría falta.
- Volver a Pasadas 3, 2 y 1.

#### Pasada 5 — Especificidad

¿El lenguaje es concreto?

- Sustituir «mejorar», «optimizar», «integrado» por resultados, plazos o ámbitos cuando sea posible.
- Usar cifras ya presentes en locales; no inventar estadísticas.
- Eliminar relleno que no pueda concretarse.
- Volver a Pasadas 4–1.

#### Pasada 6 — Emoción (con mesura B2G)

¿El copy transmite relevancia sin manipulación?

- Evocar frustración operativa (permisos dispersos, facturación manual, datos inconexos) y alivio creíble.
- En B2G, la emoción es **confianza y claridad**, no urgencia agresiva ni FOMO.
- Volver a Pasadas 5–1.

#### Pasada 7 — Riesgo cero (cerca del CTA)

¿Hemos reducido fricción hacia la demo?

- Cerca de `#contact` y CTAs: expectativas claras («demo técnica»), objeciones abordadas, señales de confianza.
- Evitar CTAs vagos; alinear con `cta.header` y textos de `contact`.
- Pasada final: recorrer 6→1 una vez más.

### 8. Entregar recomendaciones

1. Presentar hallazgos por pasada (o por severidad si es revisión rápida).
2. Proponer **ediciones concretas** (antes → después), no solo diagnóstico.
3. Indicar claves JSON afectadas (`hero.title`, `challenges.items[0].title`, etc.).
4. Si el usuario aprueba, aplicar con `gestionar-contenido-i18n` en `en.json` y `es.json`.
5. Recordar revisar layout con copy ES más largo.

## Pasadas rápidas (cuando no haga falta el ciclo completo)

### Palabra

- Cortar: *muy, realmente, simplemente, básicamente, en orden a*, *cosas/cosas*.
- Sustituir corporate speak: *utilizar/leverage/facilitar* → *usar/ayudar*; *innovador/cutting-edge* → concreto o eliminar.
- Preferir voz activa; evitar nominalizaciones (*tomar una decisión* → *decidir*).

### Oración

- Una idea por frase; variar longitud; información importante al inicio.
- Objetivo orientativo: ≤25 palabras por frase en web.

### Párrafo / bloque JSON

- Un tema por párrafo o ítem de lista; aperturas fuertes; párrafos cortos (2–4 frases) en descripciones largas.

## Problemas frecuentes y corrección

| Problema | Síntoma | Corrección |
|----------|---------|------------|
| Muro de features | Lista de módulos sin beneficio | Añadir «lo que significa para su autoridad» tras cada ítem |
| Corporate speak | «Leverage synergies…» | Reformular como lo diría un técnico institucional |
| Apertura débil | Historia de la empresa antes del problema | Liderar con el reto del visitante o el resultado buscado |
| CTA enterrado | La petición llega tarde o es ambigua | CTA visible, repetido con mesura; alinear con `#contact` |
| Sin prueba | «Los clientes confían en nosotros» | Citar cifras, países o capturas de `proven` |
| Claims genéricos | «Ayudamos a crecer» | Especificar quién, cómo y en qué ámbito hídrico |
| Audiencias mezcladas | Copy para todos, impacto para nadie | Elegir autoridad hídrica como interlocutor principal |
| Saturación de features | Demasiados ítems en una sección | Priorizar 3–5 beneficios clave; el resto a subcopy o otra sección |

## Trabajo colaborativo

1. Ejecutar una pasada y mostrar hallazgos con motivo.
2. Recomendar ediciones específicas.
3. Dejar al usuario decidir la versión final.
4. Tras cada ronda, reverificar pasadas anteriores.
5. Repetir hasta que una pasada completa no encuentre issues nuevos.

## Relación con otras skills

| Tarea | Skill |
|-------|-------|
| Inventariar o reorganizar mensaje del scroll | `auditar-arquitectura-informacion` |
| Redactar copy nuevo desde cero | `redactar-copy-de-conversion` |
| Guardar textos en JSON | `gestionar-contenido-i18n` |
| Revisar y mejorar copy existente o borrador | **esta skill** |
| Cambios de maquetación por texto largo | `crear-seccion-landing` |
| Criterios visuales y emojis | `criterios-anti-diseno-generico` |

## Anti‑patrones

- Reescribir todo el copy de golpe sin pasadas ni preservar mensaje acordado.
- Añadir hype, urgencia falsa o tono startup en un producto B2G institucional.
- Inventar cifras o testimonios no presentes en locales o documentación.
- Proponer cambios solo en inglés y olvidar paridad y longitud en español.
- Confundir revisión de copy con fusión de secciones (eso es arquitectura de información).
- Identificar problemas sin proponer alternativas concretas.

## Checklist rápido

- [ ] Objetivo, audiencia y CTA del bloque identificados.
- [ ] Pasadas aplicadas (completas o rápidas según alcance).
- [ ] Tono alineado con identidad institucional SIRH.
- [ ] Cada feature relevante conecta con beneficio para la autoridad hídrica.
- [ ] Claims respaldados o suavizados; sin cifras inventadas.
- [ ] CTAs y textos de contacto coherentes con `nav` y `#contact`.
- [ ] Recomendaciones con claves JSON y antes/después.
- [ ] Si se implementa: `en.json` + `es.json`, `npm run build`, layout con ES más largo.
