---
name: crear-skills
description: >-
  Guía operativa para diseñar y redactar una skill: cuándo crear vs
  actualizar, cómo estructurarla, cómo referenciar docs sin duplicar normas, y
  checklist de calidad para que sea descubrible y accionable.
---

# Skill: Cómo construir una skill (ai-enablement)

## Propósito

Definir una receta repetible para crear o mejorar skills bajo `.ai-dev/skills/` que:

- Sean **descubribles** (nombre + descripción ayudan a elegirla).
- Sean **accionables** (pasos y checklists, no texto genérico).
- Eviten duplicar o contradecir la documentación normativa en `docs/`.
- Sean fáciles de mantener (cambios pequeños, scope claro, enlaces correctos).

## Documentación del repositorio (leer según afecte)

- Contrato global del asistente y fuentes de verdad: `<AGENTS.md>`
- Estructura del repositorio y convenciones del sitio estático: `<docs/devs/repository-structure.md>`
- Catálogo de documentación de desarrollo: `<docs/devs/README.md>`

## Cuándo usar esta skill

- Vas a crear una skill nueva para un rol (`.ai-dev/roles/*.md`) o quieres mejorar una existente.
- Detectas que una skill está haciendo de "mini-doc" y se solapa con `docs/devs/`.
- Quieres estandarizar formato, estructura y estilo de escritura de skills.

## Principio clave: frontera skills vs docs

- **`docs/` (normativo para devs)**: decisiones, patrones, convenciones y restricciones del proyecto. Es "fuente de verdad".
- **`skills/` (receta operativa para agentes)**: pasos, checklists, criterios de decisión y plantillas para ejecutar tareas sin reinventar el patrón.

Regla práctica: si una sección describe "**qué se hace en el proyecto**" y debe ser estable, va a `docs/`. Si describe "**cómo aplicar eso al hacer cambios**", va a la skill.

## Pasos para crear (o rehacer) una skill

1. Define el **rol propietario**.
   - La skill debe vivir bajo `.ai-dev/skills/<rol>/...`.
   - Si es meta (roles/skills/governanza), puede vivir bajo `.ai-dev/skills/ai-enablement/...`.

2. Formula el **problema** en una frase.
   - "Añadir una sección nueva a la landing (plantilla, locales, build.mjs)."
   - "Revisar responsive y accesibilidad antes de cerrar un cambio visual."

3. Decide el **tipo de skill** (una sola):
   - **Receta**: pasos concretos para ejecutar una tarea (la más común).
   - **Checklist**: lista de verificación para revisión.
   - **Plantilla**: texto reutilizable (p. ej. sección de docs, estructura de PR), siempre con contexto de uso.

4. Busca y enlaza la **fuente de verdad**.
   - Identifica 1–3 docs relevantes en `docs/` y enlázalos con formato `<ruta/relativa>`.
   - La skill no debe re-explicar todo el doc: debe **apuntar** y resumir lo mínimo necesario para la ejecución.

5. Diseña la **estructura mínima** (ver plantilla abajo).
   - Mantén la skill corta; si crece, divide por "sub-skills" o extrae norma a `docs/`.

6. Añade **criterios de decisión** y **anti‑patrones**.
   - Criterios: "si pasa X, haz Y".
   - Anti‑patrones: síntomas + qué refactor hacer.

7. Revisa **coherencia y mantenimiento**.
   - Evita enlaces rotos.
   - Evita contradicciones con rol y con docs.
   - Evita prometer cosas que el repo no soporta (p. ej. tests, React, backend o `docs/scope` si no existen).

## Plantilla recomendada (estructura)

Incluye estas secciones, en este orden (adapta nombres si necesitas, pero no elimines sin motivo):

- `## Propósito`
- `## Documentación del repositorio (leer según afecte)`
- `## Cuándo usar esta skill`
- `## Pasos operativos` (numerados)
- `## Casos particulares (pocos)` (si aplica)
- `## Anti‑patrones`
- `## Checklist rápido`
- `## Plantilla textual` (opcional; solo si aporta)

## Guías de redacción

- Escribe en **imperativo** y con "gatillos" claros: "si… entonces…".
- Máximo 1 idea por bullet; evita párrafos largos.
- Da nombres concretos de carpetas/archivos/puntos de integración del repositorio (`templates/`, `locales/`, `build.mjs`, etc.).
- Si hay trade-off, declara la decisión del proyecto y enlaza la norma (doc).

## Checklist rápido (para aceptar una skill)

- [ ] El `name` es corto, sin espacios, y consistente (kebab-case).
- [ ] El `description` permite elegir la skill sin abrirla.
- [ ] La skill enlaza a la documentación normativa relevante en `docs/` usando `<ruta/relativa>`.
- [ ] No duplica normas: el detalle "canónico" vive en `docs/`, la skill es operativa.
- [ ] Incluye pasos accionables y al menos un criterio "si X → haz Y".
- [ ] Incluye anti‑patrones con síntoma + acción correctiva.
- [ ] No introduce contradicciones con el rol propietario ni con `AGENTS.md`.
- [ ] No referencia tecnologías o carpetas que este repositorio no usa.

## Anti‑patrones (en skills)

- Skill que es solo una explicación genérica sin pasos concretos para este repo.
- Skill que copia/pega un doc completo de `docs/` y termina divergiendo.
- Skill que mezcla varios problemas ("build + diseño + documentación IA") sin frontera clara.
- Skill importada de otro proyecto sin adaptar stack, rutas ni convenciones.
- Skill que requiere interacción humana continua ("pregunta al usuario cada detalle") en lugar de una receta.

## Plantilla textual

Plantilla base para crear nuevas skills: `<assets/skill-plantilla.md>`.
