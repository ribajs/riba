// https://github.com/Microsoft/TypeScript-Babel-Starter
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var entry = require('webpack-glob-entry')

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: false,
          mangle: false,
          output: {
            beautify: true,
            comments: false,
          }
        }
      })
    ]
  },
  entry: entry('./src/*/*.spec.ts'),
  devtool: 'inline-source-map',
  mode: 'development', // production | development
  output: {
    path: path.resolve(__dirname, 'spec'),
    filename: 'riba-core-tests.js',
    library: 'riba-core',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  // this modules will be ignored and not compiled because they are extern loaded
  externals: {
    'mocha': 'mocha'
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