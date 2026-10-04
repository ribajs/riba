import { defineConfig } from 'vite'
import dns from 'dns'
import { existsSync } from 'fs'
import { cp } from 'fs/promises'
import { isAbsolute, join, resolve } from 'path'
import { ribaIconsetPlugin } from '@ribajs/vite-config'
import { docPagesPlugin } from './vite-plugin-doc-pages.js'
import { docLocalesPlugin } from './vite-plugin-doc-locales.js'

const __dirname = new URL('.', import.meta.url).pathname;
const demosDir = resolve(__dirname, '_demos');
dns.setDefaultResultOrder('verbatim')

/**
 * Copies the demo builds from _demos/ to <outDir>/demos/ after the bundle was
 * written. The demos are built outside the Vite root (see scripts/build-demos.js)
 * and `build.emptyOutDir` wipes _site/ before bundling, so the copy has to run
 * in writeBundle. manifest.json comes along as _site/demos/manifest.json on
 * purpose: it is the registry the doc pages read as the `demos` Pug local.
 *
 * vite-plugin-static-copy is deliberately not used here: it resolves every src
 * against config.root and only strips the leading "../" segments, so the demo
 * builds would land in _site/demos/_demos/<id>/ instead of _site/demos/<id>/.
 *
 * @param {string} srcDir - absolute path of the built demos
 * @returns {import('vite').Plugin}
 */
function demoCopyPlugin(srcDir) {
  let outDir = ''
  return {
    name: 'riba-demo-copy',
    apply: 'build',
    configResolved(config) {
      const { build } = config
      outDir = isAbsolute(build.outDir)
        ? build.outDir
        : resolve(config.root, build.outDir)
    },
    async writeBundle() {
      if (!outDir || !existsSync(srcDir)) return
      const dest = join(outDir, 'demos')
      await cp(srcDir, dest, { recursive: true, force: true })
      console.log(`[riba-demo-copy] ${srcDir} -> ${dest}`)
    },
  }
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
      docLocalesPlugin(),
      ribaIconsetPlugin({ baseUrl: '/iconset', outputDir: 'iconset' }),
      // Only registered when _demos/ exists, so a doc build without a previous
      // `yarn build:demos` (fresh checkout, CI order) still succeeds.
      ...(existsSync(demosDir) ? [demoCopyPlugin(demosDir)] : []),
    ],
  }
})
