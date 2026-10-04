import { buildLocales, resolveRoots } from "./scripts/build-locales.js";

/**
 * Emits the translation catalogs as `locales/<lang>.json` next to the pages
 * (build) and serves them from memory (dev server). The catalogs are built from
 * the sources on every request or build, so editing a README.<lang>.md, a
 * *.<lang>.md page or a locales yml needs no extra step.
 * @returns {import('vite').Plugin}
 */
export function docLocalesPlugin() {
  const roots = resolveRoots();
  return {
    name: "vite-plugin-doc-locales",

    generateBundle() {
      for (const [lang, tree] of Object.entries(buildLocales(roots))) {
        this.emitFile({
          type: "asset",
          fileName: `locales/${lang}.json`,
          source: `${JSON.stringify(tree)}\n`,
        });
      }
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = /\/locales\/([A-Za-z0-9-]+)\.json(?:\?.*)?$/.exec(
          req.url || "",
        );
        const tree = match && buildLocales(roots)[match[1]];
        if (!tree) return next();
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(tree));
      });
    },
  };
}
