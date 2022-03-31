"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const release_cjs_1 = require("./includes/release.cjs");
const prompts_cjs_1 = require("./includes/prompts.cjs");
const theme_cjs_1 = require("./includes/theme.cjs");
const messages_cjs_1 = __importDefault(require("./includes/messages.cjs"));
const upload_cjs_1 = require("./includes/upload.cjs");
const shopify_api_cjs_1 = require("./includes/shopify-api.cjs");
const fs_1 = require("fs");
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const config_cjs_1 = require("./includes/config.cjs");
require("./theme.cjs"); // import theme tasks
require("./build.cjs"); // import build tasks
gulp_1.default.task("generate:config:live", () => __awaiter(void 0, void 0, void 0, function* () {
    const baseConfig = config_cjs_1.config.deployConfig;
    const targetConfig = config_cjs_1.config.liveConfig;
    gulp_util_1.default.log(`Load ${baseConfig} as base config file for store and password...`);
    const liveConfigs = yield (0, theme_cjs_1.generateEnvLiveThemeConfig)(baseConfig);
    const configPath = path_1.default.resolve(config_cjs_1.config.themeRoot, targetConfig);
    const yamlConfig = js_yaml_1.default.dump(liveConfigs);
    gulp_util_1.default.log(`Write "${targetConfig}" to ${configPath}...`);
    return fs_1.promises.writeFile(configPath, yamlConfig);
}));
gulp_1.default.task("generate:config:deploy", () => __awaiter(void 0, void 0, void 0, function* () {
    const baseConfig = config_cjs_1.config.deployConfig;
    const targetConfig = config_cjs_1.config.deployConfig;
    gulp_util_1.default.log(`Load ${baseConfig} as base config file for store and password...`);
    const liveConfigs = yield (0, theme_cjs_1.generateEnvYoungestThemeConfig)(baseConfig);
    const configPath = path_1.default.resolve(config_cjs_1.config.themeRoot, targetConfig);
    const yamlConfig = js_yaml_1.default.dump(liveConfigs);
    gulp_util_1.default.log(`Overwrite "${targetConfig}" to ${configPath}...`);
    return fs_1.promises.writeFile(configPath, yamlConfig);
}));
gulp_1.default.task("backup:locale", () => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log(`Load ${config_cjs_1.config.liveConfig}...`);
    // copy
    const liveConfigs = Object.assign({}, (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.liveConfig));
    yield fs_1.promises.mkdir(config_cjs_1.config.backup, { recursive: true });
    gulp_util_1.default.log(`Get primary locale file of each environment...`);
    for (const envKey in liveConfigs) {
        if (liveConfigs[envKey]) {
            const themeConfig = liveConfigs[envKey];
            const shopData = yield (0, shopify_api_cjs_1.getShop)(themeConfig);
            const locale = shopData.primary_locale;
            gulp_util_1.default.log(`[${envKey}] locale: ${locale}`);
            let localeData = {};
            let localeFilename = `${locale}.json`;
            try {
                localeData = yield (0, shopify_api_cjs_1.getAsset)(themeConfig, `locales/${localeFilename}`);
            }
            catch (error) {
                try {
                    localeFilename = `${locale}.default.json`;
                    localeData = yield (0, shopify_api_cjs_1.getAsset)(themeConfig, `locales/${localeFilename}`);
                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
            }
            const writePath = path_1.default.resolve(config_cjs_1.config.backup, `${envKey}_${localeFilename}`);
            yield fs_1.promises.writeFile(writePath, localeData.value);
        }
    }
}));
gulp_1.default.task("backup:settings_data", () => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log(`Load ${config_cjs_1.config.liveConfig}...`);
    // copy
    const liveConfigs = Object.assign({}, (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.liveConfig));
    yield fs_1.promises.mkdir(config_cjs_1.config.backup, { recursive: true });
    gulp_util_1.default.log(`Get "config/settings_data.json" of each environment...`);
    for (const envKey in liveConfigs) {
        if (liveConfigs[envKey]) {
            gulp_util_1.default.log(`[${envKey}] Get config/settings_data.json...`);
            const themeConfig = liveConfigs[envKey];
            const settingsData = yield (0, shopify_api_cjs_1.getAsset)(themeConfig, "config/settings_data.json");
            const writePath = path_1.default.resolve(config_cjs_1.config.backup, `${envKey}_settings_data.json`);
            yield fs_1.promises.writeFile(writePath, settingsData.value);
        }
    }
}));
gulp_1.default.task("build:zips", () => __awaiter(void 0, void 0, void 0, function* () {
    const baseConfig = (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.deployConfig);
    for (const envKey in baseConfig) {
        if (baseConfig[envKey]) {
            gulp_util_1.default.log(`[${envKey}] Get config/settings_data.json...`);
            gulp_util_1.default.log(`[${envKey}] Get config/settings_data.json...`);
            const settingsDataPath = path_1.default.resolve(config_cjs_1.config.backup, `${envKey}_settings_data.json`);
            const settingsData = yield fs_1.promises.readFile(settingsDataPath);
            yield (0, release_cjs_1.compressForStore)(envKey, settingsData);
        }
    }
}));
/**
 * Uploads the zip files to bitbucket downloads
 */
