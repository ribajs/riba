module.exports = {
  "presets": [
    "@babel/typescript",
    [
      "@babel/preset-env", {
        "targets": {
          "ie": "11",
          "safari": "10",
          "chrome": "52",
          "edge": "16",
          "firefox": "59"
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
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-syntax-dynamic-import",
    "array-includes"
  ]
};
