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
exports.updateOrCreate = exports.list = void 0;
const shopify_admin_api_1 = require("shopify-admin-api");
const gulp_util_1 = __importDefault(require("gulp-util"));
const utilities_cjs_1 = require("./utilities.cjs");
const list = (themeConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = new shopify_admin_api_1.Assets(themeConfig.store, themeConfig.password);
    const themeId = Number(themeConfig.theme_id);
    if (!(0, utilities_cjs_1.isNumber)(themeId)) {
        throw new Error(`"theme_id" property in theme config must be a number, but is "${themeConfig.theme_id}"`);
    }
    const assetsList = yield assets.list(themeId);
    return assetsList;
});
exports.list = list;
const updateOrCreate = (themeConfig, extAssetsConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = new shopify_admin_api_1.Assets(themeConfig.store, themeConfig.password);
    let asset = null;
    const themeId = Number(themeConfig.theme_id);
    if (!(0, utilities_cjs_1.isNumber)(themeId)) {
        throw new Error(`"theme_id" property in theme config must be a number, but is "${themeConfig.theme_id}"`);
    }
    try {
        asset = yield assets.get(themeId, extAssetsConfig.key);
    }
    catch (error) {
        // If not found
        if (error.statusCode === 404) {
            asset = null;
        }
        else {
            throw error;
        }
    }
    if (asset) {
        gulp_util_1.default.log(`Update asset tag: ${extAssetsConfig.key}`);
    }
    else {
        gulp_util_1.default.log(`Create asset tag: ${extAssetsConfig.key}`);
    }
    asset = yield assets.update(themeId, {
        key: extAssetsConfig.key,
        src: extAssetsConfig.src,
    });
    return asset;
});
exports.updateOrCreate = updateOrCreate;
//# sourceMappingURL=assets.cjs.map