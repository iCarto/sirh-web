import fs from "fs";
import path from "path";

export function normalizeBasePath(rawBasePath) {
  if (!rawBasePath || rawBasePath === "/") return "";
  let basePath = String(rawBasePath).trim();
  if (!basePath.startsWith("/")) basePath = `/${basePath}`;
  if (basePath.endsWith("/")) basePath = basePath.slice(0, -1);
  return basePath;
}

export function prefixRootPath(value, basePath) {
  if (typeof value !== "string") return value;
  if (!basePath) return value;
  // Transform root-relative paths while preserving external/protocol-relative URLs.
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  return `${basePath}${value}`;
}

export function mapDeepStrings(node, mapString) {
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

export function collectKeys(obj, prefix = "") {
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

export function validateLocales(referenceLocale, ...localesToValidate) {
  const referenceKeys = collectKeys(referenceLocale);

  for (const localeCandidate of localesToValidate) {
    const { code, data } = localeCandidate;
    const localeKeys = collectKeys(data);
    const missingKeys = [...referenceKeys].filter((key) => !localeKeys.has(key));
    if (missingKeys.length > 0) {
      throw new Error(`${code}.json missing keys: ${missingKeys.join(", ")}`);
    }
  }
}

export function loadLocale(rootDir, code) {
  const localePath = path.join(rootDir, "locales", `${code}.json`);
  const localeContent = fs.readFileSync(localePath, "utf8");
  return JSON.parse(localeContent);
}
