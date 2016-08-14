var webpack = require('webpack');
//options
var minimize = process.argv.indexOf('--x-minimize') !== -1;

var entryKeys = ['rivets'];

var entry = entryKeys.reduce(function (memo, key) {
  memo[key] = './src/export';
  if (minimize) {
    memo[key + '.min'] = './src/export';
  }
  return memo;
}, {});

module.exports = {
  context: __dirname,
  entry: entry,

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'rivets',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/
    })
  ],

  resolve: {
    alias: {sightglass: '../lib/sightglass.js'},
    extensions: ['', '.js']
  }
};