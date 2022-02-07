/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { isAvailable, ribaPackages } = require("@ribajs/npm-package");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const { logger } = require("./logger");

// const normalize = require("copy-webpack-plugin/dist/utils/normalize").default;
const rootPath = process.cwd();

const getCopyPluginConfigForScssRibaModule = (config, moduleName) => {
  const modulePath = isAvailable(moduleName);
  if (modulePath) {
    const publicPath =
      config.copyAssets.path ||
      config.publicPath ||
      path.resolve(rootPath, config.copyAssets.foldername);

    // Copy @ribajs/xyz scss files
    var moduleConfig = {
      from: modulePath + "/**/*.scss",
      to: path.resolve(publicPath, "scss/vendors", moduleName),
      toType: "dir",
      context: modulePath + "/src",
    };
    return moduleConfig;
  }
  return null;
};

const getCopyPluginConfigForImages = (config, moduleName) => {
  const modulePath = isAvailable(moduleName);
  if (modulePath) {
    const publicPath =
      config.copyAssets.path ||
      config.publicPath ||
      path.resolve(rootPath, config.copyAssets.foldername);

    // Copy @ribajs/xyz scss files
    var moduleConfig = {
      from: modulePath + "/**/*.{png,svg}",
      to: path.resolve(publicPath, `images/vendors/${moduleName}`),
      toType: "dir",
      context: modulePath,
    };
    return moduleConfig;
  }
  return null;
};

const getCopyPluginConfigForIconsetRibaModule = (config, moduleName) => {
  const modulePath = isAvailable(moduleName);
  if (modulePath) {
    const publicPath =
      config.copyAssets.path ||
      config.publicPath ||
      path.resolve(rootPath, config.copyAssets.foldername);

    // Copy iconset svg's
    const moduleConfig = {
      from: path.resolve(modulePath, "dist/svg/*.svg"),
      to: path.resolve(publicPath, `iconset`),
      toType: "dir",
      context: path.join(modulePath, "dist"),
    };
    return moduleConfig;
  }
  return null;
};

const getCopyPluginConfigForScssThirdPartyModule = (
  config,
  moduleName,
  scssPath,
  glob
) => {
  const modulePath = isAvailable(moduleName);
  if (modulePath) {
    const publicPath =
      config.copyAssets.path ||
      config.publicPath ||
      path.resolve(rootPath, config.copyAssets.foldername);

    // Copy bootstrap scss files. Note: `require.resolve('bootstrap')` resolves to `'bootstrap/dist/js/bootstrap.js'` because this is the main file in package.json
    const moduleConfig = {
      from: path.join(modulePath, scssPath, glob),
      to: path.resolve(publicPath, `scss/vendors`, moduleName),
      toType: "dir",
      context: path.join(modulePath, scssPath),
    };
    return moduleConfig;
  }
  return null;
};

const getCopyPluginPatterns = (config) => {
  const patterns = config.copyAssets.patterns || [];

  if (config.copyAssets.scss) {
    for (const ribaScssModule of ribaPackages) {
      if (isAvailable(ribaScssModule)) {
        patterns.push(
          getCopyPluginConfigForScssRibaModule(config, ribaScssModule)
        );
      }
    }
  }

  if (config.copyAssets.iconset && isAvailable("@ribajs/iconset")) {
    patterns.push(
      getCopyPluginConfigForIconsetRibaModule(config, "@ribajs/iconset")
    );
  }

  if (config.copyAssets.images) {
    if (isAvailable("leaflet")) {
      patterns.push(getCopyPluginConfigForImages(config, "leaflet"));
    }
    if (isAvailable("@ribajs/artcodestudio")) {
      patterns.push(
        getCopyPluginConfigForImages(config, "@ribajs/artcodestudio")
      );
    }
  }

  if (config.copyAssets.scss && isAvailable("bootstrap")) {
    patterns.push(
      getCopyPluginConfigForScssThirdPartyModule(
        config,
        "bootstrap",
        "scss",
        "**/*.scss"
      )
    );
  }

  return patterns;
};

// Copy the files before the build starts for the case the files are required for the build itself
const copy = (copyPluginPatterns) => {
  for (const pattern of copyPluginPatterns) {
    files = glob.sync(pattern.from);
    for (const file of files) {
      const context = pattern.context;
      // const appendDestPath = file.replace(context, "");
      const appendDestPath = path.relative(context, file);
      const dest = path.join(pattern.to, appendDestPath);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      logger.debug("\ncopy file from: " + file);
      logger.debug("copy file to: " + dest);
      logger.debug("context: " + context);
      logger.debug("appendDestPath: " + appendDestPath);
      fs.copyFileSync(file, dest);
    }
  }
};

module.exports.getCopyPluginPatterns = getCopyPluginPatterns;
module.exports.copy = copy;
