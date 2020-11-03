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
const shopify_admin_api_1 = require("shopify-admin-api");
const config_1 = require("./includes/config");
const script_tags_1 = require("./includes/script-tags");
gulp_1.default.task("script-tags:list", () => __awaiter(void 0, void 0, void 0, function* () {
    const baseConfig = config_1.getYamlConfig(config_1.config.deployConfig);
    const externalScriptsConfig = config_1.getYamlConfig(config_1.config.externalScriptsConfig);
    for (const envKey in externalScriptsConfig) {
        gulp_util_1.default.log(`[${envKey}] "List script tags on "${baseConfig[envKey].store}"...`);
        const themeConfig = baseConfig[envKey];
        const scriptTagList = yield script_tags_1.list(themeConfig);
        gulp_util_1.default.log(scriptTagList);
    }
}));
/**
 * Reads the script tag sources from script-tags.yml and update or create them in the store
 */
gulp_1.default.task("script-tags:update", () => __awaiter(void 0, void 0, void 0, function* () {
    const baseConfig = config_1.getYamlConfig(config_1.config.deployConfig);
    const externalScriptsConfigs = config_1.getYamlConfig(config_1.config.externalScriptsConfig);
    for (const envKey in externalScriptsConfigs) {
        gulp_util_1.default.log(`[${envKey}] "List script tags on "${baseConfig[envKey].store}"...`);
        const themeConfig = baseConfig[envKey];
        const externalScriptsConfig = externalScriptsConfigs[envKey];
        const scriptTags = new shopify_admin_api_1.ScriptTags(themeConfig.store, themeConfig.password);
        const scriptTagList = yield scriptTags.list();
        gulp_util_1.default.log(scriptTagList);
        for (const scriptTagsConfig of externalScriptsConfig.scriptTags) {
            try {
                const result = yield script_tags_1.updateOrCreate(themeConfig, scriptTagsConfig);
                gulp_util_1.default.log(`${result.action} script tag: `, result.scriptTag);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
}));
/**
 * Reads the script tag sources from script-tags.yml and removes them from the store
 */
gulp_1.default.task("script-tags:delete", () => __awaiter(void 0, void 0, void 0, function* () {
    const baseConfig = config_1.getYamlConfig(config_1.config.deployConfig);
    const externalScriptsConfigs = config_1.getYamlConfig(config_1.config.externalScriptsConfig);
    for (const envKey in externalScriptsConfigs) {
        gulp_util_1.default.log(`[${envKey}] "List script tags on "${baseConfig[envKey].store}"...`);
        const themeConfig = baseConfig[envKey];
        return script_tags_1.deleteAll(themeConfig);
    }
}));
//# sourceMappingURL=script-tags.js.map