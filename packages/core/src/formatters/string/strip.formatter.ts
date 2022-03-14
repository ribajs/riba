import { Formatter } from "../../types/index.js";

/**
 * Strips tabs, spaces, and newlines (all whitespace) from the left and right side of a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#strip
 */
export const stripFormatter: Formatter = {
  name: "strip",
  read(str: string) {
    return str.trim();
  },
};
