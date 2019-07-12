// iMPORTANT do not use .babelrc: https://github.com/babel/babel/issues/8711#issuecomment-421918023
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
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-classes",
    "array-includes"
  ],
  "ignore": [
    "**/custom-elements-es5-adapter.js"
  ]
};