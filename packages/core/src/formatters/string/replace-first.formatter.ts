/* tslint:disable:variable-name */

/**
 * Replaces the first occurrence of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace_first
 */
export const replaceFirst = {
  name: 'replace-first',
  read(str: string, value: string, replaceValue: string) {
    return str.replace(value, replaceValue);
  },
};
