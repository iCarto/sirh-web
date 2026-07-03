# Repository structure

This repository is much smaller than a full web application: it is a **static marketing landing page** with no application backend, no database, and no frontend framework.

What is particular about this project:

- The site is **generated at build time** from HTML templates and JSON locale files. There is no React, Vite, or runtime JavaScript bundle.
- `build.mjs` at the repository root is the only build entry point. It renders templates, validates i18n keys, and writes HTML under `dist/`.
- `package.json` defines npm scripts only (`build`, `dev`, `preview`). There are **no npm dependencies**; Node.js 20+ is required only to run the build script. `npm run preview` uses `npx serve` on demand.
- **Content and presentation are separated**: copy, numbers, and links live in `locales/`; layout and visual structure live in `templates/`.
- Styles use **Tailwind CSS via CDN**, with theme tokens configured in `templates/layout.html`. There is no separate CSS build step.
- Deployment is **publish `dist/`** to a static host. Image paths in locale JSON use absolute URLs from the site root (`/images/...`).

## Structure

This is the folder layout for this repository.

- `templates/`. HTML source for the landing page.
  - `templates/layout.html`. Document shell: `<head>`, meta/OG tags, Tailwind CDN and colour tokens (`primary`, `secondary`, `neutral`), skip link, footer, closing tags. Wraps the rendered sections.
  - `templates/partials/`. Reusable fragments included in the page assembly. Currently `header.html` (brand, nav, language switcher, CTA).
  - `templates/sections/`. One file per scroll section of the landing (`hero`, `proven`, `challenges`, `capabilities`, `sustainability`, `ecosystem`, `methodology`, `contact`). Section order is defined in `build.mjs`, not by file naming alone.
- `locales/`. Localised content as JSON, one file per language (`en.json`, `es.json`).
  - Keys are nested objects (e.g. `meta.title`, `hero.headline`). Templates reference them with `{{key}}` or Handlebars-style blocks (`{{#if}}`, `{{#each}}`, `{{#eq}}`).
  - `en.json` is the source of truth for keys; the build fails if `es.json` is missing any key from `en.json`.
- `public/`. Static assets copied verbatim into `dist/` on build (images, favicons, …). Paths referenced from locale JSON should be absolute from the site root.
- `build.mjs`. Build pipeline: load locales, validate i18n parity, render each section through the template engine, assemble `layout.html`, write `dist/<lang>/index.html`, copy `public/`.
  - `SECTIONS` array controls which section files are included and in which order. New sections must be registered here.
  - `npm run dev` runs the same script with `--watch` on `locales/`, `templates/`, and `public/`.
- `dist/`. **Generated output** — do not edit by hand. Contains `dist/en/index.html`, `dist/es/index.html`, and a copy of `public/`. Listed in `.gitignore`.

Root files:

- `package.json` — npm scripts wrapping `build.mjs`.
- `README.md` — short project summary.
- `.gitignore` — ignores `dist/`, `node_modules/`, and local IDE folders.

## Build output: `dist/`

All deployable artefacts are produced under `dist/`. This directory should be safe to delete and regenerate with `npm run build`.

- `dist/en/index.html` — English landing page.
- `dist/es/index.html` — Spanish landing page.
- `dist/images/`, … — copy of `public/` at the root of `dist/` so absolute paths like `/images/logo_icarto.png` resolve correctly when the host serves `dist/` as the site root.

`dist/` is in `.gitignore`. CI and local preview always build fresh output. Do not commit generated HTML unless your deployment pipeline explicitly requires it.

For local development, run `npm run dev` (watch) and `npm run preview` (serve `dist/` at http://localhost:3000).
