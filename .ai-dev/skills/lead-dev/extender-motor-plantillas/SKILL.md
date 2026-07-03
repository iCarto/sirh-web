---
name: extender-motor-plantillas
description: >-
  Extender o depurar el motor de plantillas Handlebars-style en build.mjs:
  bloques {{#if}}, {{#each}}, resolución de claves y orden de render. Usar al
  añadir sintaxis nueva o corregir bugs de anidamiento.
---

# Skill: Extender motor de plantillas

## Propósito

Gobernar el mini-motor de plantillas embebido en `<build.mjs>`. Las plantillas en `templates/` dependen de su sintaxis y orden de evaluación; cambios aquí afectan a todas las secciones.

## Documentación del repositorio (leer según afecte)

- Motor de render: `<build.mjs>` (`renderTemplate`, `getValue`, bloques `render*Blocks`)
- Estructura del repo: `<docs/devs/repository-structure.md>`
- Uso de sintaxis en secciones: skill `crear-seccion-landing` (rol designer)

## Cuándo usar esta skill

- Añadir un tipo de bloque nuevo (p. ej. `{{#eq}}` adicional, helper).
- Corregir bugs de anidamiento o de cierre de bloques (`findBlockClose`).
- Cambiar cómo se resuelven claves con punto (`objeto.prop`) o valores en iteraciones.
- Depurar plantillas que renderizan vacío o duplicado por orden de evaluación.

## Sintaxis soportada (actual)

| Constructo | Uso |
|------------|-----|
| `{{clave}}` | Escalar; también `{{objeto.prop}}` vía `getValue` |
| `{{#if clave}}…{{/if}}` | Renderiza el bloque si el valor es truthy |
| `{{#unless clave}}…{{/unless}}` | Renderiza si el valor es falsy |
| `{{#each array}}…{{/each}}` | Itera; mezcla propiedades del item en el contexto |
| `{{#eq campo "valor"}}…{{/eq}}` | Renderiza si `String(campo) === "valor"` |

En `{{#each}}`, si el item es objeto se fusiona con el contexto padre; además quedan `_item` y `.` como alias del item.

## Orden de render (fijo)

En cada pasada de `renderTemplate`, hasta estabilizar:

1. `{{#each}}`
2. `{{#eq}}`
3. `{{#if}}`
4. `{{#unless}}`
5. Escalares `{{…}}`

Si añades un bloque nuevo, decide en qué posición del ciclo debe evaluarse y documenta el cambio.

## Pasos operativos

1. Reproducir el caso con una plantilla mínima en `templates/sections/` o un fragmento de prueba.
2. Localizar la función de render correspondiente (`renderIfBlocks`, `renderEachBlocks`, etc.).
3. Si el bloque es nuevo: implementar `renderXBlocks` siguiendo el patrón de `renderBlocks` + `findBlockClose` para anidamiento.
4. Insertar la llamada en `renderTemplate` en la posición correcta del ciclo.
5. Buscar en `templates/` usos existentes que puedan verse afectados (`grep` por `{{#`).
6. Ejecutar `npm run build` y revisar `dist/en/index.html` y `dist/es/index.html`.
7. Si la sintaxis es de uso general, coordinar con el designer para actualizar `crear-seccion-landing`.

## Casos particulares

**Valor ausente:** `getValue` devuelve `undefined`; escalares se sustituyen por cadena vacía.

**Arrays no array en `{{#each}}`:** el bloque no renderiza nada (retorna `''`).

**Anidamiento profundo:** `findBlockClose` cuenta aperturas/cierres del mismo tipo; no mezclar etiquetas de cierre incorrectas en plantillas.

**Contexto en iteración:** propiedades del item pisan claves homónimas del contexto padre; nombrar claves de item sin colisión cuando sea posible.

## Anti‑patrones

- Lógica de negocio compleja en el motor (filtros, formateo de fechas); preferir datos ya preparados en `locales/`.
- Duplicar el motor con un preprocesador externo (el repo no tiene dependencias npm de plantillas).
- Cambiar el orden de render sin probar todas las plantillas con bloques anidados.
- Documentar sintaxis nueva solo en `build.mjs` sin enlazar desde skills o docs.

## Checklist rápido

- [ ] Bloque nuevo sigue el patrón `renderBlocks` + cierre `{{/nombre}}`.
- [ ] Orden en `renderTemplate` documentado y probado.
- [ ] Plantillas existentes en `templates/` siguen compilando.
- [ ] `npm run build` OK en `en` y `es`.
- [ ] Skill `crear-seccion-landing` actualizada si cambia la sintaxis pública.
