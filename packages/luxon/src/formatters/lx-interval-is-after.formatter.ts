import { Formatter } from "@ribajs/core";
import { Interval, DateTime } from "luxon";

/**
 * Return whether this Interval's start is after the specified DateTime.
 */
export const LuxonIntervalIsAfterFormatter: Formatter = {
  name: "lx-interval-is-after",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-isAfter
   * @param target Interval
   * @param dateTime DateTime
   * @returns boolean
   */
  read(target: Interval, dateTime: DateTime): boolean {
    return target.isAfter(dateTime);
  },
};
