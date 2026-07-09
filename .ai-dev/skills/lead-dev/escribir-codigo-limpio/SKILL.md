---
name: escribir-codigo-limpio
description: >-
  Estándar obligatorio de clean code para escribir, refactorizar y revisar
  código en este repositorio, priorizando claridad, nombres sólidos, separación
  de responsabilidades, bajo acoplamiento y verificación antes de cerrar.
---

# Skill: Escribir código limpio

## Propósito

Aplicar de forma obligatoria principios de clean code en cualquier cambio de código del proyecto. Esta skill es transversal: se usa siempre junto con la skill técnica de la tarea (pipeline, plantillas, layout, assets, etc.).

## Documentación del repositorio (leer según afecte)

- Contrato global y fuentes de verdad: `<AGENTS.md>`
- Estructura de carpetas y alcance del sitio estático: `<docs/devs/repository-structure.md>`
- Build y pipeline del sitio: `<build.mjs>`
- Identidad y consistencia visual: `<docs/brand/IDENTITY.md>`
- Referencia detallada de esta skill: `<.ai-dev/skills/lead-dev/escribir-codigo-limpio/reference.md>`

## Referencia de origen

- Skill base tomada y adaptada desde:
  - SkillsMP: [clean-code (superplanehq/superplane)](https://skillsmp.com/es/creators/superplanehq/superplane/agents-skills-clean-code)
  - Repositorio fuente: [superplanehq/superplane/.agents/skills/clean-code](https://github.com/superplanehq/superplane/tree/main/.agents/skills/clean-code)

## Cuándo usar esta skill

- Siempre que el agente escriba, modifique o refactorice código.
- Siempre que el agente revise código y proponga mejoras de calidad técnica.
- En cambios de `build.mjs`, `templates/`, `locales/`, `data/` y cualquier script del repo.

## Pasos operativos

1. Antes de editar, identificar dependencias y alcance real del cambio:
   - qué archivos consumen lo que vas a tocar;
   - qué claves, includes o rutas pueden romperse;
   - qué validación mínima protege el cambio.
2. Escribir la solución más clara y simple que cumpla el requisito:
   - priorizar legibilidad sobre cleverness;
   - evitar sobreingeniería y extensiones hipotéticas (YAGNI);
   - separar orquestación de detalles de implementación.
3. Aplicar reglas de diseño durante la implementación:
   - responsabilidad única por función o bloque;
   - nombres fuertes y explícitos (evitar nombres vagos tipo `data`, `helper`, `util`);
   - control de flujo simple (guard clauses, poca anidación);
   - side effects explícitos y sin mutaciones ocultas;
   - eliminación de duplicación al nivel correcto de abstracción.
4. Tratar errores como parte del diseño:
   - fallar pronto en supuestos inválidos;
   - no ocultar errores silenciosamente;
   - mantener el camino feliz (happy path) legible.
5. Refactorizar mientras trabajas en el área tocada:
   - retirar código muerto cercano.
6. Validar cierre técnico antes de terminar:
   - ejecutar `npm run build`;
   - revisar lints de los archivos tocados;
   - confirmar que no quedan claves i18n, rutas o referencias rotas.

## Casos particulares (pocos)

**Cambios en plantillas y locales:** si se añade o renombra una clave en plantilla, actualizar `locales/en.json` y `locales/es.json` en la misma tarea.

**Cambios en build o motor de plantillas:** mantener separadas políticas de contenido y detalles mecánicos de render/copia para no introducir acoplamiento accidental.

## Anti-patrones

- Entregar código solo funcional pero difícil de leer o mantener.
- Introducir abstracciones prematuras para deduplicar líneas superficiales.
- Mezclar en una misma función reglas de negocio, IO, formateo y manejo de errores.
- Usar parámetros booleanos para alternar comportamientos distintos cuando conviene separar funciones.
- Ocultar side effects o dependencias globales implícitas.
- Dejar condicionales complejos repetidos en varios archivos sin encapsular.
- Resolver con comentarios lo que debería resolverse con mejor diseño y nombres.
- Cerrar tareas sin build/lint ni comprobación de referencias impactadas.

## Checklist rápido

- [ ] El cambio resuelve el objetivo y deja el área tocada más limpia que antes.
- [ ] Nombres, responsabilidades y flujo de control son claros para otro desarrollador.
- [ ] No hay sobreingeniería ni abstracciones inestables.
- [ ] Side effects, errores y límites entre módulos están expresados con claridad.
- [ ] Se actualizaron archivos dependientes en la misma tarea.
- [ ] `npm run build` y lints de archivos tocados se ejecutaron correctamente.
- [ ] No hay referencias rotas en locales, plantillas, rutas o build.
