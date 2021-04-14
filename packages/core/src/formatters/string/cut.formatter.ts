import { Formatter } from "../../interfaces";

/**
 * Cats a string
 * If the first parameter is -1 the string will not be uncut
 * @example
 * <p rv-text="'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz' | cut 3 '...'"></p>
 * -> <p>abc...</p>
 *
 * <p rv-text="'abcdefghijklnmopqrstuvwxyzabcdefghijklnmopqrstuvwxyz' | cut 3"></p>
 * -> <p>abc</p>
 */
export const cutFormatter: Formatter = {
  name: "cut",
  read(str: string, cutAt: number, delimitation = "") {
    if (!str) {
      return "";
    }
    if (typeof str !== "string") {
      console.warn("[cutFormatter] Value must be of type string");
      return str;
    }
    if (str.length > cutAt) {
      return str.substring(cutAt, cutAt === -1 ? undefined : -1) + delimitation;
    } else {
      return str;
    }
  },
};
