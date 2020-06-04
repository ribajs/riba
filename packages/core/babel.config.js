/* eslint-disable no-undef */
module.exports = {
  presets: [
    [
      "@babel/typescript",
      {
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
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "array-includes",
  ],
};
