/**
 * Adds a number to an value.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#plus
 */
export const plusFormatter = {
  name: "plus",
  read(a: string | number, b: string | number) {
    return Number(a) + Number(b);
  }
};
