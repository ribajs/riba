/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const WDS = require("webpack-dev-server");
const rootPath = process.cwd();

const start = () => {
  let webpackConfig;
  try {
    webpackConfig = require(path.resolve(rootPath, "webpack.config.js"))({
      production: false,
      development: true,
    });
    console.debug("Use webpack config");
  } catch (error) {
    webpackConfig = require("./index")({ template: "local" })({
      production: false,
      development: true,
    });
    console.debug("Use default local config");
  }
  // console.debug(webpackConfig);

  WDS.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer);

  const compiler = webpack(webpackConfig);
  const devServer = new WDS(compiler, webpackConfig.devServer);

  devServer.listen(
    webpackConfig.devServer.port || 8080,
    webpackConfig.devServer.host || "0.0.0.0",
    (err) => {
      // noop
    }
  );
};

module.exports = start();
