/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
// Alternative: const CssExtractPlugin = require("mini-css-extract-plugin");
const CssExtractPlugin = require("extract-css-chunks-webpack-plugin");
const rootPath = process.cwd();
const { getCopyPluginConfig, copy } = require("./copy");

var getStyleLoaderRule = (config = {}) => {
  var rule = {
    test: /\.(sa|sc|c)ss$/,
    use: [],
  };

  if (config.styles.extract === true) {
    rule.use.push({
      loader: CssExtractPlugin.loader,
      options: {},
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

  rule.use.push({
    loader: require.resolve("css-loader"),
    options: {
      // Set this to true to resolve scss modules like `@import '~bootstrap/scss/bootstrap';`
      // Set this to false if you do not want to resolve font urls like `src: url(webfont_ProximaNova-Sbold.woff) format('woff');`
      url: config.styles.resolveUrl,
    },
  });

  rule.use.push({
    loader: require.resolve("postcss-loader"),
  });

  rule.use.push({
    loader: require.resolve("sass-loader"),
    options: {
      webpackImporter: true,
      // Use dart-sass in combination of yarn 2 pnp, see: https://github.com/webpack-contrib/sass-loader/issues/802
      implementation: require("dart-sass"),
    },
  });
  return rule;
};

module.exports = (config = {}) => {
  return (env = {}) => {
    env.development =
      config.development ||
      (env && env.development) ||
      process.env.NODE_ENV === "development";
    env.production = !env.development;
    config.production = env.production;
    config.development = env.development;

    var plugins = [];

    var rules = [
      // typescript and javascript
      {
        test: /\.(tsx?)|\.(js)$/,
        exclude: [/node_modules\/(?!@ribajs)/, /(bower_components)/],
        loader: require.resolve("babel-loader"),
      },
      // html templates
      {
        test: /\.html$/,
        use: [
          {
            loader: require.resolve("html-loader"),
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
            loader: "file-loader",
          },
        ],
      },
      // pug templates
      {
        test: /\.pug$/,
        use: [
          {
            loader: require.resolve("pug-loader"),
            options: {
              minimize: true,
            },
          },
        ],
      },
    ];

    // config defaults
    config.detectDuplicates = config.detectDuplicates || false;

    config.styles = config.styles || {
      build: true,
      extract: true,
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

        config.styles.build = true;
        config.styles.extract = true;
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
          rootPath + "/src/scss/main.scss",
          rootPath + "/src/ts/main.ts",
        ];
        config.output = config.output || {
          path: path.resolve(rootPath, "dist/"),
          filename: "[name].bundle.js",
        };

        config.styles.build = true;
        config.styles.extract = true;

        config.copyAssets = config.copyAssets || {
          enable: false,
          images: true,
          scss: false,
          iconset: true,
          foldername: "src",
        };

        config.devServer = {
          host: "0.0.0.0",
          contentBase: "./src",
        };

        const HtmlWebpackPlugin = require("html-webpack-plugin");
        plugins.push(
          new HtmlWebpackPlugin({
            template: rootPath + "/src/index.html",
            filename: "index.html",
          })
        );

        break;
      default:
        break;
    }

    var terser;
    if (config.scripts.minimize) {
      terser = new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          safari10: true,
        },
      });
    }

    if (config.copyAssets && config.copyAssets.enable === true) {
      var copyPluginConfigs = getCopyPluginConfig(config);
      if (copyPluginConfigs.patterns && copyPluginConfigs.patterns.length > 0) {
        // https://github.com/webpack-contrib/copy-webpack-plugin
        const CopyPlugin = require("copy-webpack-plugin");
        // Copy the files before the build starts for the case the files are required for the build itself
        copy(copyPluginConfigs.patterns);
        plugins.push(new CopyPlugin(copyPluginConfigs));
      }
    }

    if (config.detectDuplicates === true) {
      const { DuplicatesPlugin } = require("inspectpack/plugin");
      plugins.push(new DuplicatesPlugin());
    }

    if (config.styles.extract === true) {
      plugins.push(
        new CssExtractPlugin({
          filename: "[name].css",
        })
      );
    }

    // console.debug('Used plugins: ', plugins);

    if (config.styles.build === true) {
      rules.push(getStyleLoaderRule(config));
    }

    return {
      optimization: {
        minimize: config.scripts.minimize,
        minimizer: config.scripts.minimize ? [terser] : [],
        splitChunks: {
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
      },
      // Change to your "entry-point".
      entry: config.entry,
      devtool: env.production ? undefined : "inline-source-map",
      mode: env.production ? "production" : "development",
      output: config.output,
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".pug", ".html"],
        symlinks: true,
        alias: {},
        plugins: [],
      },
      devServer: config.devServer,
      module: {
        rules: rules,
      },
      plugins: plugins,
    };
  };
};
