import { IFormatters } from '../../formatter.service';

// special helper formatters
import { debug } from './debug.formatter';
import { def } from './def.formatter';
import { call } from './call.formatter';
import { currency } from './currency.formatter';

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

export { debug, def, currency };

export const specialFormatters: IFormatters = {
  debug, def, call, currency,
};
