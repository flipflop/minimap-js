/**
 * renderer-ascii.js — Renders a code minimap as colored Unicode block elements.
 *
 * Block shading characters used:
 *   Space   → ' '  (whitespace stays whitespace)
 *   Letters → '█'  (full block — high density: alphanumerics)
 *   Symbols → '▓'  (dark shade: operators, punctuation)
 *   Digits  → '▒'  (medium shade)
 *   Other   → '░'  (light shade)
 *
 * Each character is wrapped in a <span> with its syntax color.
 */
import { resolveColor, resolvePaletteColor, Themes, ColorPalettes, PALETTE_NONE } from './themes.js';

const BLOCK_FULL   = '\u2588'; // █
const BLOCK_DARK   = '\u2593'; // ▓
const BLOCK_MEDIUM = '\u2592'; // ▒
const BLOCK_LIGHT  = '\u2591'; // ░

/**
 * Map a source character to a Unicode block element.
 */
function charToBlock(c) {
  if (c === ' ' || c === '\t' || c === '\n' || c === '\r') return c;
  if (/[a-zA-Z_]/.test(c)) return BLOCK_FULL;
  if (/[0-9]/.test(c))     return BLOCK_MEDIUM;
  if (/[{}()\[\];,.]/.test(c)) return BLOCK_DARK;
  return BLOCK_LIGHT;
}

/**
 * Render tokens into an HTML string of colored Unicode block elements.
 * @param {{scope:string, text:string}[]} tokens
 * @param {object} opts
 * @param {string} opts.theme — theme name
 * @returns {string} HTML string to set as innerHTML of a <pre> element
 */
function renderAsciiHtml(tokens, opts = {}) {
  const theme = opts.theme || 'monokai';
  const palette = opts.colorPalette || PALETTE_NONE;
  const usePalette = palette !== PALETTE_NONE && ColorPalettes[palette];
  const parts = [];

  for (const { scope, text } of tokens) {
    const color = usePalette ? resolvePaletteColor(palette, scope) : resolveColor(theme, scope);
    let buf = '';
    for (const c of text) {
      if (c === '\n') {
        if (buf) {
          parts.push(`<span style="color:${color}">${escapeHtml(buf)}</span>`);
          buf = '';
        }
        parts.push('\n');
      } else {
        buf += charToBlock(c);
      }
    }
    if (buf) {
      parts.push(`<span style="color:${color}">${escapeHtml(buf)}</span>`);
    }
  }
  return parts.join('');
}

/**
 * Render tokens into a plain-text Unicode block string (no color, for saving).
 */
function renderAsciiPlain(tokens) {
  let out = '';
  for (const { text } of tokens) {
    for (const c of text) {
      out += charToBlock(c);
    }
  }
  return out;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export { renderAsciiHtml, renderAsciiPlain, charToBlock };
