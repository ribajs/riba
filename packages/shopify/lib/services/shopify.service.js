"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
// declare global {
//   // tslint:disable: interface-name
//   interface Window { model: any; }
// }
/**
 * Custom version of shopify tools like api.jquery.js / option-selection.js
 * @see https://mayert-douglas4935.myshopify.com/pages/api
 */
class ShopifyService {
    constructor(shopSettings) {
        this.debug = core_1.Debug('service:ShopifyService');
        if (window.model && window.model.system && window.model.system.shopSettings) {
            this.moneyFormat = window.model.system.shopSettings.moneyFormat;
            this.moneyWithCurrencyFormat = window.model.system.shopSettings.moneyWithCurrencyFormat;
        }
        if (ShopifyService.instance) {
            return ShopifyService.instance;
        }
        this.debug('shop settings', this.moneyFormat);
        ShopifyService.instance = this;
    }
    /**
     * Custom version of Shopify.resizeImage
     * @param url
     * @param size
     * @param scale TODO
     * @param crop TODO
     * @param extension
     *
     * @see https://help.shopify.com/en/themes/liquid/filters/url-filters#img_url
     */
    static resizeImage(url, size, scale, crop, extension) {
        try {
            if ('original' === size) {
                return url;
            }
            const result = url.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
            if (!result || !result[1] || !result[2]) {
                throw new Error(`Can't match url ${url}`);
            }
            const path = result[1];
            extension = extension || result[2];
            return path + '_' + size + '.' + extension;
        }
        catch (error) {
            console.error(error);
            return url;
        }
    }
    formatMoneyWithCurrency(cents, format) {
        const formatString = format || this.moneyWithCurrencyFormat;
        this.formatMoney(cents, formatString);
    }
    /**
     * Custom version of Shopify.formatMoney
     * @param cents
     * @param format
     *
     * @see https://github.com/NathanPJF/deploybot-shopify/blob/master/assets/ajaxify.js.liquid
     * @see https://github.com/discolabs/cartjs/blob/master/src/utils.coffee
     * @see https://github.com/JumpLinkNetwork/shopify-productjs/blob/master/src/utilities.js
     */
    formatMoney(cents, format) {
        let value = '';
        const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        const formatString = format || this.moneyFormat;
        if (!formatString) {
            console.warn(`Can't parse format: ${formatString}`);
            return '0';
        }
        if (typeof cents === 'string') {
            cents = cents.replace('.', '');
        }
        // cents to float number
        cents = parseFloat(cents.toString());
        function formatWithDelimiters(num, precision = 2, thousands = ',', decimal = '.') {
            if (!core_1.Utils.isNumber(num) || num === null) {
                return '0';
            }
            const numStr = (num / 100.0).toFixed(precision);
            const parts = numStr.split('.');
            const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
            cents = parts[1] ? (decimal + parts[1]) : '';
            return dollars + cents;
        }
        const matchedFormat = formatString.match(placeholderRegex);
        if (matchedFormat !== null && matchedFormat.length >= 1) {
            switch (matchedFormat[1]) {
                case 'amount':
                    value = formatWithDelimiters(cents, 2);
                    break;
                case 'amount_no_decimals':
                    value = formatWithDelimiters(cents, 0);
                    break;
                case 'amount_with_comma_separator':
                    value = formatWithDelimiters(cents, 2, '.', ',');
                    break;
                case 'amount_no_decimals_with_comma_separator':
                    value = formatWithDelimiters(cents, 0, '.', ',');
                    break;
            }
            return formatString.replace(placeholderRegex, value);
        }
        console.warn(`Can't parse format: ${formatString}`);
        return '0';
    }
}
exports.ShopifyService = ShopifyService;
