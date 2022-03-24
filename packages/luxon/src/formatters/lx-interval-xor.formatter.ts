import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
 */
export const LuxonIntervalXorFormatter: Formatter = {
  name: "lx-interval-xor",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-xor
   * @param intervals Interval[]
   * @returns Interval[]
   */
  read(intervals: Interval[]): Interval[] {
    return Interval.xor(intervals);
  },
};
