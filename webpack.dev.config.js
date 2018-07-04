// https://github.com/Microsoft/TypeScript-Babel-Starter
var path = require('path');

module.exports = {
    entry: {
      tinybind: './src/browser.ts'
    },
    devtool: 'inline-source-map',
    mode: 'development', // production | development
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
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