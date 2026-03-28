import { defineConfig } from 'vite'
import dns from 'dns'
import { resolve } from 'path'
import { docPagesPlugin } from './vite-plugin-doc-pages.js'
import { demoAssetsPlugin } from './vite-plugin-demo-assets.js'

const __dirname = new URL('.', import.meta.url).pathname;
dns.setDefaultResultOrder('verbatim')

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
      demoAssetsPlugin({
        demosDir: resolve(basedir, 'ts/demos'),
      }),
    ],
  }
})
