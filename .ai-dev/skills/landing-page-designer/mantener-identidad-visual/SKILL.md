---
name: mantener-identidad-visual
description: >-
  Sincroniza tokens.json desde el tema de la landing (layout.html) y mantiene
  IDENTITY.md (reglas de marca). Usar tras cambios en colores, tipografía o
  tokens Tailwind, o al revisar identidad portable entre productos SIRH.
---

# Skill: Mantener identidad visual (IDENTITY + tokens)

## Propósito

Mantener la **identidad visual portable** del ecosistema SIRH:

- `<docs/brand/IDENTITY.md>`: reglas e intención visual (sin detalle de implementación por stack).
- `<docs/brand/tokens.json>`: exportación semántica de valores, **sincronizada desde la implementación del tema** en cada repo.

En **esta landing estática** el flujo es:

**`templates/layout.html` (tema) → `tokens.json` → `IDENTITY.md` solo si cambian reglas**

No editar `tokens.json` como paso inicial de un cambio visual.

## Documentación del repositorio (leer según afecte)

- Contrato global de agentes: `<AGENTS.md>`
- Estructura y convenciones del repo: `<docs/devs/repository-structure.md>`
- Implementación del tema en este repo: `<templates/layout.html>` (`tailwind.config`, fuente Inter, estilos globales)
- Patrones visuales operativos de la landing: skill `patrones-visuales-de-marca` en la misma carpeta

## Cuándo usar esta skill

- **Después** de cambiar valores en `templates/layout.html` (paleta `icarto`, tipografía, estilos globales del `<body>`).
- Al revisar que `tokens.json` sigue alineado con `layout.html` tras un refactor visual.
- Al definir o actualizar reglas de marca en `IDENTITY.md` (sin cambiar necesariamente valores).
- Al incorporar o alinear `docs/brand/` con otros productos del ecosistema SIRH que compartan marca.

## Implementación del tema en esta landing

La fuente de verdad de **valores** en este repositorio es `templates/layout.html`:

| Qué sincronizar | Dónde está implementado |
|-----------------|-------------------------|
| Paleta `icarto` (`50`–`900`) | `tailwind.config.theme.extend.colors.icarto` |
| Fuente sans | `fontFamily.sans` → Inter (Google Fonts en `<head>`) |
| Color de texto base del body | `<style>` / clases en `<body>` |
| Neutros (`slate-*`) | Clases Tailwind por defecto en plantillas (no redefinidos en config) |

Los detalles de **uso** en secciones (ritmo `py-20`, cards, CTAs) viven en la skill `patrones-visuales-de-marca`; esta skill no los duplica.

## Pasos operativos

1. Leer `templates/layout.html` e inspeccionar la configuración Tailwind y estilos globales.
2. Si el cambio afecta a secciones, contrastar con `patrones-visuales-de-marca` y secciones vecinas en `templates/sections/`.
3. Extraer valores semánticos desde la implementación:
   - Colores de la escala `icarto` y roles que representan en la landing (acento primario, texto, fondos).
   - Tipografía (`Inter`), tamaños base si están definidos.
   - Espaciado y formas recurrentes documentados en patrones (p. ej. `rounded-xl`, unidad visual `8px`).
4. Actualizar `<docs/brand/tokens.json>` con formato de tokens (`$value`, `$type`); mantener roles estables y no borrar entradas de otros productos SIRH sin confirmación explícita.
5. Actualizar `<docs/brand/IDENTITY.md>` **solo** si cambian reglas, intención visual o do/don't (no por cada ajuste de hex).
6. No incrustar en `IDENTITY.md` valores que ya están en `tokens.json` ni detalles de Tailwind o rutas de plantillas.
7. Tras cambios en `layout.html`, verificar build y aspecto: `npm run build` (o `npm run dev` + `npm run preview`).

## Mapeo orientativo (landing → tokens.json)

Al sincronizar desde esta landing, reflejar en `tokens.json` los valores reales de `layout.html`. Referencia habitual (ajustar si el código cambia):

| Implementación landing | Rol semántico en `tokens.json` |
|------------------------|--------------------------------|
| `icarto-600` / `icarto-700` | `color.primary.main` / variantes |
| `icarto-900` (texto principal) | `color.text.primary` |
| `slate-50` (fondo body) | `color.pageBackground.secondary` o equivalente |
| Inter | `typography.fontFamily.base` |
| Escala de espaciado Tailwind (`4`, `8`, `20`…) | `spacing.unit` y derivados si aplica |

Los roles de dominio (`color.domain.*`) pertenecen a la aplicación SIRH interna; **no** sustituirlos por la paleta `icarto` de marketing salvo decisión explícita de unificación de marca.

## Casos particulares

**Varios repos, misma marca**  
Un `docs/brand/` compartido (repo dedicado, submodule o copia). Cada producto implementa en su stack (MUI en la app, Tailwind en esta landing) y sincroniza hacia el mismo `tokens.json`.

**Cambio solo en plantillas de sección (sin tocar `layout.html`)**  
No actualizar `tokens.json` ni `IDENTITY.md` si los valores semánticos globales no cambiaron.

**Cambio de marca en la landing (nuevo color, tipografía, etc.)**

1. Actualizar `templates/layout.html`. 2. Sincronizar `tokens.json`. 3. Actualizar `IDENTITY.md` si cambian reglas o intención.

**`tokens.json` desalineado con `layout.html`**  
Tratar `layout.html` como fuente de verdad en este repo; sincronizar `tokens.json` hacia el código, no al revés.

## Anti‑patrones

- Editar `tokens.json` primero y luego `templates/layout.html`.
- Duplicar hex entre `layout.html` y `tokens.json` sin sincronizar tras el cambio.
- Copiar en `IDENTITY.md` patrones de sección, clases Tailwind o contenido de `patrones-visuales-de-marca`.
- Referenciar tema MUI, React o docs de frontend que no existen en este repositorio.
- Sobrescribir roles `color.domain.*` de la app SIRH al sincronizar solo la landing comercial.
- Hardcodear colores nuevos en secciones sin añadirlos antes a `layout.html` cuando deban ser tokens de marca.

## Checklist rápido

- [ ] Los valores en `tokens.json` reflejan `templates/layout.html` (no al revés).
- [ ] `IDENTITY.md` describe intención y reglas; sin hex duplicados.
- [ ] Do's and Don'ts actualizados solo si cambió la política visual.
- [ ] Detalle operativo de secciones sigue en `patrones-visuales-de-marca`, no en `docs/brand/`.
- [ ] Build OK tras cambios en tema (`npm run build`).

## Plantilla textual

Plantilla base para `IDENTITY.md`: `<assets/identity-plantilla.md>`.