gulp_1.default.task("upload:zips", () => __awaiter(void 0, void 0, void 0, function* () {
    const baseConfig = (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.deployConfig);
    for (const envKey in baseConfig) {
        if (baseConfig[envKey]) {
            const zipFilePath = path_1.default.resolve(config_cjs_1.config.upload, (0, config_cjs_1.getReleaseZipFilename)(envKey));
            yield (0, upload_cjs_1.uploadFile)(zipFilePath);
        }
    }
}));
gulp_1.default.task("deploy:zips", () => __awaiter(void 0, void 0, void 0, function* () {
    const createdThemes = []; //
    const deployConfig = (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.deployConfig);
    const themeName = global.themeName || (0, config_cjs_1.getReleaseName)();
    for (const envKey in deployConfig) {
        const filename = (0, config_cjs_1.getReleaseZipFilename)(envKey);
        const src = yield (0, upload_cjs_1.getDownloadFileUrl)(filename);
        if (!src) {
            gulp_util_1.default.log(gulp_util_1.default.colors.yellow(`Skip deploy zip`));
            return null;
        }
        const zipFilename = path_1.default.basename(src).split("?")[0];
        gulp_util_1.default.log(zipFilename);
        gulp_util_1.default.log(`[${envKey}] Deploy "${zipFilename}" as "${themeName}" on "${deployConfig[envKey].store}"...`);
        try {
            const createdTheme = yield (0, theme_cjs_1.createStoreTheme)(deployConfig[envKey], themeName, src);
            createdThemes.push(createdTheme);
        }
        catch (error) {
            console.error(error);
        }
    }
    return createdThemes;
}));
/**
 * Delete them oldeset theme if the theme limit of 100 themes are reached
 */
gulp_1.default.task("theme:delete-oldest-on-limit", () => __awaiter(void 0, void 0, void 0, function* () {
    const LIMIT = 100;
    const promises = [];
    const baseConfig = (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.deployConfig);
    for (const envKey in baseConfig) {
        const themes = yield (0, theme_cjs_1.getStoreThemes)(baseConfig[envKey]);
        const count = themes.length;
        gulp_util_1.default.log(`[${envKey}] Count of themes: ${count}/${LIMIT}`);
        if (count >= LIMIT) {
            const oldestEnvTheme = yield (0, theme_cjs_1.getOldestEnvTheme)();
            gulp_util_1.default.log(messages_cjs_1.default.colorize(`[${envKey}] Are you sure that you want to delete the following theme unrecoverably? (type "yes" or "no")`, "danger"));
            (0, theme_cjs_1.print)(envKey, oldestEnvTheme[envKey]);
            const remove = yield (0, prompts_cjs_1.promptYesNo)(`[${envKey}] You have reached the maximum limit of themes (${LIMIT}) in your shop "${oldestEnvTheme[envKey].store}", do you want to delete the oldest theme "${oldestEnvTheme[envKey].name}"?`, "danger");
            if (!remove) {
                return process.exit(0);
            }
            promises.push((0, theme_cjs_1.remove)(baseConfig[envKey], oldestEnvTheme[envKey].id));
        }
    }
    return Promise.all(promises);
}));
gulp_1.default.task("theme:name", () => __awaiter(void 0, void 0, void 0, function* () {
    const name = yield (0, prompts_cjs_1.promptInput)("What do you want to call this release? (Press enter to accept the default name)", (0, config_cjs_1.getReleaseName)(), "name", "success");
    global.themeName = name;
    gulp_util_1.default.log(`Release name: ${global.themeName}`);
    return global.themeName;
}));
gulp_1.default.task("release:new", gulp_1.default.series("theme:name", "theme:delete-oldest-on-limit", "generate:config:live", "backup:locale", "backup:settings_data", "build", "build:zips", "upload:zips", "deploy:zips", "themes:list:youngest"));
gulp_1.default.task("release:zip", gulp_1.default.series("theme:name", "build", "build:zips", "deploy:zips"));
//# sourceMappingURL=release.cjs.map