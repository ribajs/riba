import { Formatter } from "../../types/index.js";

/**
 * The `slice` formatter returns a substring, starting at the specified index.
 * An optional second parameter can be passed to specify the length of the substring.
 * If no second parameter is given, the substring continues to the end of string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#slice
 */
export const sliceFormatter: Formatter = {
  name: "slice",
  read(value: any, start: number, end: number) {
    return value.slice(start, end);
  }
};
