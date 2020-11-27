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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShop = exports.getAsset = void 0;
const shopify_admin_api_1 = require("shopify-admin-api");
const type_1 = require("@ribajs/utils/src/type");
/**
 * Download files from the theme
 * @param themeConfig
 * @param key e.g. "config/settings_data.json"
 */
const getAsset = (themeConfig, key) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = new shopify_admin_api_1.Assets(themeConfig.store, themeConfig.password);
    const themeId = Number(themeConfig.theme_id);
    if (!type_1.isNumber(themeId)) {
        throw new Error(`"theme_id" property in theme config must be a number, but is "${themeConfig.theme_id}"`);
    }
    const settingsData = yield assets.get(themeId, key);
    return settingsData;
});
exports.getAsset = getAsset;
const getShop = (themeConfig, options) => __awaiter(void 0, void 0, void 0, function* () {
    const shops = new shopify_admin_api_1.Shops(themeConfig.store, themeConfig.password);
    const shopData = yield shops.get(options);
    return shopData;
});
exports.getShop = getShop;
//# sourceMappingURL=shopify-api.js.map