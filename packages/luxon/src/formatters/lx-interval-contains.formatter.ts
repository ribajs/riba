import { Formatter } from "@ribajs/core";
import { Interval, DateTime } from "luxon";

/**
 * Return whether this Interval contains the specified DateTime.
 */
export const LuxonIntervalContainsFormatter: Formatter = {
  name: "lx-interval-contains",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-contains
   * @param target Interval
   * @param dateTime DateTime
   * @returns boolean
   */
  read(target: Interval, dateTime: DateTime): boolean {
    return target.contains(dateTime);
  },
};
