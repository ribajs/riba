/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, rootPath, findDir, findFile } = require("./path");

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
      console.debug("Set config.tsSourceDir to: " + config.tsSourceDir);
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
      console.debug("Set config.scssSourceDir to: " + config.scssSourceDir);
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
      console.debug("Set config.templateDir to: " + config.templateDir);
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
      console.debug("Set config.tsIndexPath to: " + config.tsIndexPath);
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

  // HTML main file(s) for HtmlWebpackPlugin
  if (typeof config.htmlTemplatePaths === "undefined" && config.templateDir) {
    config.htmlTemplatePaths = config.htmlTemplatePaths || [];
    const htmlIndex = findFile(config.templateDir, ["index.html"]);
    if (htmlIndex) {
      config.htmlTemplatePaths.push(htmlIndex);
    }
    if (config.htmlTemplatePaths) {
      console.debug(
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

  let commonsName = "vendors";
  switch (config.template) {
    case "shopify-checkout":
      commonsName = "vendors-checkout";
      break;
  }

  config.optimization = config.optimization || {
    minimize: config.scripts.minimize,
    splitChunks: config.splitChunks || {
      // TODO refactor see https://webpack.js.org/migrate/5/
      automaticNameDelimiter: ".",
      chunks: "all",
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: commonsName,
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

  // config defaults for config templates
  switch (config.template) {
    case "octobercms":
      config.entry = config.entry || [config.tsIndexPath];
      config.output = config.output || {
        path: resolve(rootPath, "assets/js"),
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
      config.entry = config.entry || {};
      config.entry.main = config.entry.main || [];
      if (config.scssIndexPath) {
        config.entry.main.push(config.scssIndexPath);
      }
      if (config.tsIndexPath) {
        config.entry.main.push(config.tsIndexPath);
      }
      config.output = config.output || {
        path: resolve(rootPath, "theme/assets/"),
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
        foldername: "src",
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
      config.output = config.output || {
        path: resolve(rootPath, "theme/assets/"),
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
        foldername: "src",
      };
      break;
    // E.g. used for demos
    case "local":
      config.entry = config.entry || [config.scssIndexPath, config.tsIndexPath];
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
        contentBase: [resolve(rootPath, "src"), config.distPath],
        hot: true,
        inline: true,
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
        foldername: "src",
      };

      config.forkTsCheckerConfig.typescript =
        config.forkTsCheckerConfig.typescript || {};

      config.forkTsCheckerConfig.typescript.configFile = "tsconfig.ssr.json";
      break;
    default:
      break;
  }

  return config;
};
