import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeOptions } from "luxon";

/**
 * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC).
 */
export const LuxonFromMillisFormatter: Formatter = {
  name: "lx-from-millis",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromMillis
   * @param milliseconds number
   * @param options DateTimeOptions
   * @returns DateTime
   */
  read(milliseconds: number, options: DateTimeOptions): DateTime {
    return DateTime.fromMillis(milliseconds, options);
  },
};
