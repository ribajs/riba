/* tslint:disable:variable-name */

import { ShopifyService } from '../services/shopify.service';

const shopifyService = new ShopifyService();

/**
 * Formats the price based on the shop's HTML with currency setting (if the format is not overwritten by passing a format parameter).
 * @see https://help.shopify.com/en/themes/liquid/filters/money-filters
 */
export const money_with_currency = shopifyService.formatMoneyWithCurrency;
