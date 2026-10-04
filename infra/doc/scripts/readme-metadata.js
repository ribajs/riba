/**
 * Title and description of a demo README. Shared by build-demos.js (the English
 * README.md, which feeds the manifest) and build-locales.js (README.<lang>.md,
 * which feeds the catalog), so both read a README the same way.
 */

/**
 * Strips markdown decoration that must not leak into the registry.
 * @param {string} value
 * @returns {string}
 */
export function stripMarkdown(value) {
  return String(value)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> label
    .replace(/`([^`]*)`/g, '$1') // inline code
    .replace(/[*_]{1,3}/g, '') // emphasis
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * First level-1 heading of a README.
 * @param {string} md
 * @returns {string} heading text or ''
 */
export function extractTitle(md) {
  const match = md.match(/^\s{0,3}#\s+(.+?)\s*#*\s*$/m);
  if (!match) return '';
  return stripMarkdown(match[1]);
}

/**
 * First meaningful prose paragraph of a README: the first block of text that is
 * neither a heading, a code block, a badge row, a list, a table nor HTML.
 * @param {string} md
 * @returns {string} paragraph or ''
 */
export function extractDescription(md) {
  const lines = md.split(/\r?\n/);
  const paragraph = [];
  let inFence = false;
  let inHtmlBlock = false;

  const flush = () => {
    const text = stripMarkdown(paragraph.join(' '));
    paragraph.length = 0;
    return text;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^\s{0,3}(```|~~~)/.test(line)) {
      const text = flush();
      if (text) return text;
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^\s{0,3}<!--/.test(line)) {
      inHtmlBlock = true;
      continue;
    }
    if (inHtmlBlock) {
      if (line.includes('-->')) inHtmlBlock = false;
      continue;
    }

    if (trimmed === '') {
      const text = flush();
      if (text) return text;
      continue;
    }
    // Headings, rules, lists, quotes, tables, badges and raw HTML are not prose.
    if (
      /^#{1,6}\s/.test(trimmed) ||
      /^(-{3,}|\*{3,}|_{3,})$/.test(trimmed) ||
      /^([-*+]|\d+\.)\s/.test(trimmed) ||
      /^>/.test(trimmed) ||
      /^\|/.test(trimmed) ||
      /^<[a-zA-Z!/]/.test(trimmed) ||
      /^!\[/.test(trimmed)
    ) {
      const text = flush();
      if (text) return text;
      continue;
    }

    paragraph.push(trimmed);
  }
  return flush();
}
