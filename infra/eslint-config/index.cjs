/* eslint-disable no-undef */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier", // Uses prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // "plugin:import/recommended",
    // "plugin:import/typescript"
  ],
  rules: {
    // disables the rule for all files
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // --- START trailing commas
    // Wait until trailingComma for type parameters / generics works, see https://github.com/babel/babel/pull/14135
    "prettier/prettier": ["warn", { tabWidth: 2 }],
    "comma-dangle": "off", // We must disable the base rule as it can report incorrect errors
    "@typescript-eslint/comma-dangle": [
      "off",
      // {
      //   generics: "always", // Required in JSX
      //   enums: "never",
      //   tuples: "never",
      //   arrays: "never",
      //   objects: "never",
      //   imports: "never",
      //   exports: "never",
      //   functions: "never",
      // }
    ],
    // --- END trailing commas

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
    // 'import/extensions': ['error', 'ignorePackages', {
    //   js: 'ignorePackages',
    //   cjs: 'ignorePackages',
    //   mjs: 'ignorePackages',
    //   jsx: 'ignorePackages'
    // }],
    // Do not throw error on .js extension for .ts files
    // 'import/no-unresolved': 'off'
    "@typescript-eslint/no-empty-object-type": "off",
  },
  ignorePatterns: ["**/*.spec.ts", "node_modules/"],
  parserOptions: {
    sourceType: "module",
  },
};
