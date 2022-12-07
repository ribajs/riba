/* eslint-disable @typescript-eslint/no-var-requires */
const ribaWebpackConfig = require("@ribajs/webpack-config");
const webpackConfig = ribaWebpackConfig({
  template: "local",
  copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: true,
    foldername: "dist",
    patterns: [
      {
        from: "*",
        to: "../../dist/assets",
        toType: "dir",
        context: "src/assets",
      },
    ],
  },
});
module.exports = webpackConfig;
