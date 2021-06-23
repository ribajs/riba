import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
 */
export const LuxonIntervalDifferenceFormatter: Formatter = {
  name: "lx-interval-difference",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-difference
   * @param target Interval
   * @param ...intervals Interval[]
   * @returns Interval[]
   */
  read(target: Interval, ...intervals: Interval[]): Interval[] {
    return target.difference(...intervals);
  },
};
