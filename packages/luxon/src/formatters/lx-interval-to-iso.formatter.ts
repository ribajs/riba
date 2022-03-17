import { Formatter } from "@ribajs/core";
import { Interval, ToISOTimeOptions } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of this Interval.
 */
export const LuxonIntervalToISOFormatter: Formatter = {
  name: "lx-interval-to-iso",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISO
   * @param target Interval
   * @param opts ToISOTimeOptions | undefined
   * @returns string
   */
  read(target: Interval, opts?: ToISOTimeOptions): string {
    return target.toISO(opts);
  }
};
