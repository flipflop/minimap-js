/**
 * themes.js — Color themes mapping highlight.js token scopes to hex colors.
 * Each theme has a `background` and a map of `colors` keyed by hljs scope.
 */
const Themes = {
  monokai: {
    background: '#272822',
    defaultColor: '#f8f8f2',
    colors: {
      keyword:       '#f92672',
      built_in:      '#66d9ef',
      type:          '#66d9ef',
      literal:       '#ae81ff',
      number:        '#ae81ff',
      string:        '#e6db74',
      subst:         '#f8f8f2',
      symbol:        '#ae81ff',
      class:         '#a6e22e',
      function:      '#a6e22e',
      title:         '#a6e22e',
      params:        '#f8f8f2',
      comment:       '#75715e',
      doctag:        '#75715e',
      meta:          '#75715e',
      'meta keyword':'#f92672',
      'meta string': '#e6db74',
      section:       '#a6e22e',
      tag:           '#f92672',
      name:          '#f92672',
      attr:          '#a6e22e',
      attribute:     '#a6e22e',
      variable:      '#f8f8f2',
      bullet:        '#ae81ff',
      code:          '#a6e22e',
      emphasis:      '#f8f8f2',
      strong:        '#f8f8f2',
      formula:       '#e6db74',
      link:          '#66d9ef',
      quote:         '#75715e',
      selector:      '#f92672',
      'selector-tag':'#f92672',
      'selector-id': '#a6e22e',
      'selector-class':'#a6e22e',
      regexp:        '#e6db74',
      deletion:      '#f92672',
      addition:      '#a6e22e',
      operator:      '#f92672',
      property:      '#66d9ef',
      punctuation:   '#f8f8f2',
      char:          '#e6db74',
      'template-variable': '#e6db74',
      'title.function': '#a6e22e',
      'title.class':    '#a6e22e',
    }
  },

  github: {
    background: '#ffffff',
    defaultColor: '#24292e',
    colors: {
      keyword:       '#d73a49',
      built_in:      '#005cc5',
      type:          '#005cc5',
      literal:       '#005cc5',
      number:        '#005cc5',
      string:        '#032f62',
      comment:       '#6a737d',
      function:      '#6f42c1',
      title:         '#6f42c1',
      class:         '#6f42c1',
      params:        '#24292e',
      meta:          '#6a737d',
      tag:           '#22863a',
      name:          '#22863a',
      attr:          '#6f42c1',
      attribute:     '#6f42c1',
      variable:      '#e36209',
      operator:      '#d73a49',
      property:      '#005cc5',
      punctuation:   '#24292e',
      regexp:        '#032f62',
      symbol:        '#005cc5',
      deletion:      '#b31d28',
      addition:      '#22863a',
      section:       '#005cc5',
      bullet:        '#005cc5',
      'title.function': '#6f42c1',
      'title.class':    '#6f42c1',
    }
  },

  dracula: {
    background: '#282a36',
    defaultColor: '#f8f8f2',
    colors: {
      keyword:       '#ff79c6',
      built_in:      '#8be9fd',
      type:          '#8be9fd',
      literal:       '#bd93f9',
      number:        '#bd93f9',
      string:        '#f1fa8c',
      comment:       '#6272a4',
      function:      '#50fa7b',
      title:         '#50fa7b',
      class:         '#50fa7b',
      params:        '#ffb86c',
      meta:          '#6272a4',
      tag:           '#ff79c6',
      name:          '#ff79c6',
      attr:          '#50fa7b',
      attribute:     '#50fa7b',
      variable:      '#f8f8f2',
      operator:      '#ff79c6',
      property:      '#8be9fd',
      punctuation:   '#f8f8f2',
      regexp:        '#f1fa8c',
      symbol:        '#bd93f9',
      deletion:      '#ff5555',
      addition:      '#50fa7b',
      section:       '#bd93f9',
      bullet:        '#8be9fd',
      'title.function': '#50fa7b',
      'title.class':    '#50fa7b',
    }
  },

  'solarized-dark': {
    background: '#002b36',
    defaultColor: '#839496',
    colors: {
      keyword:       '#859900',
      built_in:      '#268bd2',
      type:          '#b58900',
      literal:       '#2aa198',
      number:        '#d33682',
      string:        '#2aa198',
      comment:       '#586e75',
      function:      '#268bd2',
      title:         '#268bd2',
      class:         '#b58900',
      params:        '#839496',
      meta:          '#cb4b16',
      tag:           '#268bd2',
      name:          '#268bd2',
      attr:          '#b58900',
      attribute:     '#b58900',
      variable:      '#cb4b16',
      operator:      '#859900',
      property:      '#268bd2',
      punctuation:   '#839496',
      regexp:        '#dc322f',
      symbol:        '#d33682',
      deletion:      '#dc322f',
      addition:      '#859900',
      section:       '#cb4b16',
      bullet:        '#2aa198',
      'title.function': '#268bd2',
      'title.class':    '#b58900',
    }
  },

  'nord': {
    background: '#2e3440',
    defaultColor: '#d8dee9',
    colors: {
      keyword:       '#81a1c1',
      built_in:      '#88c0d0',
      type:          '#8fbcbb',
      literal:       '#81a1c1',
      number:        '#b48ead',
      string:        '#a3be8c',
      comment:       '#616e88',
      function:      '#88c0d0',
      title:         '#88c0d0',
      class:         '#8fbcbb',
      params:        '#d8dee9',
      meta:          '#5e81ac',
      tag:           '#81a1c1',
      name:          '#81a1c1',
      attr:          '#8fbcbb',
      attribute:     '#8fbcbb',
      variable:      '#d8dee9',
      operator:      '#81a1c1',
      property:      '#88c0d0',
      punctuation:   '#eceff4',
      regexp:        '#ebcb8b',
      symbol:        '#b48ead',
      deletion:      '#bf616a',
      addition:      '#a3be8c',
      section:       '#81a1c1',
      bullet:        '#88c0d0',
      'title.function': '#88c0d0',
      'title.class':    '#8fbcbb',
    }
  }
};

