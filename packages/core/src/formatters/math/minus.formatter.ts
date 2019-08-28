/**
 * Subtracts a number from an output.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#minus
 */
export const minus = {
  name: 'minus',
  read(a: string | number, b: string | number) {
    return Number(a) - Number(b);
  },
};
