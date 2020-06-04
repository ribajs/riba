module.exports = {
  "presets": [
    "@babel/typescript",
    [
      "@babel/preset-env", {
        corejs: 3,
        useBuiltIns: "usage", // or "entry"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        corejs: 3
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-syntax-dynamic-import",
    "array-includes"
  ]
};
