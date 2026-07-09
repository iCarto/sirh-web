import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ICONS } from "./data/icons.mjs";

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

function normalizeBasePath(rawBasePath) {
  if (!rawBasePath || rawBasePath === "/") return "";
  let basePath = String(rawBasePath).trim();
  if (!basePath.startsWith("/")) basePath = `/${basePath}`;
  if (basePath.endsWith("/")) basePath = basePath.slice(0, -1);
  return basePath;
}

function prefixRootPath(value, basePath) {
  if (typeof value !== "string") return value;
  if (!basePath) return value;
  // Transform root-relative paths while preserving external/protocol-relative URLs.
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  return `${basePath}${value}`;
}

function mapDeepStrings(node, mapString) {
  if (Array.isArray(node)) {
    return node.map((item) => mapDeepStrings(item, mapString));
  }
  if (node !== null && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        mapDeepStrings(value, mapString),
      ]),
    );
  }
  return typeof node === "string" ? mapString(node) : node;
}

function readFile(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), "utf8");
}

function loadLocale(code) {
  return JSON.parse(readFile(`locales/${code}.json`));
}

function collectKeys(obj, prefix = "") {
  const keys = new Set();
  if (obj !== null && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.add(fullKey);
      for (const child of collectKeys(value, fullKey)) {
        keys.add(child);
      }
    }
  }
  return keys;
}

function validateLocales(en, es, pt) {
  const enKeys = collectKeys(en);
  const esKeys = collectKeys(es);
  const ptKeys = collectKeys(pt);
  const missingEs = [...enKeys].filter((k) => !esKeys.has(k));
  const missingPt = [...enKeys].filter((k) => !ptKeys.has(k));
  if (missingEs.length > 0) {
    throw new Error(`es.json missing keys: ${missingEs.join(", ")}`);
  }
  if (missingPt.length > 0) {
    throw new Error(`pt.json missing keys: ${missingPt.join(", ")}`);
  }
}

function getValue(context, key) {
  if (key in context) return context[key];
  if (key.includes("."))
    return key.split(".").reduce((o, k) => o?.[k], context);
  return undefined;
}

function renderIconSvg(rawArg, context) {
  const arg = rawArg.trim();
  const iconName = getValue(context, arg);
  if (iconName === undefined || iconName === null) return "";
  return ICONS[String(iconName)] ?? "";
}

