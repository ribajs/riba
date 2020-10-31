#!/usr/bin/env node
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const WDS = require("webpack-dev-server");
const pkgDir = require('pkg-dir');
const getPort = require('get-port');
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

  webpackConfig.devServer.host = webpackConfig.devServer.host || "0.0.0.0";
  webpackConfig.devServer.port = await getPort({
    port: webpackConfig.devServer.port || 8080,
  })

  devServer.listen(
    webpackConfig.devServer.port,
    webpackConfig.devServer.host,
    (err) => {
      // noop
    }
  );

  console.log(`webpack-serve listening on http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}\n`);
};

module.exports = start();
