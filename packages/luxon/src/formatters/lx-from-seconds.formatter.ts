import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeOptions } from "luxon";

/**
 * Gets a luxon date from number of seconds since the epoch (meaning since January 1, 1970, 00:00:00 UTC).
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromSeconds
 */
export const LuxonFromSecondsFormatter: Formatter = {
  name: "lx-from-seconds",
  /**
   * @param seconds number
   * @param options DateTimeOptions | undefined
   * @returns DateTime
   */
  read(seconds: number, options?: DateTimeOptions): DateTime {
    return DateTime.fromSeconds(seconds, options);
  }
};
