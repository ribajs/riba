import { Formatter } from "@ribajs/core";
import { Interval, DateTime } from "luxon";

/**
 * Return whether this Interval's end is before the specified DateTime.
 */
export const LuxonIntervalIsBeforeFormatter: Formatter = {
  name: "lx-interval-is-before",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-isBefore
   * @param target Interval
   * @param dateTime DateTime
   * @returns boolean
   */
  read(target: Interval, dateTime: DateTime): boolean {
    return target.isBefore(dateTime);
  },
};
