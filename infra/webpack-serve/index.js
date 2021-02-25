#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const WDS = require("webpack-dev-server");
const pkgDir = require("pkg-dir");
const getPort = require("get-port");
const rootPath = pkgDir.sync(process.cwd());
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const env = {
  production: argv.env === 'production',
  development: argv.env === 'development',
}

const start = async () => {
  let webpackConfig;
  try {
    const webpackPath = path.resolve(rootPath, "webpack.config.js");
    webpackConfig = await require(webpackPath)({
      production: env.production,
      development: env.development,
    });
    console.debug("Use webpack config from " + webpackPath);
  } catch (error) {
    console.warn(error);
    webpackConfig = await require("@ribajs/webpack-config")({
      template: "local",
    })(env);
    console.debug("Use default webpack config from @ribajs/webpack-config");
  }

  WDS.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer);

  const compiler = webpack(webpackConfig);
  const devServer = new WDS(compiler, webpackConfig.devServer);

  webpackConfig.devServer.host = webpackConfig.devServer.host || "0.0.0.0";
  webpackConfig.devServer.port = await getPort({
    port: webpackConfig.devServer.port || 8080,
  });

  devServer.listen(
    webpackConfig.devServer.port,
    webpackConfig.devServer.host,
    (err) => {
      console.error(err);
    }
  );

  console.log(
    `webpack-serve listening on http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}\n`
  );
};

module.exports = start();
