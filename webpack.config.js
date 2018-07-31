// https://github.com/Microsoft/TypeScript-Babel-Starter
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: true,
          mangle: {
            safari10: true, // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/92
          },
          output: {
            beautify: false,
            comments: false,
          }
        }
      })
    ]
  },
  entry: {
    tinybind: './src/browser.ts'
  },
  mode: 'production', // production | development
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'tinybind',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  }
};