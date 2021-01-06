"use strict";
/**
 * https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/includes/config.js
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReleaseName = exports.getReleaseZipFilename = exports.getYamlConfig = exports.config = void 0;
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("debug")("@ribajs/shopify");
const find_root_1 = __importDefault(require("find-root"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const utilities_1 = require("./utilities");
const themeRoot = find_root_1.default(process.cwd());
let ribaShopifyRoot = path_1.default.resolve(__dirname, "../../../");
let ribaShopifyTdaRoot = null;
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
// Get relative path of @ribajs/shopify
if ((pkg === null || pkg === void 0 ? void 0 : pkg.dependencies) && (pkg === null || pkg === void 0 ? void 0 : pkg.dependencies["@ribajs/shopify"])) {
    const ribaShopifyPath = require.resolve("@ribajs/shopify");
    ribaShopifyRoot = path_1.default.resolve(themeRoot, ribaShopifyPath);
}
if ((pkg === null || pkg === void 0 ? void 0 : pkg.resolutions) && ((_a = pkg === null || pkg === void 0 ? void 0 : pkg.resolutions["@ribajs/shopify"]) === null || _a === void 0 ? void 0 : _a.includes("portal:"))) {
    const ribaShopifyPath = pkg.resolutions["@ribajs/shopify"].split("portal:")[1];
    ribaShopifyRoot = path_1.default.resolve(themeRoot, ribaShopifyPath);
}
// Get relative path of @ribajs/shopify-tda
if ((pkg === null || pkg === void 0 ? void 0 : pkg.dependencies) && (pkg === null || pkg === void 0 ? void 0 : pkg.dependencies["@ribajs/shopify-tda"])) {
    const ribaShopifyTdaPath = require.resolve("@ribajs/shopify-tda");
    ribaShopifyTdaRoot = path_1.default.resolve(themeRoot, ribaShopifyTdaPath);
}
if ((pkg === null || pkg === void 0 ? void 0 : pkg.resolutions) && ((_b = pkg === null || pkg === void 0 ? void 0 : pkg.resolutions["@ribajs/shopify-tda"]) === null || _b === void 0 ? void 0 : _b.includes("portal:"))) {
    const ribaShopifyTdaPath = pkg.resolutions["@ribajs/shopify-tda"].split("portal:")[1];
    ribaShopifyTdaRoot = path_1.default.resolve(themeRoot, ribaShopifyTdaPath);
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
        src: {
            root: ribaShopifyTdaRoot ? path_1.default.resolve(ribaShopifyTdaRoot, "src/") : "",
            json: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/") + "/**/*.json"
                : "",
            assets: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/assets/") + "/**/*"
                : "",
            icons: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/icons/") + "/**/*.svg"
                : "",
            templates: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/templates/") + "/**/*"
                : "",
            snippets: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/snippets/") + "/*"
                : "",
            sections: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/sections/") + "/*"
                : "",
            locales: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/locales/") + "/*"
                : "",
            config: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/config/") + "/*"
                : "",
            layout: ribaShopifyTdaRoot
                ? path_1.default.resolve(ribaShopifyTdaRoot, "src/layout/") + "/*"
                : "",
        },
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
            ],
        },
    },
};
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