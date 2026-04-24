# Minimap-JS Progress Tracker

## Stages

### Stage 1: Project Structure & Core HTML
- [x] Create `minimap-js/` directory
- [x] Create `PROGRESS.md`
- [x] Create `index.html` — app shell, drag-drop zone, controls
- [x] Create `css/style.css` — layout, theming, responsive design
- [x] Create `js/tokenizer.js` — syntax highlighting / token extraction
- [x] Create `js/renderer-canvas.js` — Canvas pixel-rectangle rendering
- [x] Create `js/renderer-ascii.js` — Unicode block element rendering
- [x] Create `js/themes.js` — color themes (monokai, github, dracula, solarized, nord)
- [x] Create `js/app.js` — orchestration, file handling, UI events

### Stage 2: Canvas Rendering (PNG mode)
- [x] Lex source code via highlight.js token stream
- [x] Map tokens to colors per theme
- [x] Draw colored rectangles on `<canvas>` (matching Python behavior)
- [x] Support configurable char width, height, spacing
- [x] PNG export via `canvas.toBlob()`

### Stage 3: Unicode Block Element Rendering (ASCII mode)
- [x] Map token colors to `<span>` styled text
- [x] Use Unicode block shading: `░ ▒ ▓ █` based on character class
- [x] Render into a `<pre>` element with copy/export support

### Stage 4: UI Polish & Infographic Design
- [x] Drag-and-drop file zone with visual feedback
- [x] File picker fallback
- [x] Live preview on file load
- [x] Controls panel: theme, char size, spacing, render mode
- [x] Save PNG button
- [x] Save ASCII text button
- [x] Responsive layout

### Stage 5: Bug Fixes & Hardening
- [x] Fix `parseInt` NaN handling for spacing (allow 0)
- [x] Fix hljs emitter tree access (rootNode fallback)
- [x] Replace `Math.max(...spread)` with loop for large files
- [x] Add fallback for empty token list

### Stage 6: Code Review & Documentation
- [x] Create `README.md`
- [x] Code review via tool — 1 low-severity CDN finding → fixed by vendoring highlight.js
- [x] Final PROGRESS.md update

### Stage 7: v1.1.0 Polish
- [x] Add JetBrains Mono from Google Fonts as primary monospace font
- [x] Add syntax-highlighted source code preview on file load
- [x] Show line count in source preview header
- [x] Show minimap dimensions (px or chars) in output header
- [x] Add semantic footer with version `v1.1.0`
- [x] Re-highlight code preview on language change
- [x] Code review of v1.1.0 changes — full scan, 0 findings

### Stage 8: v1.2.0 — Layout & Auto-render
- [x] Source preview fills remaining viewport height (`max-height: calc(100vh - 16rem)`, `min-height: 180px`)
- [x] Main content area scrollable (`overflow-y: auto`) for minimap below source
- [x] Canvas minimap auto-renders on file load (no manual Render step needed)
- [x] "Render" button renamed to "Update" for char size / spacing tweaks
- [x] Event wiring separated: lang → re-highlight + re-render; size/spacing → re-render only; theme → re-render only
- [x] Minimap output section has clean bottom padding (`2rem`)
- [x] Footer bumped to `v1.2.0`
- [x] Code review of v1.2.0 changes — full scan, 0 findings

### Stage 9: v1.3.0 — Colour Palettes & Layout Cleanup
- [x] Remove "Load a file to generate its minimap" empty-state message
- [x] Add `ColorPalettes` constant with 6 palettes: Cold, Warm, Hot, Neutral, Natural, Cyber Punk
- [x] Add `PALETTE_NONE` sentinel constant for "use syntax theme colors"
- [x] Add `resolvePaletteColor()` — deterministic scope→swatch hash mapping
- [x] Palette picker UI with clickable swatch rows and selected state ring
- [x] Canvas renderer accepts `opts.colorPalette`, overrides syntax colors when set
- [x] ASCII renderer accepts `opts.colorPalette`, same override logic
- [x] Minimap section sits directly below code preview with tight spacing
- [x] Update button re-renders with current palette selection
- [x] Footer bumped to `v1.3.0`
- [x] Code review of v1.3.0 changes — full scan, 0 findings

### Stage 10: v1.4.0 — Side-by-side Panel Layout
- [x] Wrap code preview + minimap in `.panels` CSS grid container (`1fr 1fr`)
- [x] Both panels fill 50% width with `1rem` gap
- [x] Panels flex-fill available height (`flex: 1`, `min-height: 0`)
- [x] Code preview scrolls internally, minimap panel scrolls independently
- [x] Drop zone stays full-width above panels with `flex-shrink: 0`
- [x] Responsive: panels stack to single column at `≤720px`
- [x] Removed old stacked layout margins/max-height constraints
- [x] Footer bumped to `v1.4.0`
- [x] Code review — full scan, 0 findings
