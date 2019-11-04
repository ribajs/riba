"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
/**
 * Custom version of shopify tools like api.jquery.js / option-selection.js
 * @see https://mayert-douglas4935.myshopify.com/pages/api
 */
class ShopifyService {
    constructor(shopSettings) {
        if (ShopifyService.instance) {
            return ShopifyService.instance;
        }
        ShopifyService.instance = this;
    }
    static formatMoneyWithDelimiters(num, precision = 2, thousands = ',', decimal = '.') {
        if (!core_1.Utils.isNumber(num) || num === null) {
            return '0';
        }
        const numStr = (num / 100.0).toFixed(precision);
        const parts = numStr.split('.');
        const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        const cents = parts[1] ? (decimal + parts[1]) : '';
        return dollars + cents;
    }
    static get moneyWithCurrencyFormat() {
        if (window.model && window.model.system && window.model.system.shopSettings) {
            return window.model.system.shopSettings.moneyWithCurrencyFormat;
        }
    }
    static get moneyFormat() {
        if (window.model && window.model.system && window.model.system.shopSettings) {
            return window.model.system.shopSettings.moneyFormat;
        }
    }
}
exports.ShopifyService = ShopifyService;
