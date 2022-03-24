import { Formatter } from "../../types/index.js";

/**
 * The padStart formatter pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length.
 * The padding is applied from the start of the current string.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
 */
export const padStartFormatter: Formatter = {
  name: "padStart",
  /**
   * The padStart formatter pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length.
   * The padding is applied from the start of the current string.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
   * @param target
   * @param length The length of the resulting string once the current `str` has been padded. If the value is less than `str.length`, then `str` is returned as-is.
   * @param padString The string to pad the current `str` with. If `padString` is too long to stay within the `targetLength`, it will be truncated from the end. The default value is `" "` (`U+0020 'SPACE'`).
   */
  read(target: string, length = 2, padString = "0") {
    return target.padStart(length, padString);
  },
};
