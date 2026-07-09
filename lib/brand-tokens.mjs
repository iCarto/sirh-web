import fs from "fs";
import path from "path";

function readTokensFile(rootDir) {
  const tokensPath = path.join(rootDir, "docs", "brand", "tokens.json");
  const content = fs.readFileSync(tokensPath, "utf8");
  return JSON.parse(content);
}

function collectColorScale(scaleNode) {
  return Object.fromEntries(
    Object.entries(scaleNode).map(([key, token]) => [key, token.$value]),
  );
}

export function loadBrandTheme(rootDir) {
  const tokens = readTokensFile(rootDir);
  const primary = collectColorScale(tokens.color.primary);
  const secondary = collectColorScale(tokens.color.secondary);
  const neutral = collectColorScale(tokens.color.neutral);

  const tailwindColors = { primary, secondary, neutral };
  return {
    tailwindColors,
    tailwindColorsJson: JSON.stringify(tailwindColors, null, 16),
  };
}
