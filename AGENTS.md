# Water Use and License Management System (SIRH) Static Website

This is a static web made for commercial purposes to introduce SIRH: SIRH is an internal web application for water authorities. It manages water users, permits, operation areas, billing and procedures for issue and renew permits.

## Fuente de verdad para la IA

- **Roles bajo los que actúa el agente**: `.ai-dev/roles/`.
- **Playbooks/recetas (skills) de cada rol**: `.ai-dev/skills/`.
- **Decisiones, patrones y convenciones del proyecto**: `docs/`

## Trabajo del agente

Al inicio cada nuevo agente:

- Debe revisar `.ai-dev/roles/`, decidir con qué rol actuar y decírselo explícitamente al usuario.
- A continuación debe revisar `.ai-dev/skills/<rol>`, cargar en el contexto aquellas que sean necesarias para ejecutar la tarea y decírselo explícitamente al usuario.
- Si la tarea implica escribir o refactorizar código, debe cargar siempre la skill `.ai-dev/skills/lead-dev/escribir-codigo-limpio/SKILL.md` además de las skills específicas de la tarea.
- Las skills tienen referencias a `docs` con los documentos apropiados donde se establecen patrones, decisiones, convenciones o restricciones.
- Si no identifica un rol claro actuar como un agente genérico y avisar al usuario.
