module.exports = {
  "presets": [
    [
      "@babel/typescript", {
        "allExtensions": true
      }
    ],
    [
      "@babel/preset-env", {
        "targets": {
          "safari": "11.1",
          "chrome": "67",
          "edge": "17",
          "firefox": "60"
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "corejs": 2
      }
    ],
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "array-includes"
  ]
};