/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const RibaWebpackConfigurator = require("@ribajs/webpack-config");
const pkgDir = require("pkg-dir");
const path = require("path");

const RibaWebpackConfig = async (env = {}) => {
  const rootPath = await pkgDir(__dirname);
  const ribaWebpackConfig = RibaWebpackConfigurator({
    template: "local",
    entry: {
      renderer: [
        path.resolve(rootPath, "src/scss/renderer.scss"),
        path.resolve(rootPath, "src/ts/renderer/renderer.ts"),
      ],
    },
    output: {
      path: path.resolve(rootPath, "dist/renderer"),
      filename: "renderer.js",
      publicPath: "/",
    },
    // We do not split the bundle on electron
    splitChunks: {},
    // TODO resolve assets with webpack or https://webpack.electron.build/using-static-assets
    copyAssets: {
      enable: true,
      iconset: true,
      foldername: "dist/renderer",
    },
  })(env);

  ribaWebpackConfig.devServer = {
    host: "localhost",
    port: 3000,
    contentBase: "./src",
    hot: true,
    inline: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  return ribaWebpackConfig;
};

module.exports = RibaWebpackConfig;
