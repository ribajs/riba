// https://github.com/Microsoft/TypeScript-Babel-Starter
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { DuplicatesPlugin } = require("inspectpack/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * output errors on watch
 * @see https://stackoverflow.com/a/39142422/1465919
 */
class ConsoleNotifierPlugin {
  compilationDone(stats) {
    const log = (error) => {
      console.error(error.error ? error.error : error);
    };
    stats.compilation.errors.forEach(log);
  }

  apply(compiler) {
    compiler.plugin('done', this.compilationDone.bind(this));
  }
}

module.exports = env => {
  return {
    optimization: {
      minimizer: [new TerserPlugin({
        sourceMap: !env.production,
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
      splitChunks: {
        automaticNameDelimiter: '.',
        chunks: 'all'
      },
    },
    // Change to your "entry-point".
    entry: ['./src/main.scss', './src/main.ts'],
    devtool: env.production ? '' : 'inline-source-map',
    mode: env.production ? 'production' : 'development',
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist/')
    },
    resolve: {
      modules: [ 'node_modules', 'src/modules' ],
      extensions: ['.ts', '.tsx', '.js', '.json'],
      symlinks: true
    },
    devServer: {
      host: '0.0.0.0',
      contentBase: './src',
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
        // pug templates
        {
          test: /\.pug$/,
          use: [ {
            loader: 'pug-loader',
            options: {
              minimize: true
            }
          }]
        },
				{
					test: /.scss$/,
					use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // only enable hot in development
                hmr: process.env.NODE_ENV === 'development',
                // if hmr does not work, this is a forceful method.
                reloadAll: true,
              },
            },
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader'
						},
						{
							loader: 'sass-loader'
						}
					]
				}
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new ConsoleNotifierPlugin(),
      new DuplicatesPlugin(),
    ],
  };
};
