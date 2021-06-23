import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeOptions } from "luxon";

/**
 * Gets a luxon date from an ISO 8601 string.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromISO
 */
export const LuxonFromISOFormatter: Formatter = {
  name: "lx-from-iso",
  /**
   * @param text string
   * @param options DateTimeOptions | undefined
   * @returns DateTime
   */
  read(text: string, options?: DateTimeOptions): DateTime {
    return DateTime.fromISO(text, options);
  },
};
