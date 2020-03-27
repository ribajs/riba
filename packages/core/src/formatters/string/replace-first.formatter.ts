/* tslint:disable:variable-name */

/**
 * Replaces the first occurrence of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace_first
 */
export const replaceFirstFormatter = {
  name: "replaceFirst",
  read(str: string, value: string, replaceValue: string) {
    return str.replace(value, replaceValue);
  }
};
