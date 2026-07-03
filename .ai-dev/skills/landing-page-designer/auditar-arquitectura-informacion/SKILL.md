---
name: auditar-arquitectura-informacion
description: >-
  Inventariar secciones de la landing, detectar redundancias de mensaje y
  proponer reorganización narrativa antes de editar HTML o locales. Usar al
  repensar el scroll, el nav o cuando el contenido se sienta repetitivo.
---

# Skill: Auditar arquitectura de información

## Propósito

Pensar la **estructura del mensaje** de la landing comercial antes de maquetar o reescribir copy. Mapea qué dice cada bloque, qué se repite y cómo debería fluir la narrativa de conversión. No sustituye la implementación: prepara decisiones para `gestionar-contenido-i18n`, `crear-seccion-landing` y, si aplica, lead-dev en `SECTIONS`.

## Documentación del repositorio (leer según afecte)

- Contenido por sección: `<locales/en.json>` (referencia), `<locales/es.json>`
- Orden del scroll: `<build.mjs>` (array `SECTIONS`)
- Navegación: clave `nav` en locales
- Estructura del repo: `<docs/devs/repository-structure.md>`
- Inventario persistente (crear o actualizar si existe): `<docs/content/landing-information-architecture.md>`

## Cuándo usar esta skill

- Antes de un rediseño amplio de la landing o de varias secciones a la vez.
- Cuando el scroll parece largo, repetitivo o difícil de resumir en una frase por bloque.
- Cuando hay duda sobre fusionar secciones, reordenar el nav o eliminar un bloque.
- Cuando el usuario pide ayuda para “reorganizar la información”, “qué tenemos”, “qué sobra” o “cómo contarlo mejor”.
- **No** usar para cambios puntuales de copy en una sola sección → `gestionar-contenido-i18n`.
- **No** usar para arquitectura del producto SIRH (módulos, backend, roadmap técnico interno).

## Fuentes de verdad del inventario

| Fuente | Qué aporta |
|--------|------------|
| `SECTIONS` en `build.mjs` | Orden real del scroll |
| Objetos raíz en `locales/en.json` | Mensaje por sección (`hero`, `proven`, …) |
| `nav` en locales | Etiquetas visibles y anclas |
| `templates/sections/*.html` | Solo si hace falta comprobar texto hardcodeado o estructura no reflejada en JSON |

## Pasos operativos

1. **Listar bloques actuales** en orden de `SECTIONS` y anotar el label de `nav` (si existe).
2. **Por cada sección**, redactar en una frase:
   - Promesa principal (qué le prometes al visitante).
   - Tipo de prueba (dato, caso de uso, beneficio, proceso, CTA).
   - CTA implícito o explícito.
3. **Clasificar** cada bloque en el arco narrativo (puede haber más de un rol, pero debe haber uno dominante):
   - Gancho → Credibilidad → Problema → Solución → Diferenciación → Evolución/roadmap → Acción.
4. **Construir matriz de solapamiento**: temas que aparecen en dos o más secciones (p. ej. facturación, GIS, implementación en país, ingresos, fases del proyecto).
5. **Marcar severidad** del solapamiento:
   - **Baja**: refuerzo intencional (mismo tema, ángulo distinto).
   - **Media**: el visitante podría sentir déjà vu.
   - **Alta**: dos bloques compiten por la misma promesa; conviene fusionar, mover o acortar.
6. **Proponer mapa objetivo** (3–6 bloques lógicos; no tiene por qué coincidir 1:1 con secciones HTML actuales):
   - Qué se mantiene, fusiona, mueve al hero, baja a subcopy o elimina del scroll.
   - Nuevo orden narrativo y propuesta de `nav` alineada.
