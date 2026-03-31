import { defineConfig } from 'vite'
import dns from 'dns'
import { resolve } from 'path'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { docPagesPlugin } from './vite-plugin-doc-pages.js'

const __dirname = new URL('.', import.meta.url).pathname;
dns.setDefaultResultOrder('verbatim')

/**
 * Vite plugin to copy iconset SVGs into the production build output.
 * In dev mode, the resolve.alias handles serving them.
 */
function iconsetAssetsPlugin() {
  const svgDir = resolve(__dirname, '../../packages/iconset/src/svg');
  return {
    name: 'vite-plugin-iconset-assets',
    generateBundle() {
      if (!existsSync(svgDir)) return;
      for (const file of readdirSync(svgDir)) {
        if (file.endsWith('.svg')) {
          this.emitFile({
            type: 'asset',
            fileName: `iconset/${file}`,
            source: readFileSync(resolve(svgDir, file)),
          });
        }
      }
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const basedir = resolve(__dirname, 'src');
  const base = process.env.VITE_BASE_PATH ?? './';
  return {
    mode,
    base,
    root: basedir,
    assetsInclude: ['**/*.svg'],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['import'],
        },
      },
    },
    resolve: {
      alias: {
        '/iconset': resolve(__dirname, '../../packages/iconset/src/svg'),
      },
    },
    server: {
      fs: {
        allow: [resolve(__dirname, '../..')],
      },
    },
    build: {
      outDir: '../_site',
      emptyOutDir: true,
    },
    plugins: [
      docPagesPlugin({
        pagesDir: resolve(basedir, 'views/pages'),
        basedir: resolve(basedir, 'views'),
        contentDir: resolve(basedir, 'content'),
      }),
      iconsetAssetsPlugin(),
    ],
  }
})
