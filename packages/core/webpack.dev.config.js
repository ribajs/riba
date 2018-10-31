// https://github.com/Microsoft/TypeScript-Babel-Starter
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
  entry: {
    riba: './src/browser.ts'
  },
  devtool: 'inline-source-map',
  mode: 'development', // production | development
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'riba',
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