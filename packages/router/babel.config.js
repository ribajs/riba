// iMPORTANT do not use .babelrc: https://github.com/babel/babel/issues/8711#issuecomment-421918023
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
    "@babel/plugin-proposal-optional-chaining",
    "array-includes"
  ]
};
