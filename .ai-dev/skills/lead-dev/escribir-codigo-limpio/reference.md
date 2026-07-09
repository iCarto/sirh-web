# Clean Code Reference

Este documento amplía la skill `<.ai-dev/skills/lead-dev/escribir-codigo-limpio/SKILL.md>`.
Usa `SKILL.md` como contrato operativo corto y este archivo cuando necesites
criterio detallado para decisiones de diseño no obvias.

## Qué significa "código limpio"

El código está limpio cuando es:

- fácil de leer sin inferir comportamiento oculto
- cohesivo en responsabilidades
- claro en nombres e intenciones
- pequeño en unidades de comportamiento
- explícito en dependencias y efectos laterales
- fácil de verificar sin fragilidad

Si cuesta nombrar, testear o explicar una pieza, hay un problema de diseño.

## Nombres

- Usa nombres que expliquen qué es, por qué existe y cómo se usa.
- Evita nombres vagos por defecto: `data`, `info`, `thing`, `manager`,
  `helper`, `util`, `temp`, `obj`.
- Los booleanos se nombran como predicados (`is...`, `has...`, `can...`) cuando
  aplique al lenguaje y estilo del archivo.
- Las funciones describen acción concreta (`renderCapabilitiesSection`) y no
  actividad difusa (`doSection`).

## Funciones y parámetros

- Una función hace una cosa y en un nivel de abstracción.
- Si mezcla parseo, validación, render, IO y manejo de errores, separar fases.
- Preferir 0-2 parámetros; 3 exige revisar; más de 3 suele indicar estructura
  ausente.
- Evitar booleanos para cambiar comportamiento cuando dos funciones nombradas
  expresan mejor la intención.

## Comentarios

Los comentarios no sustituyen buen código.

Buenos usos:

- restricciones externas no obvias
- trade-off técnico concreto
- advertencias operativas
- TODO accionable y acotado

Malos usos:

- repetir lo que ya dice el código
- explicar código confuso en vez de simplificarlo
- bloques largos de contexto evitable

## Condicionales

- Preferir guard clauses a anidación profunda.
- Extraer predicados complejos con nombres expresivos.
- Evitar lógica condicional duplicada entre archivos.
- Preferir condiciones positivas cuando mejora legibilidad.

## Errores

- Fallar pronto ante supuestos inválidos.
- No silenciar errores.
- Aportar contexto diagnóstico útil.
- Mantener claro el camino feliz.
- No mezclar sin motivo errores de validación, dominio e infraestructura.

## Duplicación

La duplicación no es solo código copiado; también reglas, mapeos, validaciones o
literals con significado compartido.

- Eliminar duplicación al nivel correcto de abstracción.
- No crear abstracciones inestables solo para unir líneas parecidas.

## Separación de responsabilidades

Mantener separadas, cuando aplique:

- reglas de negocio vs mecánica de IO
- orquestación vs detalle de implementación
- validación vs persistencia/render
- lectura vs escritura si mejora claridad

## Dependencias y límites

- Evitar dependencias globales ocultas.
- Hacer explícitas las dependencias relevantes.
- Aislar integraciones externas tras límites claros.
- Evitar filtrar detalles de proveedor por todo el código.

## Test-first y verificación en este proyecto

En este repo estático no siempre hay harness formal de tests para cada cambio.

Regla operativa:

- si existe harness útil, usar enfoque test-first para cambios de comportamiento;
- si no existe, declarar la limitación y compensar con verificaciones técnicas:
  - `npm run build`,
  - chequeo de salida generada,
  - verificación focalizada de regresiones en las rutas impactadas.

## Heurística de decisión

Entre dos diseños válidos, prioriza el que:

1. es más fácil de explicar
2. separa mejor responsabilidades
3. reduce estado oculto y side effects
4. es más fácil de verificar
5. elimina duplicación sin sobreabstraer

## Instrucción final

Tratar clean code como criterio de entrega, no como pulido final.
Si hay tensión entre velocidad y limpieza, elegir la opción limpia salvo
urgencia operativa real y explícita.