function resolveScalars(template, context) {
  return template.replace(/\{\{([^#/{][^}]*)\}\}/g, (_, rawKey) => {
    const key = rawKey.trim();
    if (key.startsWith("iconSvg ")) {
      return renderIconSvg(key.slice("iconSvg ".length), context);
    }
    const value = getValue(context, key);
    return value === undefined || value === null ? "" : String(value);
  });
}

function findBlockClose(template, startPos, openPattern, closePattern) {
  const openRe = new RegExp(openPattern, "g");
  const closeRe = new RegExp(closePattern, "g");
  let depth = 1;
  let pos = startPos;

  while (depth > 0) {
    openRe.lastIndex = pos;
    closeRe.lastIndex = pos;
    const nextOpen = openRe.exec(template);
    const nextClose = closeRe.exec(template);
    if (!nextClose) return -1;

    if (nextOpen && nextOpen.index < nextClose.index) {
      depth++;
      pos = nextOpen.index + nextOpen[0].length;
    } else {
      depth--;
      if (depth === 0) return nextClose.index;
      pos = nextClose.index + nextClose[0].length;
    }
  }
  return -1;
}

function renderBlocks(template, context, { openRe, closeTag, renderBlock }) {
  const openPattern = openRe.source;
  const closePattern = `\\{\\{/${closeTag}\\}\\}`;
  let result = "";
  let pos = 0;

  while (pos < template.length) {
    openRe.lastIndex = pos;
    const match = openRe.exec(template);
    if (!match) {
      result += template.slice(pos);
      break;
    }

    result += template.slice(pos, match.index);
    const blockStart = match.index + match[0].length;
    const closeIndex = findBlockClose(
      template,
      blockStart,
      openPattern,
      closePattern,
    );
    if (closeIndex === -1) {
      result += template.slice(match.index);
      break;
    }

    const block = template.slice(blockStart, closeIndex);
    result += renderBlock(match, block, context);
    pos = closeIndex + `{{/${closeTag}}}`.length;
  }

  return result;
}

function renderIfBlocks(template, context) {
  return renderBlocks(template, context, {
    openRe: /\{\{#if\s+([^}]+)\}\}/g,
    closeTag: "if",
    renderBlock: (match, block) => {
      const value = getValue(context, match[1].trim());
      return value ? renderTemplate(block, context) : "";
    },
  });
}

function renderUnlessBlocks(template, context) {
  return renderBlocks(template, context, {
    openRe: /\{\{#unless\s+([^}]+)\}\}/g,
    closeTag: "unless",
    renderBlock: (match, block) => {
      const value = getValue(context, match[1].trim());
      return !value ? renderTemplate(block, context) : "";
    },
  });
}

function renderEqBlocks(template, context) {
  return renderBlocks(template, context, {
    openRe: /\{\{#eq\s+([^}\s]+)\s+"([^"]*)"\}\}/g,
    closeTag: "eq",
    renderBlock: (match, block) => {
      const value = getValue(context, match[1].trim());
      return String(value) === match[2] ? renderTemplate(block, context) : "";
    },
  });
}

function renderEachBlocks(template, context) {
  return renderBlocks(template, context, {
    openRe: /\{\{#each\s+([^}]+)\}\}/g,
    closeTag: "each",
    renderBlock: (match, block) => {
      const items = getValue(context, match[1].trim());
      if (!Array.isArray(items)) return "";
      return items
        .map((item) => {
          const itemContext =
            typeof item === "object" && item !== null
              ? { ...context, ...item, _item: item }
              : { ...context, _item: item, ".": item };
          return renderTemplate(block, itemContext);
        })
        .join("");
    },
  });
}

function renderTemplate(template, context) {
  let result = template;
  let prev;
  do {
    prev = result;
    result = renderEachBlocks(result, context);
    result = renderEqBlocks(result, context);
    result = renderIfBlocks(result, context);
    result = renderUnlessBlocks(result, context);
    result = resolveScalars(result, context);
  } while (result !== prev);
  return result;
}

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
  const sections = `${header}\n\n<main id="main-content">\n${bodySections.join("\n\n")}\n</main>`;
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

export function build() {
  const basePath = normalizeBasePath(process.env.BASE_PATH);
  const enRaw = loadLocale("en");
  const esRaw = loadLocale("es");
  const ptRaw = loadLocale("pt");
  validateLocales(enRaw, esRaw, ptRaw);
  const en = mapDeepStrings(enRaw, (value) => prefixRootPath(value, basePath));
  const es = mapDeepStrings(esRaw, (value) => prefixRootPath(value, basePath));
  const pt = mapDeepStrings(ptRaw, (value) => prefixRootPath(value, basePath));

  for (const code of LOCALES) {
    const data = code === "en" ? en : code === "pt" ? pt : es;
    const html = renderPage({ ...data, basePath });
    const outDir = path.join(ROOT, "dist", code);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
  }

  copyPublic();
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
  const dirs = ["locales", "templates", "public"];
  let debounceTimer;
  for (const dir of dirs) {
    const watchPath = path.join(ROOT, dir);
    if (!fs.existsSync(watchPath)) fs.mkdirSync(watchPath, { recursive: true });
    fs.watch(watchPath, { recursive: true }, () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => buildAll(true), 150);
    });
  }
  console.log("Watching locales/, templates/, public/ — Ctrl+C to stop");
}

if (process.argv.includes("--watch")) {
  watch();
} else {
  buildAll(false);
}
