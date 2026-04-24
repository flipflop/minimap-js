/**
 * app.js — Orchestrates file input, UI controls, and rendering pipeline.
 */
import { tokenize, detectLanguage } from './tokenizer.js';
import { renderCanvas, canvasToPngBlob } from './renderer-canvas.js';
import { renderAsciiHtml, renderAsciiPlain } from './renderer-ascii.js';
import { Themes, ColorPalettes, PALETTE_NONE } from './themes.js';

// DOM refs
const dropZone      = document.getElementById('drop-zone');
const fileInput     = document.getElementById('file-input');
const fileNameEl    = document.getElementById('file-name');
const themeSelect   = document.getElementById('theme-select');
const langSelect    = document.getElementById('lang-select');
const charWidthIn   = document.getElementById('char-width');
const charHeightIn  = document.getElementById('char-height');
const spacingIn     = document.getElementById('spacing');
const modeRadios    = document.querySelectorAll('input[name="render-mode"]');
const savePngBtn    = document.getElementById('save-png');
const saveAsciiBtn  = document.getElementById('save-ascii');
const canvas        = document.getElementById('minimap-canvas');
const asciiPre      = document.getElementById('minimap-ascii');
const minimapSection = document.getElementById('minimap-section');
const codePreviewEl = document.getElementById('code-preview');
const codePreviewSection = document.getElementById('code-preview-section');
const codeLineCount = document.getElementById('code-line-count');
const minimapDims   = document.getElementById('minimap-dimensions');
const palettePicker = document.getElementById('palette-picker');

let currentCode     = '';
let currentTokens   = [];
let currentFile     = '';
let currentPalette  = PALETTE_NONE;

// --- Populate controls ---

Object.keys(Themes).forEach(name => {
  const opt = document.createElement('option');
  opt.value = name;
  opt.textContent = name;
  themeSelect.appendChild(opt);
});

buildPalettePicker();

// --- Palette picker ---

function buildPalettePicker() {
  // "Syntax" row — shows monokai swatches but uses PALETTE_NONE (theme colors)
  const syntaxPal = ColorPalettes.syntax;
  const syntaxRow = createPaletteRow(PALETTE_NONE, syntaxPal.label, syntaxPal.swatches);
  syntaxRow.classList.add('selected');
  palettePicker.appendChild(syntaxRow);

  // Palette rows (skip 'syntax' since it's already the default row above)
  Object.entries(ColorPalettes).forEach(([key, pal]) => {
    if (key === 'syntax') return;
    palettePicker.appendChild(createPaletteRow(key, pal.label, pal.swatches));
  });
}

function createPaletteRow(key, label, swatches) {
  const row = document.createElement('div');
  row.className = 'palette-row';
  row.dataset.palette = key;

  const nameSpan = document.createElement('span');
  nameSpan.className = 'palette-name';
  nameSpan.textContent = label;
  row.appendChild(nameSpan);

  if (swatches.length) {
    const swatchWrap = document.createElement('span');
    swatchWrap.className = 'palette-swatches';
    swatches.forEach(hex => {
      const s = document.createElement('span');
      s.className = 'palette-swatch';
      s.style.backgroundColor = hex;
      swatchWrap.appendChild(s);
    });
    row.appendChild(swatchWrap);
  }

  row.addEventListener('click', () => selectPalette(key));
  return row;
}

function selectPalette(key) {
  currentPalette = key;
  palettePicker.querySelectorAll('.palette-row').forEach(r =>
    r.classList.toggle('selected', r.dataset.palette === key)
  );
  render();
}

// --- File handling ---

function handleFile(file) {
  currentFile = file.name;
  fileNameEl.textContent = file.name;
  const reader = new FileReader();
  reader.onload = e => {
    currentCode = e.target.result;
    const detected = detectLanguage(file.name);
    if (detected !== 'auto') langSelect.value = detected;
    showCodePreview();
    render();
  };
  reader.readAsText(file);
}

// Drag & drop
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  if (fileInput.files.length) handleFile(fileInput.files[0]);
});

// --- Rendering ---

function showCodePreview() {
  if (!currentCode) return;
  const lang = langSelect.value;
  let highlighted;
  if (lang && lang !== 'auto') {
    highlighted = hljs.highlight(currentCode, { language: lang, ignoreIllegals: true }).value;
  } else {
    highlighted = hljs.highlightAuto(currentCode).value;
  }
  codePreviewEl.innerHTML = highlighted;
  const lineCount = currentCode.split('\n').length;
  codeLineCount.textContent = `${lineCount} line${lineCount !== 1 ? 's' : ''}`;
  codePreviewSection.hidden = false;
}

function getMode() {
  for (const r of modeRadios) if (r.checked) return r.value;
  return 'canvas';
}

function getOpts() {
  return {
    theme:        themeSelect.value,
    charWidth:    parseInt(charWidthIn.value, 10) || 3,
    charHeight:   parseInt(charHeightIn.value, 10) || 5,
    spacing:      Number.isFinite(parseInt(spacingIn.value, 10)) ? parseInt(spacingIn.value, 10) : 1,
    tabWidth:     4,
    colorPalette: currentPalette,
  };
}

function render() {
  if (!currentCode) return;

  const lang = langSelect.value;
  currentTokens = tokenize(currentCode, lang);
  const opts = getOpts();
  const mode = getMode();

  minimapSection.hidden = false;

  if (mode === 'canvas') {
    canvas.hidden = false;
    asciiPre.hidden = true;
    renderCanvas(canvas, currentTokens, opts);
    minimapDims.textContent = `${canvas.width}×${canvas.height} px`;
  } else {
    canvas.hidden = true;
    asciiPre.hidden = false;
    const palette = ColorPalettes[currentPalette];
    const bg = palette ? palette.background : (Themes[opts.theme]?.background || '#272822');
    asciiPre.style.backgroundColor = bg;
    asciiPre.innerHTML = renderAsciiHtml(currentTokens, opts);
    const lines = currentCode.split('\n');
    let maxCols = 0;
    for (const l of lines) if (l.length > maxCols) maxCols = l.length;
    minimapDims.textContent = `${maxCols}×${lines.length} chars`;
  }
}

// Re-render on control changes
langSelect.addEventListener('change', () => { showCodePreview(); render(); });
themeSelect.addEventListener('change', render);
[charWidthIn, charHeightIn, spacingIn].forEach(el =>
  el.addEventListener('change', render)
);
modeRadios.forEach(r => r.addEventListener('change', render));

// --- Save ---

savePngBtn.addEventListener('click', async () => {
  if (!currentTokens.length) return;
  const opts = getOpts();
  renderCanvas(canvas, currentTokens, opts);
  const blob = await canvasToPngBlob(canvas);
  downloadBlob(blob, baseName() + '.png');
});

saveAsciiBtn.addEventListener('click', () => {
  if (!currentTokens.length) return;
  const text = renderAsciiPlain(currentTokens);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, baseName() + '_ascii.txt');
});

function baseName() {
  return currentFile ? currentFile.replace(/\.[^.]+$/, '') : 'minimap';
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
