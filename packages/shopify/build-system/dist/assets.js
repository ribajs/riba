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
const config_1 = require("./includes/config");
const assets_1 = require("./includes/assets");
require("./release"); // Imports the generate:config:live task
gulp_1.default.task("assets:list:live", () => __awaiter(void 0, void 0, void 0, function* () {
    const liveConfig = (0, config_1.getYamlConfig)(config_1.config.liveConfig);
    const externalScriptsConfig = (0, config_1.getYamlConfig)(config_1.config.externalScriptsConfig);
    for (const envKey in externalScriptsConfig) {
        gulp_util_1.default.log(`[${envKey}] "List assets on "${liveConfig[envKey].store}"...`);
        const liveThemeConfig = liveConfig[envKey];
        const assetList = yield (0, assets_1.list)(liveThemeConfig);
        gulp_util_1.default.log(assetList);
    }
}));
gulp_1.default.task("assets:update:live", () => __awaiter(void 0, void 0, void 0, function* () {
    const liveConfig = (0, config_1.getYamlConfig)(config_1.config.liveConfig);
    const externalScriptsConfig = (0, config_1.getYamlConfig)(config_1.config.externalScriptsConfig);
    for (const envKey in externalScriptsConfig) {
        const liveThemeConfig = liveConfig[envKey];
        const extAssetsConfig = externalScriptsConfig[envKey].assets;
        for (const extAssetConfig of extAssetsConfig) {
            gulp_util_1.default.log(`[${envKey}] "Get "${extAssetConfig.key}" from "${liveConfig[envKey].store}"...`);
            const extAsset = yield (0, assets_1.updateOrCreate)(liveThemeConfig, extAssetConfig);
            gulp_util_1.default.log(extAsset);
        }
    }
}));
gulp_1.default.task("assets:list", gulp_1.default.series("generate:config:live", "assets:list:live"));
gulp_1.default.task("assets:update", gulp_1.default.series("generate:config:live", "assets:update:live"));
//# sourceMappingURL=assets.js.map