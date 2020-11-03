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
/**
 * Download files from the theme
 * @param themeConfig
 * @param key e.g. "config/settings_data.json"
 */
exports.getAsset = (themeConfig, key) => __awaiter(void 0, void 0, void 0, function* () {
    const assets = new shopify_admin_api_1.Assets(themeConfig.store, themeConfig.password);
    const settingsData = yield assets.get(themeConfig.theme_id, key);
    return settingsData;
});
exports.getShop = (themeConfig, options) => __awaiter(void 0, void 0, void 0, function* () {
    const shops = new shopify_admin_api_1.Shops(themeConfig.store, themeConfig.password);
    const shopData = yield shops.get(options);
    return shopData;
});
//# sourceMappingURL=shopify-api.js.map