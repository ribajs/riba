module.exports = {
  "presets": [
    [
      "@babel/typescript", {
        "allExtensions": true
      }
    ],
    [
      "@babel/preset-env", {
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "corejs": 2
      },
    ],
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "array-includes"
  ]
};