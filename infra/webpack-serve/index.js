#!/usr/bin/env node
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const WDS = require("webpack-dev-server");
const pkgDir = require('pkg-dir');
const rootPath = pkgDir.sync(process.cwd());

console.debug('rootPath', rootPath)

const start = async () => {
  let webpackConfig;
  try {
    webpackConfig = await require(path.resolve(rootPath, "webpack.config.js"))({
      production: false,
      development: true,
    });
    console.debug("Use webpack config");
  } catch (error) {
    console.warn(error);
    webpackConfig = await require("@ribajs/webpack-config")({
      template: "local",
    })({
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
