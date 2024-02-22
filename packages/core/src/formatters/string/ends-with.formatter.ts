import { Formatter } from "../../types/index.js";

/**
 * Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at endPosition – length(this).
 * Otherwise returns false.
 *
 * @example
 * <p rv-if="'abcdefg' | ends-with 'efg'">Hello World!</p>
 * -> <p>Hello World!</p>
 */
export const endsWithFormatter: Formatter = {
  name: "ends-with",
  read(str: string, checkStart: string) {
    if (typeof str !== "string") {
      console.warn("[endsWithFormatter] Value must be of type string");
      return str;
    }
    if (str.endsWith(checkStart)) {
      return str;
    }
    return false;
  },
};
