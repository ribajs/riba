import { Formatter } from "@ribajs/core";
import { Interval, ToISOTimeOptions } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of time of this Interval.
 */
export const LuxonIntervalToISOTimeFormatter: Formatter = {
  name: "lx-interval-to-iso-time",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISOTime
   * @param target Interval
   * @param opts ToISOTimeOptions | undefined
   * @returns string
   */
  read(target: Interval, opts?: ToISOTimeOptions): string {
    return target.toISOTime(opts);
  }
};
