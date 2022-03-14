/**
 * https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/includes/config.js
 */

import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("debug")("@ribajs/shopify");
import * as findRoot from "app-root-path";
import gutil from "gulp-util";
import yaml from "js-yaml";
import fs from "fs";
import { processSvg } from "./utilities.cjs";
import { Config } from "../types/index.cjs";
import { isAvailable } from "@ribajs/npm-package";

const themeRoot = findRoot.toString();
const ribaShopifyRoot = isAvailable("@ribajs/shopify");
const ribaShopifyTdaRoot = isAvailable("@ribajs/shopify-tda");

if (!ribaShopifyRoot) {
  throw new Error("You need to install the @ribajs/shopify module!");
}

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
export const config: Config = {
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
    assets: "src/assets/*",
    iconset: "src/iconset/svg/*.svg",
    templates: "src/templates/**/*",
    snippets: "src/snippets/*",
    sections: "src/sections/*",
    locales: "src/locales/*",
    config: "src/config/*",
    layout: "src/layout/*",
    favicons: "src/favicons/*",
    schema: "./src/schema/*.json",
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
      assets: path.resolve(ribaShopifyRoot, "src/assets/") + "*",
      iconset: path.resolve(ribaShopifyRoot, "src/iconset/svg") + "/*.svg",
      templates: path.resolve(ribaShopifyRoot, "src/templates/") + "/**/*",
      snippets: path.resolve(ribaShopifyRoot, "src/snippets/") + "/*",
      sections: path.resolve(ribaShopifyRoot, "src/sections/") + "/*",
      locales: path.resolve(ribaShopifyRoot, "src/locales/") + "/*",
      config: path.resolve(ribaShopifyRoot, "src/config/") + "/*",
      layout: path.resolve(ribaShopifyRoot, "src/layout/") + "/*",
    },
  },

  ribaShopifyTda: {
    root: ribaShopifyTdaRoot,
  },

  plugins: {
    cheerio: {
      run: processSvg,
    },
    svgmin: {
      plugins: [
        {
          name: "removeTitle",
        },
        {
          name: "removeDesc",
        },
        {
          name: "removeAttrs",
        },
        {
          name: "cleanupIDs",
          active: false,
        },
      ],
    },
  },
};

if (ribaShopifyTdaRoot) {
  config.ribaShopifyTda.src = {
    root: path.resolve(ribaShopifyTdaRoot, "src/"),
    json: path.resolve(ribaShopifyTdaRoot, "src/"),
    assets: path.resolve(ribaShopifyTdaRoot, "src/assets/"),
    iconset: path.resolve(ribaShopifyTdaRoot, "src/iconset/svg"),
    templates: path.resolve(ribaShopifyTdaRoot, "src/templates/"),
    snippets: path.resolve(ribaShopifyTdaRoot, "src/snippets/"),
    sections: path.resolve(ribaShopifyTdaRoot, "src/sections/"),
    locales: path.resolve(ribaShopifyTdaRoot, "src/locales/"),
    config: path.resolve(ribaShopifyTdaRoot, "src/config/"),
    layout: path.resolve(ribaShopifyTdaRoot, "src/layout/"),
  };
}

/**
 * Try to get the config.deploy.yml from root of the shopify theme, otherwise try to get this file from the root of riba-shopify
 * @param configName
 * @returns The config content or null if the config file not exists
 */
export const getYamlConfig = (configName: string) => {
  const filePath = path.resolve(config.themeRoot, configName);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const shopifyConfigs = yaml.load(data);
    return shopifyConfigs;
  } catch (error) {
    console.warn(error);
    const shopifyConfigs = yaml.load(
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
