/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const ribaWebpackConfig = require("@ribajs/webpack-config");
const { resolve } = require("path");

const source = resolve(__dirname);
const assets = resolve(source, "assets");
const scripts = resolve(source, "scripts");
const styles = resolve(source, "styles");
const mainTs = resolve(scripts, "main.ts");
const mainScss = resolve(styles, "main.scss");

const config = {
  template: "local",
  copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: true,
    foldername: assets,
  },
  tsSourceDir: scripts,
  scssSourceDir: styles,
  tsIndexPath: mainTs,
  scssIndexPath: mainScss,
  output: {
    path: assets,
    filename: "[name].bundle.js",
  },
};

const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;
