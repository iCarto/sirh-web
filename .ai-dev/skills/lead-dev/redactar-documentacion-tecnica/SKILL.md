---
name: redactar-documentacion-tecnica
description: >-
  Redacta o refactoriza documentos técnicos en docs/devs con estructura
  estándar (Objetivo, Alcance, Reglas generales, Casos particulares,
  Anti-patrones). Usar al crear nuevas guías técnicas o normalizar documentación
  existente.
---

# Skill: Redactar documentación técnica

## Propósito

Estandarizar la redacción de documentación técnica en `docs/devs` para que sea consistente, accionable y fácil de mantener por desarrolladores y agentes.

## Documentación del repositorio (leer según afecte)

- Estructura del repositorio y convenciones del sitio estático: `<docs/devs/repository-structure.md>`
- Catálogo de documentación de desarrollo: `<docs/devs/README.md>`
- Contrato global de trabajo de agentes: `<AGENTS.md>`

## Cuándo usar esta skill

- Cuando se crea un documento nuevo en `docs/devs`.
- Cuando una guía técnica existente tiene estructura inconsistente.
- Cuando hay que mover contenido entre skills y docs para evitar duplicación.

## Pasos operativos

1. Identificar el tema técnico y el público principal (devs del proyecto).
2. Revisar código y docs relacionadas para extraer patrones reales y vigentes.
3. Redactar el documento usando esta estructura fija:
   - `## Objetivo`
   - `## Alcance`
   - `## Reglas generales`
   - `## Casos particulares`
   - `## Anti-patrones`
4. En `Reglas generales`, documentar solo convenciones repetibles y estables.
5. En `Casos particulares`, incluir solo excepciones que se repiten en al menos dos casos del código; si es única, dejarla fuera del estándar.
6. En `Anti-patrones`, describir errores comunes y su impacto técnico.
7. Verificar que la skill asociada (si existe) se queda en pasos operativos y checklist, sin duplicar secciones genéricas de la doc técnica.

## Checklist rápido

- [ ] El archivo vive en `docs/devs/...` y tiene título claro.
- [ ] Se usan las secciones `Objetivo`, `Alcance`, `Reglas generales`, `Casos particulares`, `Anti-patrones`.
- [ ] Las reglas generales son concretas y verificables.
- [ ] Los casos particulares están sustentados por al menos dos casos reales.
- [ ] Los anti-patrones describen problema y efecto.
- [ ] No hay duplicación innecesaria con una skill relacionada.
- [ ] Se enlaza documentación relevante con formato `<ruta/relativa>`.

## Plantilla textual

Plantilla base para nuevos documentos técnicos: `<assets/documentacion-tecnica-plantilla.md>`.
