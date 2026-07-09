export function getValue(context, key) {
  if (key in context) return context[key];
  if (key.includes(".")) {
    return key.split(".").reduce((obj, part) => obj?.[part], context);
  }
  return undefined;
}

export function resolveScalars(template, context, resolveIconSvg) {
  return template.replace(/\{\{([^#/{][^}]*)\}\}/g, (_, rawKey) => {
    const key = rawKey.trim();
    if (key.startsWith("iconSvg ")) {
      return resolveIconSvg(key.slice("iconSvg ".length), context);
    }
    const value = getValue(context, key);
    return value === undefined || value === null ? "" : String(value);
  });
}

export function findBlockClose(template, startPos, openPattern, closePattern) {
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
      continue;
    }

    depth--;
    if (depth === 0) return nextClose.index;
    pos = nextClose.index + nextClose[0].length;
  }

  return -1;
}

export function renderBlocks(template, context, { openRe, closeTag, renderBlock }) {
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

export function renderIfBlocks(template, context, renderTemplate) {
  return renderBlocks(template, context, {
    openRe: /\{\{#if\s+([^}]+)\}\}/g,
    closeTag: "if",
    renderBlock: (match, block) => {
      const value = getValue(context, match[1].trim());
      return value ? renderTemplate(block, context) : "";
    },
  });
}

export function renderUnlessBlocks(template, context, renderTemplate) {
  return renderBlocks(template, context, {
    openRe: /\{\{#unless\s+([^}]+)\}\}/g,
    closeTag: "unless",
    renderBlock: (match, block) => {
      const value = getValue(context, match[1].trim());
      return !value ? renderTemplate(block, context) : "";
    },
  });
}

export function renderEqBlocks(template, context, renderTemplate) {
  return renderBlocks(template, context, {
    openRe: /\{\{#eq\s+([^}\s]+)\s+"([^"]*)"\}\}/g,
    closeTag: "eq",
    renderBlock: (match, block) => {
      const value = getValue(context, match[1].trim());
      return String(value) === match[2] ? renderTemplate(block, context) : "";
    },
  });
}

export function renderEachBlocks(template, context, renderTemplate) {
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

export function createRenderIconSvg(icons) {
  return function renderIconSvg(rawArg, context) {
    const arg = rawArg.trim();
    const iconName = getValue(context, arg);
    if (iconName === undefined || iconName === null) return "";
    return icons[String(iconName)] ?? "";
  };
}

export function createTemplateRenderer({ icons }) {
  const resolveIconSvg = createRenderIconSvg(icons);

  function renderTemplate(template, context) {
    let result = template;
    let prev;
    do {
      prev = result;
      result = renderEachBlocks(result, context, renderTemplate);
      result = renderEqBlocks(result, context, renderTemplate);
      result = renderIfBlocks(result, context, renderTemplate);
      result = renderUnlessBlocks(result, context, renderTemplate);
      result = resolveScalars(result, context, resolveIconSvg);
    } while (result !== prev);
    return result;
  }

  return renderTemplate;
}
