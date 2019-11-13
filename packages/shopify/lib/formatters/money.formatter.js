"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shopify_service_1 = require("../services/shopify.service");
/**
 * Formats the price based on the shop's HTML with currency setting (if the format is not overwritten by passing a format parameter).
 * @param cents
 * @param format
 *
 * @see https://github.com/NathanPJF/deploybot-shopify/blob/master/assets/ajaxify.js.liquid
 * @see https://github.com/discolabs/cartjs/blob/master/src/utils.coffee
 * @see https://github.com/JumpLinkNetwork/shopify-productjs/blob/master/src/utilities.js
 * @see https://help.shopify.com/en/themes/liquid/filters/money-filters
 */
exports.moneyFormatter = {
    name: 'money',
    read(cents, format) {
        let value = '';
        const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        const formatString = format || this.moneyFormat;
        if (!formatString) {
            console.warn(`Can't parse format: ${formatString}`);
            return '0';
        }
        if (typeof cents === 'string') {
            cents = cents.replace('.', '');
            // cents to float number
            cents = parseFloat(cents.toString());
        }
        const matchedFormat = formatString.match(placeholderRegex);
        if (matchedFormat !== null && matchedFormat.length >= 1) {
            switch (matchedFormat[1]) {
                case 'amount':
                    value = shopify_service_1.ShopifyService.formatMoneyWithDelimiters(cents, 2);
                    break;
                case 'amount_no_decimals':
                    value = shopify_service_1.ShopifyService.formatMoneyWithDelimiters(cents, 0);
                    break;
                case 'amount_with_comma_separator':
                    value = shopify_service_1.ShopifyService.formatMoneyWithDelimiters(cents, 2, '.', ',');
                    break;
                case 'amount_no_decimals_with_comma_separator':
                    value = shopify_service_1.ShopifyService.formatMoneyWithDelimiters(cents, 0, '.', ',');
                    break;
            }
            return formatString.replace(placeholderRegex, value);
        }
        console.warn(`Can't parse format: ${formatString}`);
        return '0';
    },
};
