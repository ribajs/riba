"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const money_formatter_1 = require("./money.formatter");
const shopify_service_1 = require("../services/shopify.service");
/**
 * Formats the price based on the shop's HTML with currency setting (if the format is not overwritten by passing a format parameter).
 * @see https://help.shopify.com/en/themes/liquid/filters/money-filters
 */
exports.moneyWithCurrencyFormatter = {
    name: 'money_with_currency',
    read(cents, format) {
        const formatString = format || shopify_service_1.ShopifyService.moneyWithCurrencyFormat;
        if (!money_formatter_1.moneyFormatter.read) {
            console.error(new Error('Can\'t find moneyFormatter\'s read method!'));
            return cents;
        }
        return money_formatter_1.moneyFormatter.read(cents, formatString);
    },
};
