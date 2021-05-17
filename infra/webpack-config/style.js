/* eslint-disable no-undef */
module.exports.getStyleLoaderRule = (config = {}) => {
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
      config.styleLoaderPath || require.resolve("style-loader");
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
      if (/\.(gif|jpe?g|tiff?|png|svg|webp|bmp|ttf|woff2?)$/i.test(url)) {
        return false;
      }
      // Enabled for all other file extensions
      return true;
    };
  }

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
    },
  });
  return rule;
};
