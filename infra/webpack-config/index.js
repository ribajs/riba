/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const pkgDir = require('pkg-dir');
const rootPath = pkgDir.sync(process.cwd());

var getStyleLoaderRule = (config = {}) => {
  var rule = {
    test: /\.(sa|sc|c)ss$/,
    use: [],
  };

  if (config.styles.extract === true) {
    rule.use.push({
      loader: config.CssExtractPlugin.loader,
      options: {},
    });
  } else {
    config.styleLoaderPath =
      config.cssLoaderPath || require.resolve("style-loader");
    rule.use.push({
      loader: config.styleLoaderPath,
    });
  }

  if (
    config.styles.resolveUrl === "onlyImports" ||
    config.styles.resolveUrl === "notForAssets"
  ) {
    config.styles.resolveUrl = (url /*, resourcePath*/) => {
      // Ignore assets
      if (/\.(gif|jpe?g|tiff?|png|svg|webp|bmp)$/i.test(url)) {
        return false;
      }
      // Enabled for all other file extensions
      return true;
    };
  }

  config.cssLoaderPath = config.cssLoaderPath || require.resolve("css-loader");
  config.postcssLoaderPath =
    config.postcssLoaderPath || require.resolve("postcss-loader");
  config.sassLoaderPath =
    config.sassLoaderPath || require.resolve("sass-loader");
  // Use dart-sass by default for yarn 2 pnp support, see: https://github.com/webpack-contrib/sass-loader/issues/802
  config.styles.SassImplementation =
    config.styles.SassImplementation || require("dart-sass");

  rule.use.push({
    loader: config.cssLoaderPath,
    options: {
      // Set this to true to resolve scss modules like `@import '~bootstrap/scss/bootstrap';`
      // Set this to false if you do not want to resolve font urls like `src: url(webfont_ProximaNova-Sbold.woff) format('woff');`
      url: config.styles.resolveUrl,
    },
  });

  rule.use.push({
    loader: config.postcssLoaderPath,
  });

  rule.use.push({
    loader: config.sassLoaderPath,
    options: {
      webpackImporter: true,
      implementation: config.styles.SassImplementation,
    },
  });
  return rule;
};

