/**
 * Appends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#append
 */
export const appendFormatter = {
  name: "append",
  read(a: string, b: string) {
    return a + b;
  },
};
