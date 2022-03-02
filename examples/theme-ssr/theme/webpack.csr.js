/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const ribaWebpackConfig = require("@ribajs/webpack-config");
const { resolve } = require("path");

const source = resolve(__dirname);
const tsSourceDir = resolve(source, "scripts");
const assets = resolve(source, "assets");
const outputPath = resolve(assets, "csr");
const scssSourceDir = resolve(source, "styles");
const tsIndexPath = resolve(tsSourceDir, "csr.ts");
const scssIndexPath = resolve(scssSourceDir, "main.scss");

const config = {
  template: "local",
  publicPath: outputPath,
  copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: true,
    foldername: assets,
  },
  tsSourceDir,
  scssSourceDir,
  tsIndexPath,
  scssIndexPath,
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
  },
};

const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;
