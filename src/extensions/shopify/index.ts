export * from './interfaces/interfaces.d';
export * from './components/shopify-section.component';
export * from './components/shopify-section.component';
import { img_url } from './formatters/img-url.formatter';
import { money } from './formatters/money.formatter';
import { money_with_currency } from './formatters/money-with-currency.formatter';

export const formatters = {
  img_url,
  money,
  money_with_currency,
};

export const shopifyExtension = {
  formatters,
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
