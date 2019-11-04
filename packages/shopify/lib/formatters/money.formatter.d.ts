import { IFormatter } from '@ribajs/core';
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
export declare const moneyFormatter: IFormatter;
