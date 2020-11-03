/**
 * https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/includes/config.js
 */

import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("debug")("slate-tools");
import findRoot from "find-root";
import gutil from "gulp-util";
import yaml from "js-yaml";
import fs from "fs";

const themeRoot = findRoot(process.cwd());
let sharedCodeRoot = path.resolve(__dirname, "../../../");

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
  pkg.resolutions["shared-code"] &&
  pkg.resolutions["shared-code"].includes("portal:")
) {
  const sharedCodeRPath = pkg.resolutions["shared-code"].split("portal:")[1];
  sharedCodeRoot = path.resolve(themeRoot, sharedCodeRPath);
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
 *  @prop {String} scssLintConfig - path to scss-lint config file
 *  @prop {String} deployLog - path to deploy log file
 *  @prop {String} src - globs (multi-filename matching patterns) for various source files
 *  @prop {Object} dist - paths to relevant folder locations in the distributable directory
 *  @prop {Object} roots - array of "root" (entry point) JS & CSS files
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
    jsPath: "src/scripts/",
    js: "src/scripts/**/*.{js,js.liquid}",
    tsPath: "src/ts/",
    vendorJs: "src/scripts/vendor/*.js",
    json: "src/**/*.json",
    css: "src/styles/**/*.{css,scss,scss.liquid}",
    cssLint: "src/styles/**/*.{css,scss}",
    vendorCss: "src/styles/vendor/*.{css,scss}",
    assets: "src/assets/**/*",
    icons: "src/icons/**/*.svg",
    templates: "src/templates/**/*",
    snippets: "src/snippets/*",
    sections: "src/sections/*",
    locales: "src/locales/*",
    config: "src/config/*",
    layout: "src/layout/*",

    // TypeScript
    ts: "ts/",
    mainTs: "src/ts/main.ts",
    checkoutTs: "src/ts/checkout.ts",
  },

  dist: {
    root: "dist/",
    assets: "dist/assets/",
    snippets: "dist/snippets/",
    sections: "dist/sections/",
    layout: "dist/layout/",
    templates: "dist/templates/",
    locales: "dist/locales/",
  },

  roots: {
    js: "src/scripts/*.{js,js.liquid}",
    jsPath: path.resolve(themeRoot, "src/scripts/"),
    vendorJs: "src/scripts/vendor.js",
    ts: "src/ts/**/*.ts",
    css: "src/styles/*.{css,scss}",
  },

  sharedCode: {
    root: sharedCodeRoot,
    src: {
      root: path.resolve(sharedCodeRoot, "src/"),
      js: path.resolve(sharedCodeRoot, "src/js/") + "/**/*.{js,js.liquid}",
      vendorJs: path.resolve(sharedCodeRoot, "src/js/") + "/vendor/*.js",
      ts: path.resolve(sharedCodeRoot, "src/ts/") + "/**/*.ts",
      json: path.resolve(sharedCodeRoot, "src/") + "/**/*.json",
      css:
        path.resolve(sharedCodeRoot, "src/styles/") +
        "/**/*.{css,scss,scss.liquid}",
      cssLint: path.resolve(sharedCodeRoot, "src/styles/") + "/**/*.{css,scss}",
      assets: path.resolve(sharedCodeRoot, "src/assets/") + "/**/*",
      icons: path.resolve(sharedCodeRoot, "src/icons/") + "/**/*.svg",
      templates: path.resolve(sharedCodeRoot, "src/templates/") + "/**/*",
      snippets: path.resolve(sharedCodeRoot, "src/snippets/") + "/*",
      sections: path.resolve(sharedCodeRoot, "src/sections/") + "/*",
      locales: path.resolve(sharedCodeRoot, "src/locales/") + "/*",
      config: path.resolve(sharedCodeRoot, "src/config/") + "/*",
      layout: path.resolve(sharedCodeRoot, "src/layout/") + "/*",
    },
    roots: {
      js: path.resolve(sharedCodeRoot, "src/js/") + "/*.{js,js.liquid}",
      jsPath: path.resolve(sharedCodeRoot, "src/js/"),
      vendorJs: path.resolve(sharedCodeRoot, "src/js/vendor.js"),
      css: path.resolve(sharedCodeRoot, "src/styles/") + "/*.{css,scss}",
      cssPath: path.resolve(sharedCodeRoot, "src/styles/"),
    },
  },

  plugins: {
    cheerio: {
      run: require("./utilities.js").processSvg,
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
 * Try to get the config.deploy.yml from root of the shopify theme, otherwise try to get this file from the root of shared-code
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
      require(path.resolve(config.sharedCode.root, configName))
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
