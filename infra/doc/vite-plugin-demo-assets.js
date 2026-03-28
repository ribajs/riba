import { existsSync, readdirSync, statSync, createReadStream, readFileSync } from 'fs';
import { resolve, extname } from 'path';

const MIME_TYPES = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

/**
 * Vite plugin that serves static assets from demo public/ and src/ directories.
 * In standalone demos, Vite serves public/ at / and src/ files at / (since root=src).
 * This plugin replicates that behavior for demos embedded in the doc site.
 *
 * @param {{ demosDir: string }} options
 */
export function demoAssetsPlugin(options = {}) {
  const { demosDir } = options;

  if (!demosDir || !existsSync(demosDir)) {
    return { name: 'vite-plugin-demo-assets' };
  }

  const demos = readdirSync(demosDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  /**
   * Try to find and serve a file from the demo directories.
   * @param {string} relPath - relative URL path (without leading /)
   * @returns {string|null} absolute file path if found
   */
  function findAsset(relPath) {
    for (const demo of demos) {
      // Check public/ directory (mimics Vite publicDir behavior)
      const publicPath = resolve(demosDir, demo, 'public', relPath);
      if (existsSync(publicPath) && statSync(publicPath).isFile()) {
        return publicPath;
      }
      // Check src/ directory (for assets like SVGs at root level in standalone demos)
      const srcPath = resolve(demosDir, demo, 'src', relPath);
      if (existsSync(srcPath) && statSync(srcPath).isFile()) {
        return srcPath;
      }
    }
    return null;
  }

  return {
    name: 'vite-plugin-demo-assets',

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (!url || url === '/') return next();

        const relPath = decodeURIComponent(url.slice(1));
        const filePath = findAsset(relPath);

        if (filePath) {
          const mime = MIME_TYPES[extname(filePath)] || 'application/octet-stream';
          res.setHeader('Content-Type', mime);
          res.setHeader('Cache-Control', 'max-age=3600');
          createReadStream(filePath).pipe(res);
          return;
        }

        next();
      });
    },

    async generateBundle() {
      // Emit demo assets into the build output so production builds also work
      for (const demo of demos) {
        const publicDir = resolve(demosDir, demo, 'public');
        if (existsSync(publicDir)) {
          emitDir(this, publicDir, '');
        }
        // Emit root-level asset files from src/ (e.g. SVGs)
        const srcDir = resolve(demosDir, demo, 'src');
        if (existsSync(srcDir)) {
          for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
            if (entry.isFile() && MIME_TYPES[extname(entry.name)]) {
              this.emitFile({
                type: 'asset',
                fileName: entry.name,
                source: readFileSync(resolve(srcDir, entry.name)),
              });
            }
          }
        }
      }
    },
  };
}

/**
 * Recursively emit all files from a directory into the build output.
 * Skips `iconset/` directories (handled separately by ribaIconsetPlugin).
 */
function emitDir(context, dir, prefix) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = resolve(dir, entry.name);
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (entry.name === 'iconset') continue;
      emitDir(context, entryPath, relPath);
    } else if (entry.isFile()) {
      context.emitFile({
        type: 'asset',
        fileName: relPath,
        source: readFileSync(entryPath),
      });
    }
  }
}
