import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ICONS } from "./data/icons.mjs";
import {
  loadLocale,
  mapDeepStrings,
  normalizeBasePath,
  prefixRootPath,
  validateLocales,
} from "./lib/i18n-utils.mjs";
import { loadBrandTheme } from "./lib/brand-tokens.mjs";
import { createTemplateRenderer } from "./lib/template-engine.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

const LOCALES = ["en", "es", "pt"];
const SECTIONS = [
  "hero",
  "challenges",
  "proven",
  "capabilities",
  "ecosystem",
  "methodology",
  "contact",
];

function readFile(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), "utf8");
}
const renderTemplate = createTemplateRenderer({ icons: ICONS });

function renderPage(data) {
  const header = renderTemplate(
    readFile("templates/partials/header.html"),
    data,
  );
  const layout = readFile("templates/layout.html");
  const bodySections = [];
  for (const name of SECTIONS) {
    const section = readFile(`templates/sections/${name}.html`);
    bodySections.push(renderTemplate(section, data));
  }
  const footer = renderTemplate(
    readFile("templates/partials/footer.html"),
    data,
  );
  const sections = `${header}\n\n<main id="main-content">\n${bodySections.join("\n\n")}\n</main>\n\n${footer}`;
  return renderTemplate(layout, { ...data, sections });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyPublic() {
  const publicDir = path.join(ROOT, "public");
  const distDir = path.join(ROOT, "dist");
  if (!fs.existsSync(publicDir)) return;
  copyDir(publicDir, distDir);
}

const DEFAULT_LOCALE = LOCALES[0];

function writeRootLocaleRedirect(basePath) {
  const html = renderTemplate(readFile("templates/root-redirect.html"), {
    defaultLocale: DEFAULT_LOCALE,
    canonicalHref: prefixRootPath(`/${DEFAULT_LOCALE}/`, basePath),
  });
  fs.writeFileSync(path.join(ROOT, "dist", "index.html"), html);
}

export function build() {
  const basePath = normalizeBasePath(process.env.BASE_PATH);
  const brandTheme = loadBrandTheme(ROOT);
  const enRaw = loadLocale(ROOT, "en");
  const esRaw = loadLocale(ROOT, "es");
  const ptRaw = loadLocale(ROOT, "pt");
  validateLocales(enRaw, { code: "es", data: esRaw }, { code: "pt", data: ptRaw });
  const en = mapDeepStrings(enRaw, (value) => prefixRootPath(value, basePath));
  const es = mapDeepStrings(esRaw, (value) => prefixRootPath(value, basePath));
  const pt = mapDeepStrings(ptRaw, (value) => prefixRootPath(value, basePath));
  const localeDataByCode = { en, es, pt };

  for (const code of LOCALES) {
    const data = localeDataByCode[code];
    const html = renderPage({ ...data, ...brandTheme, basePath });
    const outDir = path.join(ROOT, "dist", code);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
  }

  copyPublic();
  writeRootLocaleRedirect(basePath);
}

function buildAll(isWatch = false) {
  try {
    build();
    console.log(`[build] ${new Date().toLocaleTimeString()} OK`);
    return true;
  } catch (err) {
    console.error(`[build] ERROR:`, err.message);
    if (!isWatch) process.exit(1);
    return false;
  }
}

function watch() {
  buildAll(true);
  const dirs = ["locales", "templates", "public", "lib", "data"];
  const rootFiles = ["build.mjs"];
  let debounceTimer;
  for (const dir of dirs) {
    const watchPath = path.join(ROOT, dir);
    if (!fs.existsSync(watchPath)) fs.mkdirSync(watchPath, { recursive: true });
    fs.watch(watchPath, { recursive: true }, () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => buildAll(true), 150);
    });
  }
  for (const file of rootFiles) {
    const watchPath = path.join(ROOT, file);
    if (!fs.existsSync(watchPath)) continue;
    fs.watch(watchPath, () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log(`[build] ${file} changed — restart dev to reload build script`);
        buildAll(true);
      }, 150);
    });
  }
  console.log(
    "Watching locales/, templates/, public/, lib/, data/ — Ctrl+C to stop",
  );
}

if (process.argv.includes("--watch")) {
  watch();
} else {
  buildAll(false);
}