/* ── Colour Palettes ─────────────────────────────────────── */

const PALETTE_NONE = 'none';

const ColorPalettes = {
  syntax: {
    label: 'Syntax',
    background: '#272822',
    swatches: ['#f92672', '#66d9ef', '#a6e22e', '#e6db74', '#ae81ff', '#f8f8f2'],
  },
  cold: {
    label: 'Cold',
    background: '#0a0e1a',
    swatches: ['#4fc3f7', '#81d4fa', '#0288d1', '#b3e5fc', '#e1f5fe', '#4dd0e1'],
  },
  warm: {
    label: 'Warm',
    background: '#1a0f0a',
    swatches: ['#ff8a65', '#ffab91', '#ff5722', '#ffccbc', '#fbe9e7', '#ff7043'],
  },
  hot: {
    label: 'Hot',
    background: '#1a0a0a',
    swatches: ['#ff1744', '#ff5252', '#ff8a80', '#ffeb3b', '#ff6d00', '#d50000'],
  },
  neutral: {
    label: 'Neutral',
    background: '#1c1c1e',
    swatches: ['#bdbdbd', '#9e9e9e', '#757575', '#e0e0e0', '#f5f5f5', '#616161'],
  },
  natural: {
    label: 'Natural',
    background: '#0f1a0a',
    swatches: ['#66bb6a', '#a5d6a7', '#33691e', '#c8e6c9', '#dcedc8', '#8bc34a'],
  },
  neon: {
    label: 'Neon',
    background: '#0a0a00',
    swatches: ['#39ff14', '#ccff00', '#ffff00', '#76ff03', '#b2ff59', '#eeff41'],
  },
  cyberpunk: {
    label: 'Cyber Punk',
    background: '#0d0221',
    swatches: ['#ff00ff', '#00ffff', '#ff6ec7', '#7b2dff', '#39ff14', '#ffff00'],
  },
};

/**
 * Resolve a highlight.js scope string to a hex color for the given theme.
 * Scopes can be dotted (e.g. "title.function") — we try exact match first,
 * then fall back to the base scope, then to defaultColor.
 */
function resolveColor(theme, scope) {
  const t = Themes[theme];
  if (!t) return '#777777';
  if (t.colors[scope]) return t.colors[scope];
  const base = scope.split('.')[0];
  if (t.colors[base]) return t.colors[base];
  return t.defaultColor;
}

/**
 * Resolve a color from a colour palette by hashing the scope string
 * to pick a swatch deterministically.
 */
function resolvePaletteColor(paletteName, scope) {
  const p = ColorPalettes[paletteName];
  if (!p) return '#777777';
  if (!scope) return p.swatches[0];
  let hash = 0;
  for (let i = 0; i < scope.length; i++) {
    hash = ((hash << 5) - hash + scope.charCodeAt(i)) | 0;
  }
  return p.swatches[Math.abs(hash) % p.swatches.length];
}

export { Themes, ColorPalettes, PALETTE_NONE, resolveColor, resolvePaletteColor };