7. **Validar con el usuario** antes de implementar; esta skill es de pensamiento y decisión, no de commit masivo.
8. **Persistir** el resultado en `docs/content/landing-information-architecture.md` (crear si no existe) usando la plantilla de `<assets/inventario-landing-plantilla.md>`.
9. **Derivar implementación** por capas:
   - Copy y claves → `gestionar-contenido-i18n`
   - HTML y secciones → `crear-seccion-landing`
   - Reordenar `SECTIONS` → coordinar con lead-dev (`mantener-pipeline-de-compilacion`)

## Temas recurrentes a revisar en esta landing

Comprobar si estos mensajes aparecen en más de un sitio y si el refuerzo es intencional:

| Tema | Secciones habituales | Pregunta clave |
|------|---------------------|----------------|
| Credibilidad / despliegue | `hero`, `proven` | ¿Hacen falta dos bloques de confianza seguidos? |
| Problema vs solución | `challenges`, `capabilities` | ¿Cada ítem problem+solution duplica una capability? |
| Facturación / ingresos | `challenges`, `capabilities`, `sustainability` | ¿Un solo bloque debería “poseer” el mensaje de billing? |
| GIS / registro | `hero`, `capabilities` | ¿El hero ya anuncia lo que capabilities detalla? |
| Roadmap / módulos | `ecosystem`, `capabilities` | ¿Ecosystem añade visión o repite features? |
| Implementación / fases | `methodology`, `ecosystem` | ¿Dos marcos de “cómo crece el proyecto”? |
| Impacto institucional | `proven`, `sustainability`, `challenges` | ¿Los mismos beneficios con distintas palabras? |

## Criterios de decisión

- Si dos secciones tienen la **misma promesa en una frase** → fusionar o eliminar una.
- Si una sección solo **ejemplifica** otra → bajar a subcopy, lista o panel dentro de la sección dueña del tema.
- Si el nav tiene más de **5–6 ítems** → valorar agrupar o quitar anclas de bloques secundarios.
- `contact` no suele estar en `nav`; el CTA del header apunta ahí — no duplicar CTAs de demo en cada sección salvo refuerzo medido en `hero`.
- Mantener **paridad** `en`/`es` en mente: una fusión afecta ambos locales y quizá el layout si el ES es más largo.

## Casos particulares

**Solo reordenar:** puede bastar con cambiar `SECTIONS` y `nav` sin fusionar copy; documentar el porqué narrativo.

**Renombrar sección en nav:** el `id` del `<section>` y `href` del nav deben seguir alineados (`#capabilities` ↔ `id="capabilities"`).

**Reducir número de secciones HTML:** implica merge de plantillas y de objetos JSON; planificar en el inventario antes de editar archivos.

**Una persona hace contenido y diseño:** esta skill es la fase “pensar”; no hace falta otro rol; ejecutar después con las skills de maquetación y i18n del mismo rol designer.

## Anti‑patrones

- Saltar directo a reescribir `en.json` sin inventario ni matriz de solapamiento.
- Añadir una sección nueva para decir algo que ya está en otra “porque encaja visualmente”.
- Confundir arquitectura de información de la **landing** con documentación del **producto** SIRH.
- Proponer eliminar prueba social (`proven`) sin reubicar cifras o logos en otro bloque.
- Dejar el inventario solo en el chat; no actualizar `docs/content/landing-information-architecture.md` tras acordar cambios.

## Checklist rápido

- [ ] Inventario completo: una promesa por sección en orden de `SECTIONS`.
- [ ] Matriz de solapamiento con severidad y decisión por tema.
- [ ] Arco narrativo objetivo definido (gancho → … → acción).
- [ ] Propuesta de nav coherente con anclas e ids de sección.
- [ ] Decisiones validadas con el usuario antes de implementar.
- [ ] Documento en `docs/content/landing-information-architecture.md` actualizado (o plan para crearlo).
- [ ] Siguiente paso enlazado a skill concreta (`gestionar-contenido-i18n`, `crear-seccion-landing`, lead-dev).

## Plantilla textual

Plantilla para el inventario y decisiones: `<assets/inventario-landing-plantilla.md>`.