module.exports = (config = {}) => {
  // Modules you can overwrite
  config.TerserPlugin = config.TerserPlugin || require("terser-webpack-plugin");
  config.CssExtractPlugin =
    config.CssExtractPlugin || require("mini-css-extract-plugin");
  config.babelLoaderPath =
    config.babelLoaderPath || require.resolve("babel-loader");
  config.htmlLoaderPath =
    config.htmlLoaderPath || require.resolve("html-loader");
  config.fileLoaderPath =
    config.fileLoaderPath || require.resolve("file-loader");
  config.fileLoaderPath =
    config.fileLoaderPath || require.resolve("file-loader");
  config.pugLoaderPath = config.pugLoaderPath || require.resolve("pug-loader");

  return (env = {}) => {
    env.development =
      config.development ||
      (env && env.development) ||
      process.env.NODE_ENV === "development";

    if (typeof env.production === "boolean") {
      env.development = !env.production;
    }
    env.production = !env.development;
    config.production = env.production;
    config.development = env.development;

    config.resolve = config.resolve || {
      symlinks: true,
      alias: {},
      plugins: [],
    };
    config.resolve.extensions = config.resolve.extensions || [".ts", ".tsx", ".js", ".json", ".scss", ".pug", ".html"];
    config.resolve.alias 
    config.resolve.symlinks = true;

    config.plugins = config.plugins || [];

    config.rules = config.rules || [];

    config.rules.push(
      // typescript and javascript
      {
        test: /\.(tsx?)|\.(js)$/,
        exclude: [/node_modules\/(?!@ribajs)/, /(bower_components)/],
        loader: config.babelLoaderPath,
      },
      // html templates
      {
        test: /\.html$/,
        use: [
          {
            loader: config.htmlLoaderPath,
            options: {
              minimize: true,
            },
          },
        ],
      },
      // image templates
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: config.fileLoaderPath,
          },
        ],
      },
      // pug templates
      {
        test: /\.pug$/,
        use: [
          {
            loader: config.pugLoaderPath,
            options: {
              minimize: true,
            },
          },
        ],
      },
    );

    // config defaults
    config.detectDuplicates = config.detectDuplicates || false;

    config.styles = config.styles || {
      build: true,
      extract: false,
      resolveUrl: true,
    };

    config.scripts = config.scripts || {
      minimize: config.production, // config.production disabled until terser works with webpack 5 and yarn 2
    };

    // config defaults for config templates
    switch (config.template.toLowerCase()) {
      case "octobercms":
        config.entry = config.entry || [rootPath + "/assets/ts/main.ts"];
        config.output = config.output || {
          path: path.resolve(rootPath, "assets/js"),
          filename: "[name].bundle.js",
        };

        /**
         * On October we use the build in sass compiler for the styles to make use of some october features like theme setting variables in the scss files,
         * so we do not want to build the styles using webpack
         */
        config.styles.build = false;

        config.copyAssets = config.copyAssets || {
          enable: true,
          images: true,
          scss: true,
          iconset: true,
          foldername: "assets",
        };
        break;
      case "shopify":
        config.entry = config.entry || [
          rootPath + "/src/scss/main.scss",
          rootPath + "/src/ts/main.ts",
        ];
        config.output = config.output || {
          path: path.resolve(rootPath, "theme/assets/"),
          filename: "[name].bundle.js",
        };

        /**
         * @param {string} url
         * @param {string} resourcePath path to css file
         */
        config.styles.resolveUrl = "onlyImports";

        config.copyAssets = config.copyAssets || {
          enable: true,
          images: true,
          scss: true,
          iconset: true,
          foldername: "src",
        };
        break;
      // E.g. used for demos
      case "local":
        config.entry = config.entry || [
          path.resolve(rootPath, "src/scss/main.scss"),
          path.resolve(rootPath, "src/ts/main.ts"),
        ];
        config.output = config.output || {
          path: path.resolve(rootPath, "dist/"),
          filename: "[name].bundle.js",
        };

        config.copyAssets = config.copyAssets || {
          enable: false,
          images: true,
          scss: false,
          iconset: true,
          foldername: "src",
        };

        config.devServer = config.devServer || {
          port: 8080,
          host: "0.0.0.0",
          contentBase: [
            path.resolve(rootPath, "src"),
            path.resolve(rootPath, "dist"),
          ],
          hot: true,
          inline: true,
        };

        const HtmlWebpackPlugin = require("html-webpack-plugin");
        config.plugins.push(
          new HtmlWebpackPlugin({
            template: path.resolve(rootPath, "src/index.html"),
            filename: "index.html",
          })
        );

        break;
      default:
        break;
    }

    var terser;
    if (config.scripts.minimize) {
      terser = new config.TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          safari10: true,
        },
      });
    }

    if (config.copyAssets && config.copyAssets.enable === true) {
      const { getCopyPluginConfig, copy } = require("./copy");
      var copyPluginConfigs = getCopyPluginConfig(config);
      if (copyPluginConfigs.patterns && copyPluginConfigs.patterns.length > 0) {
        // https://github.com/webpack-contrib/copy-webpack-plugin
        config.CopyPlugin = config.CopyPlugin || require("copy-webpack-plugin");
        // Copy the files before the build starts for the case the files are required for the build itself
        copy(copyPluginConfigs.patterns);
        config.plugins.push(new config.CopyPlugin(copyPluginConfigs));
      }
    }

    if (config.detectDuplicates === true) {
      const { DuplicatesPlugin } = require("inspectpack/plugin");
      config.plugins.push(new DuplicatesPlugin());
    }

    if (config.styles.extract === true) {
      config.plugins.push(
        new config.CssExtractPlugin({
          filename: "[name].css",
        })
      );
    }

    // if (config.development) {
    //   console.debug("Use HotModuleReplacementPlugin");
    //   config.plugins.push(new webpack.HotModuleReplacementPlugin());
    // }

    // console.debug('Used plugins: ', config.plugins);

    if (config.styles.build === true) {
      config.rules.push(getStyleLoaderRule(config));
    }

    // Define plugin
    config.define = config.define || {};
    config.define.ENV = JSON.stringify(env);
    config.plugins.push(new webpack.DefinePlugin(config.define));


    config.optimization = config.optimization || {
      minimize: config.scripts.minimize,
      minimizer: config.scripts.minimize ? [terser] : [],
      splitChunks: config.splitChunks || {
        // TODO refactor see https://webpack.js.org/migrate/5/
        automaticNameDelimiter: ".",
        chunks: "all",
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    };

    const webpackConfig = {
      optimization: config.optimization,
      entry: config.entry,
      devtool: env.production ? undefined : "inline-source-map",
      mode: env.production ? "production" : "development",
      output: config.output,
      resolve: config.resolve,
      devServer: config.devServer,
      module: {
        rules: config.rules,
      },
      plugins: config.plugins,
    };

    if (config.target) {
      webpackConfig.target = config.target;
    }

    return webpackConfig;
  };
};
