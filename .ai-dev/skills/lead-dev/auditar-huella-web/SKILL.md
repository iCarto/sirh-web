---
name: auditar-huella-web
description: >-
  Auditar y reducir el peso de página y la huella energética de un sitio
  estático: medir baseline, priorizar por impacto en bytes, aplicar cambios
  quirúrgicos y re-medir. Usar ante peticiones de web ligera, huella de carbono
  o revisión pre-release de performance/sostenibilidad web.
---

# Skill: Auditar huella web

## Propósito

Receta repetible para **medir, priorizar y reducir** la transferencia de datos y el consumo energético asociado a un sitio estático, sin refactor especulativo. La skill es genérica; las decisiones y el baseline concretos del repositorio viven en la documentación técnica enlazada.

## Documentación del repositorio (leer según afecte)

- Baseline, stack y reglas del proyecto: `<docs/devs/web-sustainability.md>`
- Estructura y convenciones: `<docs/devs/repository-structure.md>`

## Cuándo usar esta skill

- Antes de un release o tras añadir secciones o assets pesados.
- Cuando el usuario pida web más ligera, eco-friendly, huella de carbono o sostenibilidad **web** (no copy de producto).
- Tras detectar degradación en Lighthouse o herramientas de carbono.
- Combinar con `gestionar-recursos-estaticos` si el fix implica imágenes o archivos en la carpeta de assets.
- Combinar con la skill de accesibilidad del rol designer si un cambio visual (p. ej. contraste, dark mode) entra en juego.

## Cuándo no usar esta skill

- Optimización de performance sin encuadre de sostenibilidad y sin leer el baseline del proyecto — puede solaparse con otras guías.
- Accesibilidad pura — usar la skill de a11y/responsive del rol designer.
- Cambios de hosting o CI sin leer la documentación de despliegue del repositorio.

## Pasos operativos

1. **Leer el baseline del proyecto** en `<docs/devs/web-sustainability.md>`: stack, hosting, pipeline de assets, orden de impacto típico.
2. **Medir antes de tocar código**
   - Build + preview según documentación del repositorio.
   - Lighthouse (performance, peticiones, LCP).
   - Herramienta de carbono (p. ej. websitecarbon.com, ecograder.com) si aplica a la URL disponible.
   - Anotar: peso total, nº peticiones, recursos externos (CDN CSS/JS, fuentes, analytics).
3. **Inventariar contribuyentes** ordenados por bytes estimados:
   - Imágenes y vídeo en carpeta de assets estáticos.
   - Recursos del shell del documento (framework CSS, fuentes, scripts de terceros).
   - HTML generado por idioma.
4. **Priorizar el mayor impacto primero** (regla 80/20): no refactorizar el codebase entero; atacar los pocos assets o peticiones que concentran la mayoría del peso.
5. **Aplicar cambios quirúrgicos** acordes al pipeline real del repo (ver doc de sostenibilidad):
   - Comprimir o sustituir formatos de imagen; `loading="lazy"` solo below-the-fold.
   - Reducir pesos de fuente o peticiones externas solo si el doc del proyecto lo permite o se acuerda ampliar el build.
   - No introducir service workers, code splitting o bundlers si el proyecto no los usa.
6. **Re-medir** con las mismas herramientas y URLs que en el paso 2.
7. **Informar** con: baseline → cambios → bytes ahorrados → riesgos residuales (UX, soporte de formatos, complejidad de build).

## Formato de salida sugerido

1. **Baseline** — peso, peticiones, hosting, herramientas usadas.
2. **Mayor impacto** — lista ordenada de contribuyentes (con tamaños aproximados).
3. **Cambios aplicados** — solo lo tocado; enlace a skills complementarias si hubo assets o layout.
4. **Verificación** — métricas tras el cambio.
5. **Riesgos** — trade-offs (marca, build, navegadores, hosting).

## Casos particulares

**Sitio sin JS de aplicación:** el ahorro suele estar en imágenes y recursos del `<head>`, no en bundles.

**Framework CSS vía CDN:** puede dominar el peso; sustituir por CSS compilado es decisión de arquitectura — documentar en `docs/devs/`, no decidir solo en la auditoría.

**Varias locales/idiomas:** comprobar que no se duplican assets por idioma; el HTML puede variar sin aumentar imágenes.

## Anti‑patrones

| Síntoma | Acción correctiva |
|---------|-------------------|
| Optimizar sin baseline medido | Medir primero; documentar números |
| Lazy load en imagen LCP | Quitar `loading="lazy"` en above-the-fold |
| Proponer migración de host en la skill sin doc ni acuerdo | Registrar recomendación; decisión en docs/CI |
| Duplicar checklist de a11y | Derivar a skill de accesibilidad del designer |
| Refactor completo del build por una auditoría | Cambios acotados al top 3 de bytes |
| Confundir sostenibilidad de producto con sostenibilidad web | Aclarar alcance al usuario |

## Checklist rápido

- [ ] Leído `<docs/devs/web-sustainability.md>`.
- [ ] Baseline registrado (peso, peticiones, LCP o equivalente).
- [ ] Top contribuyentes identificados antes de codificar.
- [ ] Solo assets/patrones de alto impacto modificados.
- [ ] Re-medición con las mismas herramientas.
- [ ] Trade-offs y riesgos comunicados.
- [ ] `npm run build` (o equivalente del repo) sin errores tras cambios.

## Referencia de origen

Adaptada desde [sustainable-design-pro](https://github.com/truongnat/skills/tree/main/skills/sustainable-design-pro) (truongnat/skills). Se conservó el workflow medir → priorizar → cambio quirúrgico → re-medir. Se omitió lo específico de SPAs (code splitting, service workers), el ecosistema de skills “pro” del autor y recomendaciones de hosting genéricas no alineadas con el proyecto; el detalle de stack y despliegue vive en `<docs/devs/web-sustainability.md>`.
