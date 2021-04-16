/* tslint:disable:variable-name */
import { Formatter } from "../../types";

/**
 * Replaces the first occurrence of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace_first
 */
export const replaceFirstFormatter: Formatter = {
  name: "replaceFirst",
  read(str: string, value: string, replaceValue: string) {
    return str.replace(value, replaceValue);
  },
};
