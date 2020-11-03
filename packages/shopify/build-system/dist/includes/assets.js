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
exports.list = (themeConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = new shopify_admin_api_1.Assets(themeConfig.store, themeConfig.password);
    const assetsList = yield assets.list(themeConfig.theme_id);
    return assetsList;
});
exports.updateOrCreate = (themeConfig, extAssetsConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = new shopify_admin_api_1.Assets(themeConfig.store, themeConfig.password);
    let asset = null;
    try {
        asset = yield assets.get(themeConfig.theme_id, extAssetsConfig.key);
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
    asset = yield assets.update(themeConfig.theme_id, {
        key: extAssetsConfig.key,
        src: extAssetsConfig.src,
    });
    return asset;
});
//# sourceMappingURL=assets.js.map