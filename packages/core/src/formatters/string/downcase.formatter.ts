/**
 * Converts a string into lowercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#downcase
 */
export const downcase = {
  name: 'downcase',
  read(str: string) {
    return str.toLowerCase();
  },
};
