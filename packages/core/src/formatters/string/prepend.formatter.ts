import { Formatter } from "../../types/index.js";

/**
 * Prepends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#prepend
 */
export const prependFormatter: Formatter = {
  name: "prepend",
  read(a: string, b: string) {
    return b + a;
  },
};
