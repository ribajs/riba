/* eslint-disable @typescript-eslint/no-require-imports */
const ribaWebpackConfig = require("@ribajs/webpack-config");
const ICONSET = require("@ribajs/iconset/dist/svg.json");
const webpackConfig = ribaWebpackConfig({
  template: "local",
  define: {
    ICONSET: JSON.stringify(ICONSET),
  },
});
module.exports = webpackConfig;
