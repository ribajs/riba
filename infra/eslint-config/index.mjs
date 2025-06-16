/* eslint-disable no-undef */
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import parserTypescript from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  // Ignore patterns (Flat Config ignores object)
  {
    ignores: ["**/*.spec.ts", "node_modules/"]
  },
  // TypeScript/TSX config
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // project: "./tsconfig.json", // Uncomment if you want type-aware linting
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": ["warn", { tabWidth: 2 }],
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": ["off"],
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  // JS/JSX config
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: { jsx: true },
    },
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      "prettier/prettier": ["warn", { tabWidth: 2 }],
      "comma-dangle": "off",
    },
  },
];
