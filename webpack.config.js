var webpack = require('webpack');

module.exports = function(env) {
    var entry = {
      rivets: './src/export.js'
    }

    if (env.minimize) {
      entry['rivets.min'] = './src/export.js'
    }

   return {
    context: __dirname,
    entry: entry,

    output: {
      path: __dirname + '/dist',
      filename: '[name].js',
      library: 'rivets',
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', {'loose': true}]
              ]
            }
          }]
        }
      ]
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ],

    resolve: {
      extensions: ['.js']
    }
  }
};
