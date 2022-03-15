/* eslint-disable no-undef */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier", // Uses prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // disables the rule for all files
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // --- START trailing commas
    // Wait until trailingComma for type parameters / generics works, see https://github.com/babel/babel/pull/14135
    "prettier/prettier": ["off", { tabWidth: 2, trailingComma: "all" }],
    "comma-dangle": "off", // We must disable the base rule as it can report incorrect errors
    "@typescript-eslint/comma-dangle": [
      "error",
      {
        generics: "always", // Required in JSX
        enums: "never",
        tuples: "never",
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ]
    // --- END trailing commas
  },
  ignorePatterns: ["**/*.spec.ts", "node_modules/"],
  parserOptions: {
    sourceType: "module"
  }
};
