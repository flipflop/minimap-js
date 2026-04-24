# minimap-js

A standalone HTML/JS/CSS web app that generates beautiful code minimaps — pixel-art style visualizations of source code with syntax highlighting. Inspired by the [Python minimap](https://github.com/Ivoah/minimap) project.

![Render Modes](https://img.shields.io/badge/modes-Canvas%20%7C%20Unicode%20Blocks-6c8cff)
![No Build Step](https://img.shields.io/badge/build-none%20required-green)

## Features

- **Drag & drop** or file picker to load any source code file
- **Canvas (PNG) rendering** — pixel-perfect colored rectangles per character, identical to the Python version
- **Unicode Block rendering** — maps characters to `░ ▒ ▓ █` shading glyphs with syntax colors
- **5 built-in default sub themes for the Syntax Theme** — Monokai, GitHub, Dracula, Solarized Dark, Nord
- **24 languages** supported via [highlight.js](https://highlightjs.org/) with auto-detection
- **Configurable** character width, height, and row spacing
- **Export** — Save as PNG or plain-text ASCII (Unicode block elements)
- **Zero build step** — pure ES modules, just serve and open

## Requirements

Any modern browser (Chrome, Firefox, Safari, Edge). No Node.js or build tools needed.

## Quick Start

```bash
# Serve the directory (any static server works)
cd minimap-js
python3 -m http.server 8900

# Open in browser
open http://localhost:8900
```

Or use any static file server — `npx serve`, VS Code Live Server, etc.

## Usage

1. Open the app in your browser
2. **Drop a source code file** onto the drop zone (or click to browse)
3. The minimap renders automatically with the detected language and Monokai theme
4. Adjust settings in the sidebar:
   - **Theme** — color scheme for syntax highlighting
   - **Language** — override auto-detection if needed
   - **Render Mode** — PNG Canvas or Unicode Blocks
   - **Character Size** — width (W), height (H), and gap between rows
5. Click **Save PNG** or **Save ASCII** to export

## Render Modes

### Canvas (PNG)
Each source character becomes a small colored rectangle on an HTML `<canvas>`. Whitespace is transparent (shows the theme background). This matches the original Python minimap output exactly.

### Unicode Blocks (ASCII)
Each source character is mapped to a Unicode Block Element based on its type:

| Character Type | Block Element |
|---|---|
| Letters, underscore | `█` Full Block |
| Digits | `▒` Medium Shade |
| Brackets, punctuation | `▓` Dark Shade |
| Other symbols | `░` Light Shade |
| Whitespace | preserved as-is |

Each block element is colored with the syntax highlight color from the selected theme.

## Project Structure

```
minimap-js/
├── index.html              # App shell — layout, controls, drop zone
├── css/
│   └── style.css           # Dark UI theme, responsive grid layout
└── js/
    ├── app.js              # Orchestration — file handling, UI events, render pipeline
    ├── themes.js           # Color themes (monokai, github, dracula, solarized, nord)
    ├── tokenizer.js        # highlight.js integration — flat token extraction
    ├── renderer-canvas.js  # Canvas pixel-rectangle renderer (matches Python)
    └── renderer-ascii.js   # Unicode block element renderer
```

## Architecture

The app follows a clean **pipeline** pattern:

```
File Input → Tokenizer → Renderer → Output
              (hljs)     (canvas    (display /
                          or ascii)  export)
```

Each module is a standalone ES module with no shared mutable state. The `app.js` orchestrator wires them together.

## Comparison with Python Version

| Feature | Python minimap | minimap-js |
|---|---|---|
| Syntax engine | Pygments | highlight.js |
| Image library | Pillow (PIL) | HTML Canvas API |
| Default theme | Monokai | Monokai |
| Default char size | 3×5 px | 3×5 px |
| Unicode blocks | ✗ | ✓ |
| Interactive UI | ✗ (CLI only) | ✓ |
| Dependencies | pip install | CDN (zero install) |

## License

Mit license.
