# SIRH Landing Page

Static marketing website for **SIRH** (Water Resources Information System), an internal web application used by water authorities to manage users, permits, operation areas, billing, and licensing workflows. This landing page introduces SIRH to prospective partners and institutions: it explains the problem it solves, its capabilities, methodology, and ecosystem—without running an application backend or database.

## Technology

The site is **multilingual**, generating one static HTML page per locale (English, Spanish, and Portuguese) from shared templates. Copy and metadata live in `locales/*.json`; layout and section markup live in `templates/`. A lightweight Node.js build script (`build.mjs`, no npm dependencies) validates that all locale files share the same keys, renders pages through a small template engine, and writes deployable output to `dist/`. Styling uses **Tailwind CSS via CDN** with brand tokens; interactivity is handled by minimal vanilla JavaScript in `public/js/`. Deployment targets **GitHub Pages** (see `.github/workflows/deploy-pages.yml`).

## Project Structure

`templates/` contains the document shell (`layout.html`), reusable partials (`partials/`), and one HTML file per scroll section (`sections/`); section order is defined in `build.mjs`. `public/` holds images and static assets copied verbatim into `dist/`. Supporting modules live in `lib/` (i18n, brand tokens, template engine) and `data/` (icons). Run `npm run build` to generate the site, `npm run dev` to rebuild on file changes, and `npm run preview` to serve `dist/` locally.
