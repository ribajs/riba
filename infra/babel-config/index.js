/* eslint-disable no-undef */
module.exports = {
  presets: [
    // Needed to transpile *.tsx files
    [
      "@babel/preset-react",
      {
        "pragma": "window.jsxCreateElement", // default pragma is React.createElement (only in classic runtime)
        "pragmaFrag": "window.jsxFragment", // default is React.Fragment (only in classic runtime)
        "throwIfNamespace": false, // defaults to true
        "runtime": "classic" // defaults to classic
      }
    ],
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    [
      "@babel/preset-env",
      {
        corejs: 3,
        useBuiltIns: "entry",
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-typescript",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    "@babel/plugin-syntax-top-level-await",
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "array-includes",
  ],
};
