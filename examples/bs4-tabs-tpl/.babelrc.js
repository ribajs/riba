module.exports = {
  "presets": [
    [
      "@babel/typescript", {
        "allExtensions": true
      }
    ],
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
      },
    ],
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "array-includes"
  ]
};
