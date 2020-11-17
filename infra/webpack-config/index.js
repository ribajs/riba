/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require("webpack");
const { path, rootPath, findDir, findFile } = require("./path");

var getStyleLoaderRule = (config = {}) => {
  var rule = {
    test: /\.(sa|sc|c)ss$/,
    use: [],
  };

  if (config.styles.extract === true) {
    rule.use.push({
      loader: config.CssExtractPlugin.loader,
      options: {
        publicPath: config.styles.distPath,
      },
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
    config.styles.SassImplementation || require("sass");

  rule.use.push({
    loader: config.cssLoaderPath,
    options: {
      // Set this to true to resolve scss modules like `@import '~bootstrap/scss/bootstrap';`
      // Set this to false if you do not want to resolve font urls like `src: url(webfont_ProximaNova-Sbold.woff) format('woff');`
      url: config.styles.resolveUrl,
    },
  });

  if (config.postcssOptions) {
    rule.use.push({
      loader: config.postcssLoaderPath,
      options: {
        postcssOptions: config.postcssOptions,
        sourceMap: config.development,
      },
    });
  }

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
  config.ForkTsCheckerPlugin =
    config.ForkTsCheckerPlugin || require("fork-ts-checker-webpack-plugin");
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

    config.distPath = config.distPath || path.resolve(rootPath, "dist");

    // TypeScript source path
    if (typeof config.tsSourceDir === "undefined") {
      config.tsSourceDir = findDir([
        path.resolve(rootPath, "/assets/ts"), // OctoberCMS
        path.resolve(rootPath, "src/ts"),
        path.resolve(rootPath, "src/scripts"),
        path.resolve(rootPath, "src/ts"),
        path.resolve(rootPath, "ts"),
        path.resolve(rootPath, "scripts"),
      ]);
      if (config.tsSourceDir) {
        console.debug("Set config.tsSourceDir to: " + config.tsSourceDir);
      }
    }

    // SCSS source path
    if (typeof config.scssSourceDir === "undefined") {
      config.scssSourceDir = findDir([
        path.resolve(rootPath, "src/scss"),
        path.resolve(rootPath, "src/styles"),
        path.resolve(rootPath, "scss"),
        path.resolve(rootPath, "styles"),
      ]);
      if (config.scssSourceDir) {
        console.debug("Set config.scssSourceDir to: " + config.scssSourceDir);
      }
    }

    // HTML / PUG source path
    if (typeof config.htmlSourceDir === "undefined") {
      config.htmlSourceDir = findDir([
        path.resolve(rootPath, "src/html"),
        path.resolve(rootPath, "src/templates"),
        path.resolve(rootPath, "src/views"),
        path.resolve(rootPath, "html"),
        path.resolve(rootPath, "templates"),
        path.resolve(rootPath, "views"),
        path.resolve(rootPath, "src/index.html"),
        path.resolve(rootPath, "index.html"),
      ]);
      if (config.htmlSourceDir) {
        console.debug("Set config.htmlSourceDir to: " + config.htmlSourceDir);
      }
    }

    // TypeScript main file
    if (typeof config.tsIndexPath === "undefined" && config.tsSourceDir) {
      config.tsIndexPath = findFile(config.tsSourceDir, [
        "main.ts",
        "index.ts",
      ]);
      if (config.tsIndexPath) {
        console.debug("Set config.tsIndexPath to: " + config.tsIndexPath);
      }
    }

    // SCSS main file
    if (typeof config.scssIndexPath === "undefined" && config.scssSourceDir) {
      config.scssIndexPath = findFile(config.scssSourceDir, [
        "main.scss",
        "index.scss",
        "app.scss",
        "theme.scss",
      ]);
      if (config.scssIndexPath) {
        console.debug("Set config.scssIndexPath to: " + config.scssIndexPath);
      }
    }

    // ESLint path and Fork Ts Checker
    {
      config.forkTsCheckerConfig = config.forkTsCheckerConfig || {};
      // Disable eslint with config.forkTsCheckerConfig.eslint = false;
      if (typeof config.forkTsCheckerConfig.eslint === "undefined") {
        const eslintConfig = findFile(rootPath, [
          ".eslintrc.js",
          "../.eslintrc.js",
          "../../.eslintrc.js",
        ]);

        if (eslintConfig) {
          console.debug(
            "Enable ESLint because a eslint config file was found in " +
              eslintConfig
          );
          // TODO set src path in config
          config.forkTsCheckerConfig.eslint = {
            files: config.tsSourceDir + "/**/*.{ts,tsx,js,jsx}",
          };
        }
      }
    }

    // postCSS config path
    if (typeof config.postcssOptions === "undefined") {
      const postcssConfigPath = findFile(rootPath, [
        "postcss.config.js",
        "../postcss.config.js",
        "../../postcss.config.js",
      ]);

      if (postcssConfigPath) {
        console.debug(
          "Enable PostCSS because a eslint config file was found in " +
            postcssConfigPath
        );
        config.postcssOptions = require(postcssConfigPath);
      }
    }

    // HTML main file for HtmlWebpackPlugin
    if (typeof config.htmlIndexPath === "undefined" && config.htmlSourceDir) {
      config.htmlIndexPath = findFile(config.htmlSourceDir, ["index.html"]);
      if (config.htmlIndexPath) {
        console.debug("Set config.htmlIndexPath to: " + config.htmlIndexPath);
      }
    }

    // Main PUG file
    if (typeof config.pugIndexPath === "undefined" && config.pugSourcePath) {
      config.pugSourcePath = findFile(config.htmlSourceDir, ["index.pug"]);
      if (config.pugSourcePath) {
        console.debug("Set config.pugSourcePath to: " + config.pugSourcePath);
      }
    }

    config.resolve = config.resolve || {
      symlinks: true,
      alias: {},
      plugins: [],
    };
    config.resolve.extensions = config.resolve.extensions || [
      ".ts",
      ".tsx",
      ".js",
      ".json",
      ".scss",
      ".pug",
      ".html",
    ];
    config.resolve.alias = config.resolve.alias || {};
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
      // image templates and other assets
      {
        test: /\.(png|jpe?g|gif|ttf)$/i,
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
      }
    );

    // config defaults
    config.detectDuplicates = config.detectDuplicates || false;

    config.styles = config.styles || {
      build: true,
      extract: true,
      resolveUrl: true,
      distPath: config.distPath,
    };

    config.scripts = config.scripts || {
      minimize: config.production, // config.production disabled until terser works with webpack 5 and yarn 2
    };

    // config defaults for config templates
    switch (config.template.toLowerCase()) {
      case "octobercms":
        config.entry = config.entry || [config.tsIndexPath];
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
          config.scssIndexPath,
          config.tsIndexPath,
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
          config.scssIndexPath,
          config.tsIndexPath,
        ];
        config.output = config.output || {
          path: config.distPath,
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
          contentBase: [path.resolve(rootPath, "src"), config.distPath],
          hot: true,
          inline: true,
        };

        if (config.htmlIndexPath) {
          const HtmlWebpackPlugin = require("html-webpack-plugin");
          config.plugins.push(
            new HtmlWebpackPlugin({
              template: config.htmlIndexPath,
              filename: "index.html",
            })
          );
        }

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
      const { getCopyPluginPatterns, copy } = require("./copy");
      config.copyPluginConfig = config.copyPluginConfig || {};
      config.copyPluginConfig.patterns =
        config.copyPluginConfig.patterns || getCopyPluginPatterns(config);
      if (
        config.copyPluginConfig.patterns &&
        config.copyPluginConfig.patterns.length > 0
      ) {
        // https://github.com/webpack-contrib/copy-webpack-plugin
        config.CopyPlugin = config.CopyPlugin || require("copy-webpack-plugin");
        // Copy the files before the build starts for the case the files are required for the build itself
        copy(config.copyPluginConfig.patterns);
        config.plugins.push(new config.CopyPlugin(config.copyPluginConfig));
      }
    }

    if (config.detectDuplicates === true) {
      const { DuplicatesPlugin } = require("inspectpack/plugin");
      config.plugins.push(new DuplicatesPlugin());
    }

    if (config.styles.build === true && config.styles.extract === true) {
      config.plugins.push(
        new config.CssExtractPlugin({
          filename: "[name].css",
        })
      );
    }

    // console.debug('Used plugins: ', config.plugins);

    if (config.styles.build === true) {
      config.rules.push(getStyleLoaderRule(config));
    }

    // TS Fork Checker
    if (config.forkTsCheckerConfig) {
      config.plugins.push(
        new config.ForkTsCheckerPlugin(config.forkTsCheckerConfig)
      );
    }

    // Define plugin
    {
      config.define = config.define || {};
      config.define.ENV = JSON.stringify(env);
      config.plugins.push(new webpack.DefinePlugin(config.define));
    }

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
