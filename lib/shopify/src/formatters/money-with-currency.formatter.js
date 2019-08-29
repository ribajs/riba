"use strict";
/* tslint:disable:variable-name */
Object.defineProperty(exports, "__esModule", { value: true });
const shopify_service_1 = require("../services/shopify.service");
const shopifyService = new shopify_service_1.ShopifyService();
/**
 * Formats the price based on the shop's HTML with currency setting (if the format is not overwritten by passing a format parameter).
 * @see https://help.shopify.com/en/themes/liquid/filters/money-filters
 */
exports.money_with_currency = shopifyService.formatMoneyWithCurrency;
