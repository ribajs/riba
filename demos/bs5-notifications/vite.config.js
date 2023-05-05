import { defineConfig } from 'vite'
import { resolve } from 'path'
import pugRollupPlugin from 'rollup-plugin-pug';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    mode,
    root: 'src',
    assetsInclude: ['**/*.svg'],
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          'main': resolve(__dirname, 'src/index.html'),
        },
        plugins: [
          pugRollupPlugin(),
        ]
      }
    }
  }
});