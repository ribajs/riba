"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const shopify_easdk_1 = require("../interfaces/shopify-easdk");
class WrapperService {
    constructor(shopifyApp) {
        this.event = new core_1.EventDispatcher('shopify-easdk');
        if (!shopifyApp && !shopify_easdk_1.ShopifyApp) {
            throw new Error(WrapperService.ERRORS.EASDK_NOT_FOUND);
        }
        this.shopifyApp = shopifyApp || shopify_easdk_1.ShopifyApp;
        this.debug = core_1.Debug('services:' + this.constructor.name);
    }
    static inIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    useFallback(force) {
        return !WrapperService.inIframe() || force;
    }
}
exports.WrapperService = WrapperService;
WrapperService.ERRORS = {
    EASDK_NOT_FOUND: `Shopify's EASDK is required!
    Add <script src="https://cdn.shopify.com/s/assets/external/app.js"></script> to your html head.
    See https://help.shopify.com/en/api/embedded-apps/embedded-app-sdk for more informations.`,
};
