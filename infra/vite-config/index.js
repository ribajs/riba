import { defineConfig } from "vite";
import pugRollupPlugin from "rollup-plugin-pug";
import { resolve, dirname } from "path";
import { existsSync } from "fs";
import { createRequire } from "module";
import { ribaBasePathPlugin } from "./base-path-plugin.js";

const require = createRequire(import.meta.url);

/**
 * Resolves the path to the built @ribajs/iconset SVG directory (dist/svg).
 * Requires the iconset package to have been built first.
 */
function resolveIconsetPath() {
  try {
    const iconsetPkg = require.resolve("@ribajs/iconset/package.json");
    return resolve(dirname(iconsetPkg), "dist", "svg");
  } catch {
    return null;
  }
}

/**
 * Vite plugin that serves @ribajs/iconset SVGs during dev and copies them
 * into the build output.
 *
 * @param {Object} [options]
 * @param {string} [options.baseUrl] - URL prefix for dev + build output (default: "/iconset/svg")
 * @param {string} [options.outputDir] - Output directory inside the build relative to assets root (default: "iconset/svg")
 */
export function ribaIconsetPlugin(options = {}) {
  const { baseUrl = "/iconset/svg", outputDir = "iconset/svg" } = options;
  const iconsetSvgPath = resolveIconsetPath();
  const iconsetAvailable = iconsetSvgPath && existsSync(iconsetSvgPath);
  let warned = false;

  function warnMissingOnce() {
    if (!warned) {
      warned = true;
      console.warn(
        "[@ribajs/vite-config] @ribajs/iconset dist/svg not found — " +
          "runtime icon URLs (/iconset/svg/*) will not be served. " +
          "Run `yarn workspace @ribajs/iconset build` to enable them.",
      );
    }
  }

  return {
    name: "riba-iconset",

    configureServer(server) {
      if (!iconsetAvailable) {
        warnMissingOnce();
        return;
      }

      server.middlewares.use(baseUrl, (req, res, next) => {
        const filePath = resolve(iconsetSvgPath, req.url.replace(/^\//, ""));
        if (existsSync(filePath)) {
          res.setHeader("Content-Type", "image/svg+xml");
          res.setHeader("Cache-Control", "max-age=3600");
          import("fs").then(({ createReadStream }) => {
            createReadStream(filePath).pipe(res);
          });
        } else {
          next();
        }
      });
    },

    async generateBundle() {
      if (!iconsetAvailable) {
        warnMissingOnce();
        return;
      }

      const { readdirSync, readFileSync } = await import("fs");
      const files = readdirSync(iconsetSvgPath);
      for (const file of files) {
        if (file.endsWith(".svg")) {
          this.emitFile({
            type: "asset",
            fileName: `${outputDir}/${file}`,
            source: readFileSync(resolve(iconsetSvgPath, file)),
          });
        }
      }
    },
  };
}

/**
 * Creates a shared Vite configuration for Riba.js demo projects.
 *
 * @param {Object} options
 * @param {string} [options.root] - Root directory (default: 'src')
 * @param {string} [options.outDir] - Output directory relative to root (default: '../dist')
 * @param {Object} [options.input] - Rollup input entries
 * @param {boolean} [options.pug] - Enable pug plugin (default: true)
 * @param {boolean} [options.iconset] - Enable iconset plugin (default: true)
 * @param {boolean} [options.basePathPlugin] - Prefix root-absolute asset paths
 *   in the bundle with the resolved base (default: true). Needed as soon as the
 *   site is served from a sub-path; the plugin itself decides whether it has
 *   anything to do, based on config.base.
 * @param {string} [options.cwd] - Current working directory (default: process.cwd())
 * @returns {import('vite').UserConfig}
 */
export function ribaViteConfig(options = {}) {
  const {
    root = "src",
    outDir = "../dist",
    pug = true,
    iconset = true,
    basePathPlugin = true,
    cwd = process.cwd(),
    input,
  } = options;

  const rollupInput = input || {
    main: resolve(cwd, "src/index.html"),
  };

  const plugins = [];
  if (pug) {
    plugins.push(pugRollupPlugin());
  }
  if (iconset) {
    plugins.push(ribaIconsetPlugin());
  }
  // Last: generateBundle walks the finished bundle, so it sees the pug output as
  // HTML and the assets ribaIconsetPlugin emitted.
  if (basePathPlugin) {
    plugins.push(ribaBasePathPlugin());
  }

  return defineConfig({
    root,
    publicDir: resolve(cwd, "public"),
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
          silenceDeprecations: [
            "import",
            "global-builtin",
            "color-functions",
            "if-function",
          ],
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
