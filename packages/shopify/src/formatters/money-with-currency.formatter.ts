import { Formatter } from "@ribajs/core/src/index.js";
import { moneyFormatter } from "./money.formatter.js";
import { ShopifyService } from "../services/shopify.service.js";

/**
 * Formats the price based on the shop's HTML with currency setting (if the format is not overwritten by passing a format parameter).
 * @see https://help.shopify.com/en/themes/liquid/filters/money-filters
 */
export const moneyWithCurrencyFormatter: Formatter = {
  name: "money_with_currency",
  read(cents: string | number, format?: string) {
    const formatString = format || ShopifyService.moneyWithCurrencyFormat;
    if (!moneyFormatter.read) {
      console.error(new Error("Can't find moneyFormatter's read method!"));
      return cents;
    }
    return moneyFormatter.read(cents, formatString);
  },
};
