/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const ribaWebpackConfig = require("@ribajs/webpack-config");
const { resolve } = require("path");

const source = resolve(__dirname);
const tsSourceDir = resolve(source, "scripts");
const assets = resolve(source, "assets");
const outputPath = resolve(assets, "ssr");
const tsIndexPath = resolve(tsSourceDir, "ssr.ts");

const config = {
  template: "ssr",
  tsSourceDir,
  tsIndexPath,
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
  },
};

const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;
