/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { Config } from "./types";
import webpack from "webpack";

export const getDependencies = (config: Partial<Config> = {}) => {
  // Modules you can overwrite
  config.DefinePlugin = config.DefinePlugin || webpack.DefinePlugin;
  config.TerserPlugin = config.TerserPlugin || require("terser-webpack-plugin");

  // https://github.com/nuxt-contrib/webpackbar
  config.WebpackbarPlugin = config.WebpackbarPlugin || require("webpackbar");

  config.ForkTsCheckerPlugin =
    config.ForkTsCheckerPlugin || require("fork-ts-checker-webpack-plugin");

  config.CssExtractPlugin =
    config.CssExtractPlugin || require("mini-css-extract-plugin");

  config.babelLoaderPath =
    config.babelLoaderPath || require.resolve("babel-loader");

  config.htmlLoaderPath =
    config.htmlLoaderPath || require.resolve("html-loader");

  config.markdownLoaderPath =
    config.markdownLoaderPath || require.resolve("markdown-loader");

  config.fileLoaderPath =
    config.fileLoaderPath || require.resolve("file-loader");

  config.pugLoaderPath = config.pugLoaderPath || require.resolve("pug-loader");

  config.cssLoaderPath = config.cssLoaderPath || require.resolve("css-loader");
  config.postcssLoaderPath =
    config.postcssLoaderPath || require.resolve("postcss-loader");

  config.sassLoaderPath =
    config.sassLoaderPath || require.resolve("sass-loader");

  // Graphql loader https://www.npmjs.com/package/@graphql-tools/webpack-loader
  config.gqlLoaderPath =
    config.gqlLoaderPath ||
    require.resolve("@graphql-tools/webpack-loader") ||
    require.resolve("raw-loader");

  // https://github.com/webpack-contrib/copy-webpack-plugin
  if (config.copyAssets && config.copyAssets.enable === true) {
    config.CopyPlugin = config.CopyPlugin || require("copy-webpack-plugin");
  }
  if (config.detectDuplicates === true) {
    config.DuplicatesPlugin =
      config.DuplicatesPlugin || require("inspectpack/plugin").DuplicatesPlugin;
  }

  switch (config.template?.toLowerCase()) {
    case "local":
      if (Array.isArray(config.htmlTemplatePaths)) {
        config.HtmlWebpackPlugin =
          config.HtmlWebpackPlugin || require("html-webpack-plugin");
      }
      break;
    case "ssr":
      config.nodeExternalsPlugin =
        config.nodeExternalsPlugin || require("webpack-node-externals");
      break;
  }

  return config;
};
