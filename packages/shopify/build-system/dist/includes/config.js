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
const logger = require("debug")("slate-tools");
const find_root_1 = __importDefault(require("find-root"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const utilities_1 = __importDefault(require("./utilities"));
const themeRoot = find_root_1.default(process.cwd());
let sharedCodeRoot = path_1.default.resolve(__dirname, "../../../");
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
// Get relative path of shared code
if (pkg &&
    pkg.resolutions &&
    pkg.resolutions["shared-code"] &&
    pkg.resolutions["shared-code"].includes("portal:")) {
    const sharedCodeRPath = pkg.resolutions["shared-code"].split("portal:")[1];
    sharedCodeRoot = path_1.default.resolve(themeRoot, sharedCodeRPath);
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
        jsPath: path_1.default.resolve(themeRoot, "src/scripts/"),
        vendorJs: "src/scripts/vendor.js",
        ts: "src/ts/**/*.ts",
        css: "src/styles/*.{css,scss}",
    },
    sharedCode: {
        root: sharedCodeRoot,
        src: {
            root: path_1.default.resolve(sharedCodeRoot, "src/"),
            js: path_1.default.resolve(sharedCodeRoot, "src/js/") + "/**/*.{js,js.liquid}",
            vendorJs: path_1.default.resolve(sharedCodeRoot, "src/js/") + "/vendor/*.js",
            ts: path_1.default.resolve(sharedCodeRoot, "src/ts/") + "/**/*.ts",
            json: path_1.default.resolve(sharedCodeRoot, "src/") + "/**/*.json",
            css: path_1.default.resolve(sharedCodeRoot, "src/styles/") +
                "/**/*.{css,scss,scss.liquid}",
            cssLint: path_1.default.resolve(sharedCodeRoot, "src/styles/") + "/**/*.{css,scss}",
            assets: path_1.default.resolve(sharedCodeRoot, "src/assets/") + "/**/*",
            icons: path_1.default.resolve(sharedCodeRoot, "src/icons/") + "/**/*.svg",
            templates: path_1.default.resolve(sharedCodeRoot, "src/templates/") + "/**/*",
            snippets: path_1.default.resolve(sharedCodeRoot, "src/snippets/") + "/*",
            sections: path_1.default.resolve(sharedCodeRoot, "src/sections/") + "/*",
            locales: path_1.default.resolve(sharedCodeRoot, "src/locales/") + "/*",
            config: path_1.default.resolve(sharedCodeRoot, "src/config/") + "/*",
            layout: path_1.default.resolve(sharedCodeRoot, "src/layout/") + "/*",
        },
        roots: {
            js: path_1.default.resolve(sharedCodeRoot, "src/js/") + "/*.{js,js.liquid}",
            jsPath: path_1.default.resolve(sharedCodeRoot, "src/js/"),
            vendorJs: path_1.default.resolve(sharedCodeRoot, "src/js/vendor.js"),
            css: path_1.default.resolve(sharedCodeRoot, "src/styles/") + "/*.{css,scss}",
            cssPath: path_1.default.resolve(sharedCodeRoot, "src/styles/"),
        },
    },
    plugins: {
        cheerio: {
            run: utilities_1.default.processSvg,
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
const getYamlConfig = (configName) => {
    try {
        const data = fs_1.default.readFileSync(path_1.default.resolve(exports.config.themeRoot, configName), "utf8");
        const shopifyConfigs = js_yaml_1.default.safeLoad(data);
        return shopifyConfigs;
    }
    catch (error) {
        console.warn(error);
        const shopifyConfigs = js_yaml_1.default.safeLoad(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require(path_1.default.resolve(exports.config.sharedCode.root, configName)));
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