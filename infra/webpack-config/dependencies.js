/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const webpack = require("webpack");

module.exports.getDependencies = (config = {}) => {
  // Modules you can overwrite
  config.DefinePlugin = config.DefinePlugin || webpack.DefinePlugin;
  config.TerserPlugin = config.TerserPlugin || require("terser-webpack-plugin");
  config.ForkTsCheckerPlugin =
    config.ForkTsCheckerPlugin || require("fork-ts-checker-webpack-plugin");
  config.CssExtractPlugin =
    config.CssExtractPlugin || require("mini-css-extract-plugin");
  config.babelLoaderPath =
    config.babelLoaderPath || require.resolve("babel-loader");
  config.htmlLoaderPath =
    config.htmlLoaderPath || require.resolve("html-loader");
  config.fileLoaderPath =
    config.fileLoaderPath || require.resolve("file-loader");
  config.fileLoaderPath =
    config.fileLoaderPath || require.resolve("file-loader");
  config.pugLoaderPath = config.pugLoaderPath || require.resolve("pug-loader");

  config.cssLoaderPath = config.cssLoaderPath || require.resolve("css-loader");
  config.postcssLoaderPath =
    config.postcssLoaderPath || require.resolve("postcss-loader");
  config.sassLoaderPath =
    config.sassLoaderPath || require.resolve("sass-loader");
  // Use dart-sass by default for yarn 2 pnp support, see: https://github.com/webpack-contrib/sass-loader/issues/802
  config.styles.SassImplementation =
    config.styles.SassImplementation || require("sass");

  if (
    config.copyAssets?.enable === true &&
    config.copyPluginConfig?.patterns?.length
  ) {
    // https://github.com/webpack-contrib/copy-webpack-plugin
    config.CopyPlugin = config.CopyPlugin || require("copy-webpack-plugin");
  }

  if (config.detectDuplicates === true) {
    config.DuplicatesPlugin =
      config.DuplicatesPlugin || require("inspectpack/plugin").DuplicatesPlugin;
  }

  switch (config.template.toLowerCase()) {
    case "local":
      if (config.htmlIndexPath) {
        config.HtmlWebpackPlugin =
          config.HtmlWebpackPlugin || require("html-webpack-plugin");
      }
      break;
  }

  return config;
};
