import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    // infra/vite-config is a flat, build-less JS package (no src/), so its spec
    // sits next to index.js and needs the extra flat include.
    include: [
      "packages/*/src/**/*.spec.ts",
      "infra/*/src/**/*.spec.ts",
      "infra/*/*.spec.ts",
      "infra/*/scripts/*.spec.js",
    ],
    exclude: ["**/node_modules/**", "**/dist/**", "**/deno/**"],
    globals: true,
  },
  resolve: {
    // Prefer "source" field in package.json so Vitest uses .ts source files
    // instead of compiled .js from dist/ (which may have CJS/ESM mismatch)
    mainFields: ["source", "module", "browser", "main"],
  },
});
