/**
 * Multiplies an output by a number.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#times
 */
export const timesFormatter = (a: string | number, b: string | number) => {
  return Number(a) * Number(b);
};
