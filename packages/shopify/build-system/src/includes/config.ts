/**
 * https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/includes/config.js
 */

import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("debug")("@ribajs/shopify");
import findRoot from "find-root";
import gutil from "gulp-util";
import yaml from "js-yaml";
import fs from "fs";
import { processSvg } from "./utilities";

const themeRoot = findRoot(process.cwd());
let ribaShopifyRoot = path.resolve(__dirname, "../../../");

/**
 * You can pass a custom config filename with `--config=config.deploy.yml` eg with npm run deploy:prod -- --config=config.deploy.yml
 */
const getConfigFilename = () => {
  const args = process.argv.slice(2);
  let configFilename = "config.yml";
  for (const arg of args) {
    if (arg.startsWith("--config=")) {
      configFilename = arg.split("=")[1];
    }
  }
  return configFilename;
};

let pkg: any = {};

try {
  pkg = require(path.join(themeRoot, "package.json"));
} catch (err) {
  logger(err);
}

// Get relative path of shared code
if (
  pkg &&
  pkg.resolutions &&
  pkg.resolutions["@ribajs/shopify"] &&
  pkg.resolutions["@ribajs/shopify"].includes("portal:")
) {
  const ribaShopifyRPath = pkg.resolutions["@ribajs/shopify"].split(
    "portal:"
  )[1];
  ribaShopifyRoot = path.resolve(themeRoot, ribaShopifyRPath);
}

/**
 * slate-cli configuration object
 * ## Markdown stuff
 *
 * It's a big description written in `markdown`
 *
 * Example:
 *
 * ```javascript
 * $('something')
 *   .something(else);
 * ```
 *
 * @namespace config
 * @memberof slate-cli
 * @summary Configuring slate-cli
 *  @prop {String} environment - development | staging | production
 *  @prop {String} tkconfig - path to themekit config file
 *  @prop {String} deployLog - path to deploy log file
 *  @prop {String} src - globs (multi-filename matching patterns) for various source files
 *  @prop {Object} dist - paths to relevant folder locations in the distributable directory
 *  @prop {Object} roots - array of "root" (entry point) JS
 *  @prop {Object} plugins - configuration objects passed to various plugins used in the task interface
 */
export const config = {
  environment: gutil.env.environments || "production",
  themeRoot,
  packageJson: pkg,

  upload: path.resolve(themeRoot, "upload"),
  backup: path.resolve(themeRoot, "backup"),

  tkConfig: getConfigFilename(),
  releaseConfig: "release.yml",
  externalScriptsConfig: "external-scripts.yml",
  deployConfig: "config.deploy.yml",
  liveConfig: "config.live.yml",
  deployLog: "deploy.log",

  src: {
    root: "src/",
    json: "src/**/*.json",
    assets: "src/assets/**/*",
    icons: "src/icons/**/*.svg",
    templates: "src/templates/**/*",
    snippets: "src/snippets/*",
    sections: "src/sections/*",
    locales: "src/locales/*",
    config: "src/config/*",
    layout: "src/layout/*",
  },

  dist: {
    root: "theme/",
    assets: "theme/assets/",
    snippets: "theme/snippets/",
    sections: "theme/sections/",
    layout: "theme/layout/",
    templates: "theme/templates/",
    locales: "theme/locales/",
  },

  ribaShopify: {
    root: ribaShopifyRoot,
    src: {
      root: path.resolve(ribaShopifyRoot, "src/"),
      json: path.resolve(ribaShopifyRoot, "src/") + "/**/*.json",
      assets: path.resolve(ribaShopifyRoot, "src/assets/") + "/**/*",
      icons: path.resolve(ribaShopifyRoot, "src/icons/") + "/**/*.svg",
      templates: path.resolve(ribaShopifyRoot, "src/templates/") + "/**/*",
      snippets: path.resolve(ribaShopifyRoot, "src/snippets/") + "/*",
      sections: path.resolve(ribaShopifyRoot, "src/sections/") + "/*",
      locales: path.resolve(ribaShopifyRoot, "src/locales/") + "/*",
      config: path.resolve(ribaShopifyRoot, "src/config/") + "/*",
      layout: path.resolve(ribaShopifyRoot, "src/layout/") + "/*",
    },
  },

  plugins: {
    cheerio: {
      run: processSvg,
    },
    svgmin: {
      plugins: [
        { removeTitle: true },
        { removeDesc: true },
        { cleanupIDs: false },
      ],
    },
  },
};

/**
 * Try to get the config.deploy.yml from root of the shopify theme, otherwise try to get this file from the root of riba-shopify
 * @param configName
 */
export const getYamlConfig = (configName: string) => {
  try {
    const data = fs.readFileSync(
      path.resolve(config.themeRoot, configName),
      "utf8"
    );
    const shopifyConfigs = yaml.safeLoad(data);
    return shopifyConfigs;
  } catch (error) {
    console.warn(error);
    const shopifyConfigs = yaml.safeLoad(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(path.resolve(config.ribaShopify.root, configName))
    );
    return shopifyConfigs;
  }
};

export const getReleaseZipFilename = (envKey: string) => {
  return `${envKey}_${config.packageJson.name}_${config.packageJson.version}.zip`;
};

export const getReleaseName = () => {
  const version = config.packageJson.version;
  const name = config.packageJson.name;
  return `${name} | ${version}`;
};
