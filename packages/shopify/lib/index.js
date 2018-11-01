"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./interfaces/interfaces"));
const components = __importStar(require("./components/shopify.components"));
const formatters = __importStar(require("./formatters/shopify.formatters"));
const services = __importStar(require("./services/shopify.services"));
exports.shopifyExtension = {
    formatters,
    services,
    components,
};
// Add Shopify-specific formatters for Rivets.js.
// export const money = (value, currency) => {
//   return Utils.formatMoney(value, ProductJS.settings.moneyFormat, 'money_format', currency);
// };
// export const moneyWithCurrency = (value, currency) => {
//   return Utils.formatMoney(value, ProductJS.settings.moneyWithCurrencyFormat, 'money_with_currency_format', currency);
// };
// export const weight = (grams) => {
//   switch (CartJS.settings.weightUnit) {
//     case 'kg':
//       return (grams / 1000).toFixed(CartJS.settings.weightPrecision);
//     case 'oz':
//       return (grams * 0.035274).toFixed(CartJS.settings.weightPrecision);
//     case 'lb':
//       return (grams * 0.00220462).toFixed(CartJS.settings.weightPrecision);
//     default:
//       return grams.toFixed(CartJS.settings.weightPrecision);
//   }
// };
/**
 * Formats the product variant's weight. The weight unit is set in General Settings.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#weightWithUnit
 */
// export const weightWithUnit = (grams) => {
//   return export const weight(grams) + CartJS.settings.weightUnit;
// };
// export const productImageSize = (src, size) => {
//   return CartJS.Utils.getSizedImageUrl(src, size);
// };
