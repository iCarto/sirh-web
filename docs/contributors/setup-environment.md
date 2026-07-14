# Setup Environment

## Prerequisites

For local development you only need Node.js. For additional recommendations on how to install the required external software, follow these links:

Must have:

- nodejs and npm: [doc](https://github.com/iCarto/ikdb/blob/main/configurar_equipo/linux/instalar_y_actualizar_node_y_npm.md), [script](https://github.com/iCarto/readi-server/blob/main/server/install_node_and_npm.sh)

Nice to have:

- [zoxide](https://github.com/iCarto/ikdb/blob/wip_linters/configurar_equipo/linux/shell_autojump.md#zoxide). Jump to the project with `z <myproject>`. A very good replacement for `workon`.

## Setup

```bash
# 1. Clone the repository and enter the project folder

# 2. Verify Node.js 24+ is available
node -v

# 3. Build once to verify everything works
npm run build

# 4. That's all — no npm install required; the project has no package dependencies
```

## Development

Local workflow: run the watcher and the preview server in two terminals.

```bash
# Terminal 1 — rebuild on save (locales/, templates/, public/)
npm run dev

# Terminal 2 — serve dist/ at http://localhost:3000
npm run preview
```

Edit files and refresh the browser. The watcher logs `[build] … OK` on each successful rebuild.

For a one-off build (CI or deploy):

```bash
npm run build
```

Generates `dist/en/` and `dist/es/` plus static assets from `public/`.

### What to edit

| Change | Location |
|--------|----------|
| Text, numbers, links | `locales/en.json` (and `locales/es.json` for Spanish) |
| Images | `public/images/` + path in locale JSON (e.g. `hero.screenshot`) |
| Layout / design | `templates/sections/*.html`, `templates/partials/header.html` |

### Internationalisation

- English: `locales/en.json` → `dist/en/index.html`
- Spanish: `locales/es.json` → `dist/es/index.html` (fill in translations; keys must match `en.json`)
- URLs: `/en/`, `/es/` and `/pt/`. The build writes `dist/index.html` to redirect `/` → `/en/` (works on GitHub Pages and on a custom domain root).

The build validates that `es.json` contains every key present in `en.json`.

### Deploy

Publish the contents of `dist/` to your static host. Image paths use absolute URLs (`/images/...`) from the site root.

## Tips

- If `npm run preview` fails because port 3000 is in use, stop the other process or adjust the port in `package.json`.
- When adding a new section, register it in `build.mjs` (`SECTIONS` array) and add the HTML under `templates/sections/`.
- Keep locale keys in sync: missing keys in `es.json` will fail the build.
