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
exports.generateEnvYoungestThemeConfig = exports.generateEnvLiveThemeConfig = exports.getEnvSettingsData = exports.getYoungestEnvTheme = exports.getOldestEnvTheme = exports.getSortedThemesByCreatedDate = exports.createStoreTheme = exports.remove = exports.getStoresThemesByRole = exports.getStoresThemes = exports.getStoreThemes = exports.print = void 0;
const shopify_admin_api_1 = require("shopify-admin-api");
const shopify_api_cjs_1 = require("./shopify-api.cjs");
const config_cjs_1 = require("./config.cjs");
const moment_1 = __importDefault(require("moment"));
/**
 * Print theme data
 * @param env
 * @param theme
 */
const print = (env, theme) => {
    console.log(`\n\n======  ${env.toUpperCase()}  ======`);
    // console.log("Env:\t" + env);
    console.log("Name:\t" + theme.name);
    console.log("ID:\t" + theme.id);
    console.log("Store:\t" + theme.store);
    console.log("Created:\t" + theme.created_at_moment.calendar());
    console.log("Updated:\t" + theme.updated_at_moment.calendar());
    console.log(`Edit settings:\t https://${theme.store}/admin/themes/${theme.id}/editor`);
    console.log(`Edit code:\t https://${theme.store}/admin/themes/${theme.id}`);
    console.log(`Preview:\t https://${theme.store}/?_ab=0&_fd=0&_sc=1&preview_theme_id=${theme.id}`);
};
exports.print = print;
const getStoreThemes = (themeConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const themeApi = new shopify_admin_api_1.Themes(themeConfig.store, themeConfig.password);
    const store = themeConfig.store;
    const themes = yield themeApi.list();
    for (const theme of themes) {
        theme.store = store;
        if (theme.created_at) {
            theme.created_at_moment = (0, moment_1.default)(theme.created_at);
        }
        if (theme.updated_at) {
            theme.updated_at_moment = (0, moment_1.default)(theme.updated_at);
        }
    }
    return themes;
});
exports.getStoreThemes = getStoreThemes;
const getStoresThemes = () => __awaiter(void 0, void 0, void 0, function* () {
    const themesByEnv = {};
    const shopifyConfigs = (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.deployConfig);
    for (const envKey in shopifyConfigs) {
        if (shopifyConfigs[envKey]) {
            const themeConfig = shopifyConfigs[envKey];
            const themes = yield (0, exports.getStoreThemes)(themeConfig);
            themesByEnv[envKey] = themes;
        }
    }
    return themesByEnv;
});
exports.getStoresThemes = getStoresThemes;
const getStoresThemesByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const envThemes = yield (0, exports.getStoresThemes)();
    for (const envKey in envThemes) {
        if (envThemes[envKey]) {
            let themes = envThemes[envKey];
            themes = themes.filter((theme) => theme.role === role);
            envThemes[envKey] = themes;
        }
    }
    return envThemes;
});
exports.getStoresThemesByRole = getStoresThemesByRole;
const remove = (themeConfig, id) => __awaiter(void 0, void 0, void 0, function* () {
    const themeApi = new shopify_admin_api_1.Themes(themeConfig.store, themeConfig.password);
    return themeApi.delete(id);
});
exports.remove = remove;
const createStoreTheme = (themeConfig, themeName, zipSrc) => __awaiter(void 0, void 0, void 0, function* () {
    const themeApi = new shopify_admin_api_1.Themes(themeConfig.store, themeConfig.password);
    return themeApi.create({
        role: "unpublished",
        src: zipSrc,
        name: themeName,
    });
});
exports.createStoreTheme = createStoreTheme;
const getSortedThemesByCreatedDate = (ascending) => __awaiter(void 0, void 0, void 0, function* () {
    const envThemes = yield (0, exports.getStoresThemes)();
    for (const envKey in envThemes) {
        if (envThemes[envKey]) {
            let themes = envThemes[envKey];
            themes = themes.sort((a, b) => {
                if (ascending) {
                    return a.created_at_moment.unix() - b.created_at_moment.unix();
                }
                else {
                    return b.created_at_moment.unix() - a.created_at_moment.unix();
                }
            });
            envThemes[envKey] = themes;
        }
    }
    return envThemes;
});
exports.getSortedThemesByCreatedDate = getSortedThemesByCreatedDate;
const getOldestEnvTheme = () => __awaiter(void 0, void 0, void 0, function* () {
    const envThemes = yield (0, exports.getSortedThemesByCreatedDate)(true);
    const envTheme = {};
    for (const envKey in envThemes) {
        if (envThemes[envKey]) {
            const themes = envThemes[envKey];
            envTheme[envKey] = themes[0];
        }
    }
    return envTheme;
});
exports.getOldestEnvTheme = getOldestEnvTheme;
const getYoungestEnvTheme = () => __awaiter(void 0, void 0, void 0, function* () {
    const envThemes = yield (0, exports.getSortedThemesByCreatedDate)(false);
    const envTheme = {};
    for (const envKey in envThemes) {
        if (envThemes[envKey]) {
            const themes = envThemes[envKey];
            envTheme[envKey] = themes[0];
        }
    }
    return envTheme;
});
exports.getYoungestEnvTheme = getYoungestEnvTheme;
const getEnvSettingsData = (shopifyConfigs) => __awaiter(void 0, void 0, void 0, function* () {
    const settingsDataEnv = {};
    for (const envKey in shopifyConfigs) {
        if (shopifyConfigs[envKey]) {
            const themeConfig = shopifyConfigs[envKey];
            const settingsData = yield (0, shopify_api_cjs_1.getAsset)(themeConfig, "config/settings_data.json");
            settingsDataEnv[envKey] = settingsData;
        }
    }
    return settingsDataEnv;
});
exports.getEnvSettingsData = getEnvSettingsData;
/**
 * Returns an object based on config.deploy.yml but with the current published theme id's
 */
const generateEnvLiveThemeConfig = (baseConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const themesByEnv = yield (0, exports.getStoresThemesByRole)("main");
    const shopifyLiveThemeConfigs = Object.assign({}, (0, config_cjs_1.getYamlConfig)(baseConfig));
    for (const envKey in shopifyLiveThemeConfigs) {
        shopifyLiveThemeConfigs[envKey].theme_id = themesByEnv[envKey][0].id;
    }
    return shopifyLiveThemeConfigs;
});
exports.generateEnvLiveThemeConfig = generateEnvLiveThemeConfig;
/**
 * Returns an object based on the current config.deploy.yml but with the youngest theme id's
 */
const generateEnvYoungestThemeConfig = (baseConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const themesByEnv = yield (0, exports.getYoungestEnvTheme)();
    const shopifyLiveThemeConfigs = Object.assign({}, (0, config_cjs_1.getYamlConfig)(baseConfig));
    for (const envKey in shopifyLiveThemeConfigs) {
        shopifyLiveThemeConfigs[envKey].theme_id = themesByEnv[envKey].id;
    }
    return shopifyLiveThemeConfigs;
});
exports.generateEnvYoungestThemeConfig = generateEnvYoungestThemeConfig;
//# sourceMappingURL=theme.cjs.map