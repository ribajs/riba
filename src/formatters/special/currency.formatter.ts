/**
 * Formats a number as a currency (ie $1,234.56). When no currency symbol is provided, default symbol for current locale is used.
 * @param amount Input to filter.
 * @param symbol Currency symbol or identifier to be displayed. (optional)
 * @see https://docs.angularjs.org/api/ng/filter/currency
 */
export const currency = (amount: number, symbol: string) => {
  let result = amount.toFixed(2).toString().replace('.', ',');
  if (symbol) {
    result = result + symbol;
  }
  return result;
};