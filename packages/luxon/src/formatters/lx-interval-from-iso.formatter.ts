import { Formatter } from "@ribajs/core/src/index.js";
import { Interval, DateTimeOptions } from "luxon";

/**
 * Create an Interval from an ISO 8601 string.
 */
export const LuxonIntervalFromISOFormatter: Formatter = {
  name: "lx-interval-from-iso",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromISO
   * @param text string
   * @param opts DateTimeOptions | undefined
   * @returns Interval
   */
  read(text: string, opts?: DateTimeOptions): Interval {
    return Interval.fromISO(text, opts);
  }
};
