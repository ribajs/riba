/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require("webpack");
const WDS = require("webpack-dev-server");

const ribaWebpackConfig = require("./index");

module.exports = (config = {}) => {
  const webpackConfig = ribaWebpackConfig(config)({
    production: false,
    development: true,
  });
  WDS.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer);

  const compiler = webpack(webpackConfig);
  const devServer = new WDS(compiler, webpackConfig.devServer);

  devServer.listen(
    webpackConfig.devServer.port,
    webpackConfig.devServer.host,
    (err) => {
      // noop
    }
  );
};
