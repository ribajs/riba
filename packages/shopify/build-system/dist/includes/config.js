"use strict";
/**
 * https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/includes/config.js
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReleaseName = exports.getReleaseZipFilename = exports.getYamlConfig = exports.config = void 0;
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("debug")("@ribajs/shopify");
const app_root_path_1 = __importDefault(require("app-root-path"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const utilities_1 = require("./utilities");
const npm_package_1 = require("@ribajs/npm-package");
const themeRoot = app_root_path_1.default.toString();
const ribaShopifyRoot = npm_package_1.isAvailable("@ribajs/shopify");
const ribaShopifyTdaRoot = npm_package_1.isAvailable("@ribajs/shopify-tda");
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
let pkg = {};
try {
    pkg = require(path_1.default.join(themeRoot, "package.json"));
}
catch (err) {
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
exports.config = {
    environment: gulp_util_1.default.env.environments || "production",
    themeRoot,
    packageJson: pkg,
    upload: path_1.default.resolve(themeRoot, "upload"),
    backup: path_1.default.resolve(themeRoot, "backup"),
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
        favicons: "src/assets/favicons",
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
            root: path_1.default.resolve(ribaShopifyRoot, "src/"),
            json: path_1.default.resolve(ribaShopifyRoot, "src/") + "/**/*.json",
            assets: path_1.default.resolve(ribaShopifyRoot, "src/assets/") + "/**/*",
            icons: path_1.default.resolve(ribaShopifyRoot, "src/icons/") + "/**/*.svg",
            templates: path_1.default.resolve(ribaShopifyRoot, "src/templates/") + "/**/*",
            snippets: path_1.default.resolve(ribaShopifyRoot, "src/snippets/") + "/*",
            sections: path_1.default.resolve(ribaShopifyRoot, "src/sections/") + "/*",
            locales: path_1.default.resolve(ribaShopifyRoot, "src/locales/") + "/*",
            config: path_1.default.resolve(ribaShopifyRoot, "src/config/") + "/*",
            layout: path_1.default.resolve(ribaShopifyRoot, "src/layout/") + "/*",
        },
    },
    ribaShopifyTda: {
        root: ribaShopifyTdaRoot,
    },
    plugins: {
        cheerio: {
            run: utilities_1.processSvg,
        },
        svgmin: {
            plugins: [
                { removeTitle: true },
                { removeDesc: true },
                { cleanupIDs: false },
            ], // TODO
        },
    },
};
if (ribaShopifyTdaRoot) {
    exports.config.ribaShopifyTda.src = {
        root: path_1.default.resolve(ribaShopifyTdaRoot, "src/"),
        json: path_1.default.resolve(ribaShopifyTdaRoot, "src/"),
        assets: path_1.default.resolve(ribaShopifyTdaRoot, "src/assets/"),
        icons: path_1.default.resolve(ribaShopifyTdaRoot, "src/icons/"),
        templates: path_1.default.resolve(ribaShopifyTdaRoot, "src/templates/"),
        snippets: path_1.default.resolve(ribaShopifyTdaRoot, "src/snippets/"),
        sections: path_1.default.resolve(ribaShopifyTdaRoot, "src/sections/"),
        locales: path_1.default.resolve(ribaShopifyTdaRoot, "src/locales/"),
        config: path_1.default.resolve(ribaShopifyTdaRoot, "src/config/"),
        layout: path_1.default.resolve(ribaShopifyTdaRoot, "src/layout/"),
    };
}
/**
 * Try to get the config.deploy.yml from root of the shopify theme, otherwise try to get this file from the root of riba-shopify
 * @param configName
 * @returns The config content or null if the config file not exists
 */
const getYamlConfig = (configName) => {
    const filePath = path_1.default.resolve(exports.config.themeRoot, configName);
    if (!fs_1.default.existsSync(filePath)) {
        return null;
    }
    try {
        const data = fs_1.default.readFileSync(filePath, "utf8");
        const shopifyConfigs = js_yaml_1.default.load(data);
        return shopifyConfigs;
    }
    catch (error) {
        console.warn(error);
        const shopifyConfigs = js_yaml_1.default.load(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require(path_1.default.resolve(exports.config.ribaShopify.root, configName)));
        return shopifyConfigs;
    }
};
exports.getYamlConfig = getYamlConfig;
const getReleaseZipFilename = (envKey) => {
    return `${envKey}_${exports.config.packageJson.name}_${exports.config.packageJson.version}.zip`;
};
exports.getReleaseZipFilename = getReleaseZipFilename;
const getReleaseName = () => {
    const version = exports.config.packageJson.version;
    const name = exports.config.packageJson.name;
    return `${name} | ${version}`;
};
exports.getReleaseName = getReleaseName;
//# sourceMappingURL=config.js.map