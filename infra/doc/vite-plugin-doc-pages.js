import { readFileSync, mkdirSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import pug from 'pug';
import { marked } from 'marked';
import Prism from 'prismjs';

// Load additional Prism languages
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-scss.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-pug.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @param {string} str */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Load YAML file from content dir. Returns empty object if file missing.
 * @param {string} contentDir
 * @param {string} name
 * @returns {Record<string, unknown>}
 */
function loadYaml(contentDir, name) {
  const filePath = join(contentDir, name);
  if (!existsSync(filePath)) return {};
  return yaml.load(readFileSync(filePath, 'utf8')) || {};
}

/**
 * Pug filters for markdown-it and prismjs includes.
 * These match the existing template syntax:
 *   include:markdown-it(html) ../../doc/guide/install.md
 *   include:prismjs(language='typescript') ../../demos/...
 */
const pugFilters = {
  'markdown-it': (text, options) => {
    return marked.parse(text, { async: false });
  },
  'prismjs': (text, options) => {
    const lang = options.language || 'markup';
    const grammar = Prism.languages[lang] || Prism.languages.markup;
    const highlighted = Prism.highlight(text, grammar, lang);
    return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
  },
  'escape-html': (text, options) => {
    return escapeHtml(text);
  },
};

/**
 * Load all content and build Pug locals.
 * @param {string} contentDir
 * @param {string} projectRoot
 */
function loadLocals(contentDir, projectRoot) {
  const site = loadYaml(contentDir, 'site.yml');
  const navigation = loadYaml(contentDir, 'navigation.yml');

  // Load icon list from @ribajs/iconset if available
  let icons = [];
  try {
    const iconsetPath = require.resolve('@ribajs/iconset/dist/svg.json', { paths: [projectRoot] });
    icons = JSON.parse(readFileSync(iconsetPath, 'utf8'));
  } catch {
    // iconset not available, skip
  }

  // Load riba package version
  let riba = {};
  try {
    riba = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf8'));
  } catch {
    // fallback
  }

  return {
    site,
    navigation,
    icons,
    riba,
  };
}

/**
 * Discover all .pug files in pagesDir.
 * @param {string} pagesDir
 * @returns {Record<string, string>} baseName -> absolute path
 */
function discoverPages(pagesDir) {
  if (!existsSync(pagesDir)) return {};
  const entries = readdirSync(pagesDir, { withFileTypes: true });
  const pages = {};
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.pug')) {
      const baseName = entry.name.replace(/\.pug$/, '');
      pages[baseName] = join(pagesDir, entry.name);
    }
  }
  return pages;
}

/**
 * Compile all page templates and write HTML to compiledDir.
 * @returns {Record<string, string>} rollupOptions.input entries
 */
function compilePages(options) {
  const { pagesDir, basedir, contentDir, compiledDir, root, projectRoot } = options;
  const pages = discoverPages(pagesDir);
  const locals = {
    ...loadLocals(contentDir, projectRoot),
    basePath: compiledDir === root ? '.' : '..',
  };

  mkdirSync(compiledDir, { recursive: true });

  const input = {};
  for (const [baseName, pugPath] of Object.entries(pages)) {
    const compileFn = pug.compileFile(pugPath, {
      basedir,
      filename: pugPath,
      doctype: 'html',
      filters: pugFilters,
    });
    const html = compileFn(locals);
    const fileName = baseName === 'index' ? 'index.html' : `${baseName}.html`;
    const outPath = join(compiledDir, fileName);
    writeFileSync(outPath, html, 'utf8');
    input[baseName] = outPath;
  }
  return input;
}

/**
 * Vite plugin: compile Pug pages to HTML and register them as multi-page entries.
 * Adapted from das-frittierwerk/vite-plugin-pug-pages.js with doc-specific extensions:
 * - Custom Pug filters for markdown-it and prismjs
 * - Loads icons and riba version as Pug locals
 * - Watches doc/ directory for markdown changes
 */
export function docPagesPlugin(pluginOptions = {}) {
  let resolvedConfig;
  let options;

  return {
    name: 'vite-plugin-doc-pages',
    enforce: 'pre',

    config(config) {
      const projectRoot = resolve(__dirname, '../..');
      const root = config.root ?? resolve(__dirname, 'src');
      const pagesDir = pluginOptions.pagesDir ?? resolve(root, 'views', 'pages');
      const basedir = pluginOptions.basedir ?? resolve(root, 'views');
      const contentDir = pluginOptions.contentDir ?? resolve(root, 'content');
      const compiledDir = pluginOptions.compiledDir ?? root;

      options = { pagesDir, basedir, contentDir, compiledDir, root, projectRoot };

      const input = compilePages(options);
      if (Object.keys(input).length === 0) {
        return {};
      }
      return {
        build: {
          rollupOptions: { input },
        },
      };
    },

    configResolved(config) {
      resolvedConfig = config;
    },

    configureServer(server) {
      const { pagesDir, contentDir, basedir, root } = options;
      const docDir = resolve(root, 'doc');
      const watchPaths = [
        pagesDir,
        contentDir,
        resolve(basedir, 'layouts'),
        resolve(basedir, 'partials'),
        docDir,
      ];

      const recompile = () => {
        try {
          compilePages(options);
          server.ws.send({ type: 'full-reload', path: '*' });
        } catch (err) {
          console.error('[vite-plugin-doc-pages]', err);
        }
      };

      for (const watchPath of watchPaths) {
        if (existsSync(watchPath)) {
          server.watcher.add(watchPath);
        }
      }

      server.watcher.on('change', (changedPath) => {
        if (watchPaths.some((dir) => changedPath.startsWith(dir))) {
          recompile();
        }
      });
    },
  };
}
