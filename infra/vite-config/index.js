import { defineConfig } from "vite";
import pugRollupPlugin from "rollup-plugin-pug";
import { resolve } from "path";

/**
 * Creates a shared Vite configuration for Riba.js demo projects.
 *
 * @param {Object} options
 * @param {string} [options.root] - Root directory (default: 'src')
 * @param {string} [options.outDir] - Output directory relative to root (default: '../dist')
 * @param {Object} [options.input] - Rollup input entries (default: { main: resolve(cwd, 'src/index.html') })
 * @param {boolean} [options.pug] - Enable pug plugin (default: true)
 * @param {string} [options.cwd] - Current working directory (default: process.cwd())
 * @returns {import('vite').UserConfig}
 */
export function ribaViteConfig(options = {}) {
  const {
    root = "src",
    outDir = "../dist",
    pug = true,
    cwd = process.cwd(),
    input,
  } = options;

  const rollupInput = input || {
    main: resolve(cwd, "src/index.html"),
  };

  // Pug plugin goes in top-level plugins so it works in both dev and build
  const plugins = [];
  if (pug) {
    plugins.push(pugRollupPlugin());
  }

  return defineConfig({
    root,
    plugins,
    assetsInclude: ["**/*.svg"],
    esbuild: {
      jsxFactory: "jsxCreateElement",
      jsxFragment: "jsxFragment",
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["import"],
        },
      },
    },
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: rollupInput,
      },
    },
  });
}

export default ribaViteConfig;
