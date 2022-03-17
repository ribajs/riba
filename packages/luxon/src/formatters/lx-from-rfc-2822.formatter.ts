import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeOptions } from "luxon";

/**
 * Gets a luxon date from an RFC-2822 string.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromRFC2822
 */
export const LuxonFromRFC2822Formatter: Formatter = {
  name: "lx-from-rfc-2822",
  /**
   * @param text string
   * @param options DateTimeOptions | undefined
   * @returns DateTime
   */
  read(text: string, options?: DateTimeOptions): DateTime {
    return DateTime.fromRFC2822(text, options);
  }
};
