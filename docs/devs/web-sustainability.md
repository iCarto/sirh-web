# Web sustainability

## Objetivo

Documentar las decisiones técnicas de este repositorio que afectan al **peso de página, transferencia de datos y huella energética** de la landing estática, y servir de baseline para auditorías y mejoras incrementales.

No confundir con el mensaje de producto sobre sostenibilidad hídrica o ambiental en el copy de la landing: aquí solo se trata de **sostenibilidad web** (bytes transferidos, peticiones externas, hosting).

## Alcance

**Incluye:**

- Assets en `public/` (imágenes, favicons).
- Recursos cargados desde el shell (`templates/layout.html`): fuentes, framework CSS, meta OG.
- HTML generado en `dist/` por idioma.
- Despliegue estático vía GitHub Pages (workflow `.github/workflows/deploy-pages.yml`).

**Excluye:**

- Optimización de performance de aplicaciones con runtime JS (no hay bundle de app).
- Code splitting, service workers o lazy loading de módulos JS.
- Criterios de accesibilidad (ver skill `revisar-adaptabilidad-y-accesibilidad` del rol landing page designer).
- Elección de hosting alternativo sin decisión explícita del equipo.

## Reglas generales

### Stack y peso inherente

| Factor | Implementación actual | Impacto en huella |
|--------|----------------------|-------------------|
| CSS | Tailwind CSS vía CDN (`cdn.tailwindcss.com`) en `layout.html` | Petición JS externa en cada visita; mayor peso que CSS precompilado |
| Tipografía | Inter desde Google Fonts (`fonts.googleapis.com`) | Peticiones externas; `display=swap` ya configurado |
| JavaScript de app | Ninguno | Ventaja: sin bundle propio |
| Build de assets | `public/` se copia sin transformación (`build.mjs` → `copyPublic`) | Sin pipeline AVIF/WebP automático |
| Iconos | SVG inline (Heroicons); sin CDN de iconos | Bajo impacto |

Estas decisiones priorizan **simplicidad de build** (cero dependencias npm, sin paso CSS) frente a mínimo peso por visita. Cualquier cambio estructural (p. ej. Tailwind compilado, fuentes self-hosted) requiere acuerdo explícito: implica ampliar el pipeline en `build.mjs`.

### Imágenes

- Fuente: `public/images/`.
- Referencias: rutas absolutas `/images/...` en locales o `layout.html` (skill `gestionar-recursos-estaticos`).
- **Optimizar manualmente antes de commit**: comprimir PNG/JPEG; preferir WebP o AVIF cuando el host y los navegadores objetivo lo permitan.
- **Lazy loading**: imágenes below-the-fold llevan `loading="lazy"` en plantillas de sección (`capabilities`, `ecosystem`, `methodology`, `proven`). Imágenes above-the-fold (hero, LCP) no deben llevar lazy load.
- Dimensionar al tamaño de visualización real; evitar capturas 4K si se muestran a ~800px.

### Fuentes

- Pesos cargados: 300, 400, 500, 600, 700 (Inter).
- `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` ya presente en `layout.html`.
- Reducir pesos no usados en plantillas antes de ampliar la URL de Google Fonts.

### Hosting y despliegue

- **GitHub Pages** con `BASE_PATH: /sirh-web` en CI (`.github/workflows/deploy-pages.yml`).
- Verificar renovables del proveedor en [The Green Web Foundation](https://www.thegreenwebfoundation.org/green-web-check/) si se audita huella de hosting; no migrar de host sin decisión del equipo.
- Cache: depende de cabeceras de GitHub Pages; no hay CDN propio configurado en el repo.

### Idiomas

- Tres variantes HTML: `dist/en/`, `dist/es/`, `dist/pt/` (`LOCALES` en `build.mjs`).
- Auditar al menos la variante principal y una secundaria si el peso difiere (p. ej. textos más largos no deberían añadir assets extra).

### Medición (baseline del proyecto)

1. `npm run build` y `npm run preview` (http://localhost:3000).
2. Lighthouse (Chrome DevTools → Performance / Best practices) sobre `/en/` (y `/es/` o `/pt/` si hay cambios de contenido).
3. [Website Carbon Calculator](https://www.websitecarbon.com/) o [Ecograder](https://ecograder.com/) sobre la URL de preview o staging.
4. Registrar: peso total de página, número de peticiones, LCP, proveedor de hosting, nota sobre Tailwind CDN y Google Fonts.

**Orden de impacto típico en este repo:** imágenes en `public/` → Tailwind CDN → Google Fonts → HTML generado → favicons/OG.

## Casos particulares

**Imagen OG:** `SIRH_screenshot_map.png` referenciada en `layout.html`; cuenta en compartidos sociales aunque no esté en el viewport.

**`BASE_PATH` en producción:** las URLs absolutas de assets usan `{{basePath}}` en meta y favicons; en preview local `basePath` puede ser vacío. Medir en condiciones equivalentes al despliegue cuando sea posible.

**Screenshots de producto:** varios PNG en `public/images/` (mapas, facturas, procedimientos); suelen ser los mayores contribuyentes al peso. Priorizar compresión y dimensiones antes que micro-optimizaciones en HTML.

## Anti-patrones

| Síntoma | Efecto | Acción correctiva |
|---------|--------|-------------------|
| PNG sin comprimir en `public/` | Mayor transferencia en cada visita | Comprimir o convertir a WebP/AVIF; mantener original solo si hace falta |
| `loading="lazy"` en imagen LCP/hero | Empeora LCP y percepción de carga | Quitar lazy en above-the-fold |
| Añadir scripts de analytics sin auditoría | Peticiones y JS extra | Evaluar necesidad; preferir métricas agregadas server-side si existieran |
| Prometer pipeline de imágenes en build | Expectativa no cumplida | Documentar que la optimización es manual hasta que exista paso en `build.mjs` |
| Confundir sección de copy “sustainability” con esta guía | Mejoras en lugar equivocado | Esta guía es huella web; el copy de producto vive en `locales/` |
| Migrar hosting “por verde” sin revisar CI | Ruptura de despliegue | Coordinar con workflow y `BASE_PATH` |

## Referencias

- Estructura del repositorio: [repository-structure.md](./repository-structure.md)
- Assets estáticos: skill `gestionar-recursos-estaticos`
- Skill operativa de auditoría: `.ai-dev/skills/lead-dev/auditar-huella-web/SKILL.md`
