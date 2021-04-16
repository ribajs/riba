import { Formatter } from "../../types";

/**
 * The padEnd formatters pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
 */
export const padEndFormatter: Formatter = {
  name: "padEnd",
  /**
   *
   * The padEnd formatters pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length.
   * The padding is applied from the end of the current string.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
   *
   * @param target
   * @param length The length of the resulting string once the current `str` has been padded. If the value is lower than `str.length`, the current string will be returned as-is.
   * @param padString The string to pad the current `str` with. If `padString` is too long to stay within `targetLength`, it will be truncated: for left-to-right languages the left-most part and for right-to-left languages the right-most will be applied. The default value for this parameter is " " (`U+0020`).
   */
  read(target: string, length = 2, padString = "0") {
    return target.padEnd(length, padString);
  },
};
