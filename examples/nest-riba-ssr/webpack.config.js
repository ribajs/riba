/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProduction =
  typeof process.env.NODE_ENV !== 'undefined' &&
  process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';
// const config = require('config');

// See https://docs.nestjs.com/recipes/hot-reload#configuration-1
module.exports = async (env) => {
  env.development =
    (env && env.development) || process.env.NODE_ENV === 'development';

  if (typeof env.production === 'boolean') {
    env.development = !env.production;
  }
  env.production = !env.development;

  return {
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    optimization: {
      minimize: false,
      // We do not split the bundle on server
      splitChunks: {},
    },
    target: 'node',
    mode,
    devtool,
    externals: /node_modules/,
    // externals: [
    //   nodeExternals({
    //     allowlist: ['webpack/hot/poll?100'],
    //   }),
    // ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx}',
        },
      }),
      new webpack.DefinePlugin({
        // CONFIG: JSON.stringify(config), // https://www.npmjs.com/package/config
        ENV: JSON.stringify(env),
      }),
    ],
    output: {
      path: path.join(__dirname, 'dist/main'),
      filename: 'main.js',
    },
  };
};
