/**
 * renderer-canvas.js — Renders a code minimap onto an HTML Canvas,
 * replicating the Python minimap's pixel-rectangle algorithm exactly.
 */
import { resolveColor, resolvePaletteColor, Themes, ColorPalettes, PALETTE_NONE } from './themes.js';

/**
 * Render tokens to a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {{scope:string, text:string}[]} tokens
 * @param {object} opts
 * @param {string} opts.theme      — theme name (key in Themes)
 * @param {number} opts.charWidth  — pixel width per character (default 3)
 * @param {number} opts.charHeight — pixel height per character (default 5)
 * @param {number} opts.spacing    — vertical spacing between rows (default 1)
 * @param {string} opts.colorPalette — colour palette name or 'none' for syntax colors
 * @param {number} opts.tabWidth   — spaces per tab (default 4)
 */
function renderCanvas(canvas, tokens, opts = {}) {
  const theme     = opts.theme      || 'monokai';
  const charW     = opts.charWidth  || 3;
  const charH     = opts.charHeight || 5;
  const spacing   = Number.isFinite(opts.spacing) ? opts.spacing : 1;
  const tabWidth  = opts.tabWidth   || 4;
  const palette   = opts.colorPalette || PALETTE_NONE;
  const usePalette = palette !== PALETTE_NONE && ColorPalettes[palette];
  const t         = Themes[theme];
  const bg        = usePalette ? ColorPalettes[palette].background : (t ? t.background : '#272822');

  // Pre-compute dimensions (same logic as Python version)
  const fullText = tokens.map(tk => tk.text).join('');
  const lines = fullText.split('\n');
  let maxCols = 1;
  for (const l of lines) { if (l.length > maxCols) maxCols = l.length; }
  const numRows = lines.length;
  const width  = maxCols * charW;
  const height = numRows * (charH + spacing) - spacing;

  // Size canvas
  canvas.width  = width;
  canvas.height = Math.max(height, 1);

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Draw character rectangles
  let x = 0;
  let y = 0;
  for (const { scope, text } of tokens) {
    const color = usePalette ? resolvePaletteColor(palette, scope) : resolveColor(theme, scope);
    ctx.fillStyle = color;
    for (const c of text) {
      if (c === '\n') {
        x = 0;
        y += charH + spacing;
      } else if (c === ' ') {
        x += charW;
      } else if (c === '\t') {
        x += charW * tabWidth;
      } else {
        ctx.fillRect(x, y, charW, charH);
        x += charW;
      }
    }
  }
}

/**
 * Export the canvas content as a PNG Blob via a Promise.
 */
function canvasToPngBlob(canvas) {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

export { renderCanvas, canvasToPngBlob };
