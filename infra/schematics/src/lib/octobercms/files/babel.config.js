// iMPORTANT do not use .babelrc: https://github.com/babel/babel/issues/8711#issuecomment-421918023
/* eslint-disable no-undef */
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
        useBuiltIns: "entry",
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "array-includes"
  ],
  "ignore": [
    "**/custom-elements-es5-adapter.js"
  ]
};
