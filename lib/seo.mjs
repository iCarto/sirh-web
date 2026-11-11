import fs from "fs";
import path from "path";

/**
 * Public origin of the site (e.g. "https://sirh.icarto.es"), without trailing slash.
 * Search engines require absolute URLs in canonical, hreflang, sitemap and robots.
 * Taken from SITE_URL if set; otherwise derived from the GitHub Pages CNAME file.
 */
export function resolveSiteOrigin(rootDir, rawSiteUrl) {
  const siteUrl = rawSiteUrl?.trim() || readCnameOrigin(rootDir);
  if (!siteUrl) {
    throw new Error("SITE_URL is not set and public/CNAME is missing");
  }
  return new URL(siteUrl).origin;
}

function readCnameOrigin(rootDir) {
  const cnamePath = path.join(rootDir, "public", "CNAME");
  if (!fs.existsSync(cnamePath)) return "";
  const domain = fs.readFileSync(cnamePath, "utf8").trim();
  return domain ? `https://${domain}` : "";
}

export function createAbsoluteUrlBuilder(siteOrigin, basePath) {
  return (rootRelativePath) => `${siteOrigin}${basePath}${rootRelativePath}`;
}

export function localePath(code) {
  return `/${code}/`;
}

/** URLs for <link rel="canonical"> and <link rel="alternate" hreflang> of one page. */
export function buildPageSeoUrls(currentLocale, locales, defaultLocale, toAbsoluteUrl) {
  const alternateUrls = Object.fromEntries(
    locales.map((code) => [code, toAbsoluteUrl(localePath(code))]),
  );
  return {
    canonicalUrl: alternateUrls[currentLocale],
    alternateUrls,
    xDefaultUrl: alternateUrls[defaultLocale],
  };
}

export function renderSitemap(locales, defaultLocale, toAbsoluteUrl) {
  const alternateLinks = locales
    .map(
      (code) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${toAbsoluteUrl(localePath(code))}" />`,
    )
    .concat(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${toAbsoluteUrl(localePath(defaultLocale))}" />`,
    )
    .join("\n");

  const urlEntries = locales
    .map(
      (code) =>
        `  <url>\n    <loc>${toAbsoluteUrl(localePath(code))}</loc>\n${alternateLinks}\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;
}

export function renderRobotsTxt(toAbsoluteUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${toAbsoluteUrl("/sitemap.xml")}
`;
}
