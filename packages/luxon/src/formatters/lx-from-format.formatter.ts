import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, DateTimeOptions } from "luxon";

/**
 * Gets a luxon date from a format string.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromFormat
 */
export const LuxonFromFormatFormatter: Formatter = {
  name: "lx-from-format",
  /**
   * @param text string
   * @param format string
   * @param options DateTimeOptions | undefined
   * @returns DateTime
   */
  read(text: string, format: string, options?: DateTimeOptions): DateTime {
    return DateTime.fromFormat(text, format, options);
  }
};
