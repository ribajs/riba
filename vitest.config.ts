import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["packages/*/src/**/*.spec.ts", "infra/*/src/**/*.spec.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/deno/**"],
    globals: true,
  },
  resolve: {
    // Prefer "source" field in package.json so Vitest uses .ts source files
    // instead of compiled .js from dist/ (which may have CJS/ESM mismatch)
    mainFields: ["source", "module", "browser", "main"],
  },
});
