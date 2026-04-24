/**
 * tokenizer.js — Extracts a flat list of {scope, text} tokens from source code
 * using highlight.js, mirroring the (token_type, token_string) pairs from Pygments.
 */

/**
 * Walk the highlight.js emitter tree and flatten into [{scope, text}].
 * hljs.highlight() returns a result whose _emitter has a tree of nodes.
 * Each node is either a string (plain text) or {scope, children[]}.
 */
function flattenTree(node, parentScope) {
  const tokens = [];
  const scope = node.scope || parentScope || '';
  if (node.children) {
    for (const child of node.children) {
      if (typeof child === 'string') {
        tokens.push({ scope, text: child });
      } else {
        tokens.push(...flattenTree(child, child.scope || scope));
      }
    }
  } else if (typeof node === 'string') {
    tokens.push({ scope: parentScope || '', text: node });
  }
  return tokens;
}

/**
 * Tokenize source code. Returns [{scope, text}, ...].
 * @param {string} code — raw source code
 * @param {string} [language] — optional language hint (e.g. 'python', 'javascript')
 */
function tokenize(code, language) {
  let result;
  if (language && language !== 'auto') {
    result = hljs.highlight(code, { language, ignoreIllegals: true });
  } else {
    result = hljs.highlightAuto(code);
  }
  // hljs v11: _emitter is the root TreeNode (has .children directly)
  const root = result._emitter.rootNode || result._emitter;
  const tokens = flattenTree(root, '');
  // Fallback: if tree walking produced nothing, return the whole code unstyled
  if (!tokens.length && code.length) {
    return [{ scope: '', text: code }];
  }
  return tokens;
}

/**
 * Detect language from filename extension.
 */
function detectLanguage(filename) {
  const ext = (filename.split('.').pop() || '').toLowerCase();
  const map = {
    js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'javascript',
    ts: 'typescript', tsx: 'typescript',
    py: 'python', pyw: 'python',
    rb: 'ruby', rs: 'rust', go: 'go',
    java: 'java', kt: 'kotlin', scala: 'scala',
    c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp',
    cs: 'csharp', swift: 'swift', m: 'objectivec',
    php: 'php', pl: 'perl', pm: 'perl',
    sh: 'bash', bash: 'bash', zsh: 'bash',
    sql: 'sql', r: 'r', lua: 'lua',
    html: 'xml', htm: 'xml', xml: 'xml', svg: 'xml',
    css: 'css', scss: 'scss', less: 'less',
    json: 'json', yaml: 'yaml', yml: 'yaml', toml: 'ini',
    md: 'markdown', tf: 'hcl',
    dockerfile: 'dockerfile',
  };
  return map[ext] || 'auto';
}

export { tokenize, detectLanguage };
