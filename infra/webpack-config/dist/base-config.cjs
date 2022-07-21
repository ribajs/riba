/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, rootPath, findDir, findFile } = require("./path.cjs");
const { logger } = require("./logger.cjs");
const { colors } = require("./colors.cjs");

const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

module.exports.getBaseConfig = (config = {}, env = {}) => {
  env.development =
    config.development ||
    (env && env.development) ||
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "development";

  if (typeof env.production === "boolean") {
    env.development = !env.production;
  }
  env.production = !env.development;
  config.production = env.production;
  config.development = env.development;

  if (config.template) {
    config.template = config.template.toLowerCase();
  }

  config.distPath = config.distPath || resolve(rootPath, "dist");

  // TypeScript source path
  if (typeof config.tsSourceDir === "undefined") {
    config.tsSourceDir = findDir([
      resolve(rootPath, "assets/ts"), // OctoberCMS
      resolve(rootPath, "src/ts"),
      resolve(rootPath, "src/scripts"),
      resolve(rootPath, "src/ts"),
      resolve(rootPath, "ts"),
      resolve(rootPath, "scripts"),
    ]);
    if (config.tsSourceDir) {
      logger.debug("Set config.tsSourceDir to: " + config.tsSourceDir);
    }
  }

  // SCSS source path
  if (typeof config.scssSourceDir === "undefined") {
    config.scssSourceDir = findDir([
      resolve(rootPath, "src/scss"),
      resolve(rootPath, "src/styles"),
      resolve(rootPath, "scss"),
      resolve(rootPath, "styles"),
    ]);
    if (config.scssSourceDir) {
      logger.debug("Set config.scssSourceDir to: " + config.scssSourceDir);
    }
  }

  // HTML / PUG source path
  if (typeof config.templateDir === "undefined") {
    config.templateDir = findDir([
      resolve(rootPath, "src/html"),
      resolve(rootPath, "src/templates"),
      resolve(rootPath, "src/views"),
      resolve(rootPath, "html"),
      resolve(rootPath, "templates"),
      resolve(rootPath, "views"),
      resolve(rootPath, "src/index.html"),
      resolve(rootPath, "index.html"),
    ]);
    if (config.templateDir) {
      logger.debug("Set config.templateDir to: " + config.templateDir);
    }
  }

  // TypeScript main file
  if (typeof config.tsIndexPath === "undefined" && config.tsSourceDir) {
    let searchFor = ["main.ts", "csr.ts", "app.ts", "index.ts"];
    switch (config.template) {
      case "shopify-checkout":
        searchFor = ["checkout.ts"];
        break;
      case "ssr":
        searchFor = ["ssr.ts"];
        break;
    }

    config.tsIndexPath = findFile(config.tsSourceDir, searchFor);
    if (config.tsIndexPath) {
      logger.debug("Set config.tsIndexPath to: " + config.tsIndexPath);
    }
  }

  // SCSS main file

  if (typeof config.scssIndexPath === "undefined" && config.scssSourceDir) {
    let searchFor = ["main.scss", "index.scss", "app.scss", "theme.scss"];

    switch (config.template) {
      case "shopify-checkout":
        searchFor = ["checkout.scss"];
        break;
    }

    config.scssIndexPath = findFile(config.scssSourceDir, searchFor);

    if (config.scssIndexPath) {
      logger.debug("Set config.scssIndexPath to: " + config.scssIndexPath);
    }
  }

  // ESLint path and Fork Ts Checker
  {
    config.forkTsCheckerConfig = config.forkTsCheckerConfig || {};
    // Disable eslint with config.forkTsCheckerConfig.eslint = false;
    if (typeof config.forkTsCheckerConfig.eslint === "undefined") {
      const eslintConfigPath = findFile(rootPath, [
        ".eslintrc.js",
        ".eslintrc.cjs",
        "../.eslintrc.js",
        "../.eslintrc.cjs",
        "../../.eslintrc.js",
        "../../.eslintrc.cjs",
      ]);

      const eslintConfig = {
        files: config.tsSourceDir + "/**/*.{ts,tsx,js,jsx}",
        options: {},
      };

      if (eslintConfigPath) {
        logger.debug(
          "Enable ESLint because a eslint config file was found in " +
          eslintConfigPath
        );
        const _options = require(eslintConfigPath);
        delete _options.root;
        if (Array.isArray(_options.extends) && _options.extends["@ribajs"]) {
          delete _options.extends;
          const _ribaOptions = require("@ribajs/eslint-config");

          eslintConfig.options = { ..._ribaOptions, _options };
        }
      } else {
        logger.debug("Use default Riba ESLint config");
        eslintConfig.options = require("@ribajs/eslint-config");
      }
      // Wait for fix https://github.com/yarnpkg/berry/issues/3578
      // config.forkTsCheckerConfig.eslint = eslintConfig;
    }
  }

  // postCSS config path
  if (typeof config.postcssOptions === "undefined") {
    const postcssConfigPath = findFile(rootPath, [
      "postcss.config.js",
      "postcss.config.cjs",
      "../postcss.config.js",
      "../postcss.config.cjs",
      "../../postcss.config.js",
      "../../postcss.config.cjs",
    ]);

    if (postcssConfigPath) {
      logger.debug(
        "Enable PostCSS because a postcss config file was found in " +
        postcssConfigPath
      );
      config.postcssOptions = require(postcssConfigPath);
    } else {
      logger.debug("Use default Riba PostCSS config" + postcssConfigPath);
      config.postcssOptions = require("@ribajs/postcss-config")({ env: env });
    }
  }

  // HTML main file(s) for HtmlWebpackPlugin
  if (typeof config.htmlTemplatePaths === "undefined" && config.templateDir) {
    config.htmlTemplatePaths = config.htmlTemplatePaths || [];
    const htmlIndex = findFile(config.templateDir, ["index.html"]);
    if (htmlIndex) {
      config.htmlTemplatePaths.push(htmlIndex);
    }
    if (
      Array.isArray(config.htmlTemplatePaths) &&
      config.htmlTemplatePaths.length
    ) {
      logger.debug(
        "Set config.htmlTemplatePaths to: " + config.htmlTemplatePaths
      );
    }
  }

  // Main PUG file(s)
  if (typeof config.pugTemplatePaths === "undefined" && config.pugSourcePath) {
    const pugIndex = findFile(config.templateDir, ["index.pug"]);
    if (pugIndex) {
      config.pugTemplatePaths.push(pugIndex);
    }
    if (config.pugSourcePath) {
      logger.debug("Set config.pugSourcePath to: " + config.pugSourcePath);
    }
  }

  config.resolve = config.resolve || {
    symlinks: true,
    alias: {},
    plugins: [new ResolveTypeScriptPlugin({ includeNodeModules: true })],
  };
  config.resolve.extensions = config.resolve.extensions || [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".scss",
    ".pug",
    ".html",
  ];
  config.resolve.alias = config.resolve.alias || {};
  config.resolve.symlinks = true;

  config.plugins = config.plugins || [];

  config.rules = config.rules || [];

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

  // let commonsName = "vendors";
  // switch (config.template) {
  //   case "shopify-checkout":
  //     commonsName = "vendors-checkout";
  //     break;
  // }

  config.optimization = config.optimization || {
    minimize: config.scripts.minimize,
    splitChunks: config.splitChunks || {
      // TODO refactor see https://webpack.js.org/migrate/5/
      automaticNameDelimiter: ".",
      chunks: "all",
      cacheGroups: {
        // defaultVendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: commonsName,
        //   chunks: "all",
        //   reuseExistingChunk: true,
        // },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
          reuseExistingChunk: true,
        },
        // templates: {
        //   name: "templates",
        //   test: /\.[html|pug]$/,
        //   chunks: "all",
        //   enforce: true,
        //   reuseExistingChunk: true,
        // },
      },
    },
  };

  if (
    config.template === "shopify-checkout" &&
    config.optimization.splitChunks.cacheGroups
  ) {
    config.optimization.splitChunks.cacheGroups.defaultVendors = {
      test: /[\\/]node_modules[\\/]/,
      name: commonsName,
      chunks: "all",
      reuseExistingChunk: true,
    };
  }

  // config defaults for config templates
  switch (config.template) {
    case "octobercms":
      config.entry = config.entry || [config.tsIndexPath];
      config.distPath = resolve(rootPath, "assets");
      config.output = config.output || {
        path: resolve(config.distPath, "js"),
        filename: "[name].bundle.js",
      };
      config.publicPath = config.publicPath || config.distPath;

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
        path: config.publicPath,
      };

      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L435
      config.webpackbar = config.webpackbar || {
        name: "OctoberCMS",
        color: colors.client,
      };

      break;
    case "shopify":
      config.entry = config.entry || {};
      config.entry.main = config.entry.main || [];
      if (config.scssIndexPath) {
        config.entry.main.push(config.scssIndexPath);
      }
      if (config.tsIndexPath) {
        config.entry.main.push(config.tsIndexPath);
      }
      config.publicPath =
        config.publicPath || resolve(rootPath, "theme/assets/");
      config.output = config.output || {
        path: config.publicPath,
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
        scss: false,
        iconset: true,
        path: config.publicPath,
      };

      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L435
      config.webpackbar = config.webpackbar || {
        name: "Shopify",
        color: colors.client,
      };

      break;
    case "shopify-checkout":
      config.entry = config.entry || {};
      config.entry.checkout = config.entry.checkout || [];
      if (config.scssIndexPath) {
        config.entry.checkout.push(config.scssIndexPath);
      }
      if (config.tsIndexPath) {
        config.entry.checkout.push(config.tsIndexPath);
      }
      const checkoutAssetsPath = resolve(rootPath, "theme/assets/");
      config.output = config.output || {
        path: checkoutAssetsPath,
        filename: "[name].bundle.js",
      };

      /**
       * @param {string} url
       * @param {string} resourcePath path to css file
       */
      config.styles.resolveUrl = "onlyImports";

      config.copyAssets = config.copyAssets || {
        enable: false,
        images: false,
        scss: false,
        iconset: false,
        path: config.publicPath,
      };

      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L435
      config.webpackbar = config.webpackbar || {
        name: "Checkout",
        color: colors.modern,
      };

      break;
    // E.g. used for demos
    case "local":
      if (!config.entry) {
        config.entry = [];
        if (config.scssIndexPath) {
          config.entry.push(config.scssIndexPath);
        }
        if (config.tsIndexPath) {
          config.entry.push(config.tsIndexPath);
        }
      }

      config.publicPath = config.publicPath || resolve(rootPath, "public");

      config.output = config.output || {
        path: config.distPath,
        filename: "[name].bundle.js",
      };

      config.copyAssets = config.copyAssets || {
        enable: true,
        images: true,
        scss: false,
        iconset: true,
        path: config.publicPath,
      };

      config.devServer = config.devServer || {
        port: 8080,
        host: "0.0.0.0",
        hot: true,
        static: [
          {
            directory: config.publicPath,
          },
        ],
      };

      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L435
      config.webpackbar = config.webpackbar || {
        name: "Client",
        color: colors.client,
      };

      break;
    case "ssr":
      config.entry = config.entry || [config.tsIndexPath];
      config.output = config.output || {
        path: config.distPath,
        filename: "[name].bundle.js",
      };

      config.copyAssets = config.copyAssets || {
        enable: false,
        images: false,
        scss: false,
        iconset: false,
        path: config.publicPath,
      };

      config.styles.build = false;

      config.forkTsCheckerConfig.typescript =
        config.forkTsCheckerConfig.typescript || {};

      config.forkTsCheckerConfig.typescript.configFile = "tsconfig.ssr.json";

      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L435
      config.webpackbar = config.webpackbar || {
        name: "Server",
        color: colors.server,
      };

      // Disable chunks for ssr builds
      config.optimization.splitChunks = {};
      break;
    default:
      break;
  }

  return config;
};
