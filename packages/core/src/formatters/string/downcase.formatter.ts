import { Formatter } from "../../types/index.js";

/**
 * Converts a string into lowercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#downcase
 */
export const downcaseFormatter: Formatter = {
  name: "downcase",
  read(str: string) {
    return str.toLowerCase();
  }
};
