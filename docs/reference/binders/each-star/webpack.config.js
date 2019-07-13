// https://github.com/Microsoft/TypeScript-Babel-Starter
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: false,
      terserOptions: {
        ecma: undefined,
        warnings: true,
        parse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: false,
        output: {
          comments: false,
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: true,
      },
    })],
  },
  // Change to your "entry-point".
  entry: {
    'app': './main.ts',
  },
  // devtool: 'inline-source-map',
  mode: 'production', // 'development', //'production', 
  output: {
    globalObject: 'self',
    filename: 'index.js',
    path: path.resolve(__dirname),
  },
  resolve: {
    modules: [ 'node_modules', 'src/modules' ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    symlinks: true
  },
  module: {
    rules: [
      // typescript and javascript
      {
        test: /\.(tsx?)|\.(js)$/,
        exclude: [/node_modules\/(?!@ribajs)/, /(bower_components)/],
        loader: 'babel-loader',
      },
      // html templates
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
    ]
  },
  plugins:  []
};