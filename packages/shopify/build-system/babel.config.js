module.exports = {
  presets: [
    [
      "@babel/preset-typescript",
      {
        allExtensions: true,
      },
    ],
    [
      "@babel/preset-env",
      {
        corejs: 3,
        useBuiltIns: "entry",
        targets: {
          ie: "11",
          safari: "10",
          chrome: "52",
          edge: "18",
          firefox: "59",
        },
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
      },
    ],
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "array-includes",
  ],
};
