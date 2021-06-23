import { Formatter } from "../../types";

/**
 * Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at position.
 * Otherwise returns false.
 *
 * @example
 * <p rv-text="'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz' | starts-with 'abc'"></p>
 * -> <p>true</p>
 */
export const startsWithFormatter: Formatter = {
  name: "starts-with",
  read(str: string, checkStart: string) {
    if (typeof str !== "string") {
      console.warn("[startsWithFormatter] Value must be of type string");
      return str;
    }
    return str.startsWith(checkStart);
  },
};
