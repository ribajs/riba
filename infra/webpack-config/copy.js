/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { isModuleAvailable } = require("./module");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
// const normalize = require("copy-webpack-plugin/dist/utils/normalize").default;
const rootPath = process.cwd();

const getCopyPluginConfigForScssRibaModule = (config, moduleName) => {
  if (isModuleAvailable(moduleName)) {
    // Copy @ribajs/xyz scss files
    var moduleConfig = {
      from: path.dirname(require.resolve(moduleName)) + "/**/*.scss",
      to: path.resolve(
        `${rootPath}/${config.copyAssets.foldername}/scss/vendors/${moduleName}`
      ),
      toType: "dir",
      context: path.dirname(require.resolve(moduleName)),
    };
    return moduleConfig;
  }
  return null;
};

const getCopyPluginConfigForImages = (config, moduleName) => {
  if (isModuleAvailable(moduleName)) {
    // Copy @ribajs/xyz scss files
    var moduleConfig = {
      from: path.dirname(require.resolve(moduleName)) + "/**/*.png",
      to: path.resolve(
        rootPath,
        config.copyAssets.foldername,
        `images/vendors/${moduleName}`
      ),
      toType: "dir",
      context: path.dirname(require.resolve(moduleName)),
    };
    return moduleConfig;
  }
  return null;
};

const getCopyPluginConfigForIconsetRibaModule = (config, moduleName) => {
  if (isModuleAvailable(moduleName)) {
    // Copy iconset svg's
    const moduleConfig = {
      from: path.resolve(
        path.dirname(require.resolve(moduleName)),
        "svg/*.svg"
      ),
      to: path.resolve(rootPath, config.copyAssets.foldername, `iconset`),
      toType: "dir",
      context: path.dirname(require.resolve(moduleName)),
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
  if (isModuleAvailable(moduleName)) {
    // Copy bootstrap scss files. Note: `require.resolve('bootstrap')` resolves to `'bootstrap/dist/js/bootstrap.js'` because this is the main file in package.json
    const moduleConfig = {
      from: path.join(
        path.dirname(require.resolve(moduleName)),
        scssPath,
        glob
      ),
      to: path.resolve(
        rootPath,
        config.copyAssets.foldername,
        `scss/vendors`,
        moduleName
      ),
      toType: "dir",
      context: path.join(path.dirname(require.resolve(moduleName)), scssPath),
    };
    return moduleConfig;
  }
  return null;
};

const getCopyPluginPatterns = (config) => {
  const patterns = config.copyAssets.patterns || [];

  const copyRibaScssModules = [
    "@ribajs/bs4",
    "@ribajs/content-slider",
    "@ribajs/core",
    "@ribajs/i18n",
    "@ribajs/leaflet-map",
    "@ribajs/moment",
    "@ribajs/octobercms",
    "@ribajs/photoswipe",
    "@ribajs/shopify",
    "@ribajs/shopify-easdk",
    "@ribajs/shopify-tda",
    "@ribajs/tagged-image",
  ];

  if (config.copyAssets.scss) {
    for (const ribaScssModule of copyRibaScssModules) {
      if (isModuleAvailable(ribaScssModule)) {
        patterns.push(
          getCopyPluginConfigForScssRibaModule(config, ribaScssModule)
        );
      }
    }
  }

  if (config.copyAssets.iconset && isModuleAvailable("@ribajs/iconset")) {
    patterns.push(
      getCopyPluginConfigForIconsetRibaModule(config, "@ribajs/iconset")
    );
  }

  if (config.copyAssets.images && isModuleAvailable("leaflet")) {
    patterns.push(getCopyPluginConfigForImages(config, "leaflet"));
  }

  if (config.copyAssets.scss && isModuleAvailable("bootstrap")) {
    patterns.push(
      getCopyPluginConfigForScssThirdPartyModule(
        config,
        "bootstrap",
        "../../scss",
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
      console.debug("\ncopy file from: " + file);
      console.debug("copy file to: " + dest);
      // console.debug('context: ' + context);
      // console.debug('appendDestPath: ' + appendDestPath);
      fs.copyFileSync(file, dest);
    }
  }
};

module.exports.getCopyPluginPatterns = getCopyPluginPatterns;
module.exports.copy = copy;
