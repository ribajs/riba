import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of date of this Interval.
 */
export const LuxonIntervalToISODateFormatter: Formatter = {
  name: "lx-interval-to-iso-date",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISODate
   * @param target Interval
   * @returns string
   */
  read(target: Interval): string {
    return target.toISODate();
  },
};
