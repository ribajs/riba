/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getStyleLoaderRule } = require("./style");

module.exports.getConfig = (config = {}, env = {}) => {
  // config defaults for config templates
  switch (config.template.toLowerCase()) {
    // E.g. used for demos
    case "local":
      if (config.htmlIndexPath && config.HtmlWebpackPlugin) {
        config.plugins.push(
          new config.HtmlWebpackPlugin({
            template: config.htmlIndexPath,
            filename: "index.html",
          })
        );
      }

      break;
    default:
      break;
  }

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

  var terser;
  if (config.scripts.minimize && config.TerserPlugin) {
    terser = new config.TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
        safari10: true,
      },
    });
  }

  config.optimization = config.optimization || {};
  if (config.scripts.minimize) {
    config.optimization.minimizer =
      config.optimizationminimizer || terser ? [terser] : [];
  }

  if (config.copyAssets?.enable === true) {
    const { getCopyPluginPatterns, copy } = require("./copy");
    config.copyPluginConfig = config.copyPluginConfig || {};
    config.copyPluginConfig.patterns =
      config.copyPluginConfig.patterns || getCopyPluginPatterns(config);
    if (config.copyPluginConfig.patterns.length && config.CopyPlugin) {
      // Copy the files before the build starts for the case the files are required for the build itself
      copy(config.copyPluginConfig.patterns);
      if (config.CopyPlugin) {
        config.plugins.push(new config.CopyPlugin(config.copyPluginConfig));
      }
    }
  }

  if (config.detectDuplicates === true && config.DuplicatesPlugin) {
    config.plugins.push(config.DuplicatesPlugin);
  }

  if (
    config.styles.build === true &&
    config.styles.extract === true &&
    config.CssExtractPlugin
  ) {
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
  if (config.forkTsCheckerConfig && config.ForkTsCheckerPlugin) {
    config.plugins.push(
      new config.ForkTsCheckerPlugin(config.forkTsCheckerConfig)
    );
  }

  // Define plugin
  if (config.DefinePlugin) {
    config.define = config.define || {};
    config.define.ENV = JSON.stringify(env);
    config.plugins.push(new config.DefinePlugin(config.define));
  }

  return config;
};
