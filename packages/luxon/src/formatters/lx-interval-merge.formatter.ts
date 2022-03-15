import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Merge an array of Intervals into a equivalent minimal set of Intervals. Combines overlapping and adjacent Intervals.
 */
export const LuxonIntervalMergeFormatter: Formatter = {
  name: "lx-interval-merge",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-merge
   * @param interval Interval
   * @param intervals Interval[]
   * @returns Interval[]
   */
  read(intervals: Interval[]): Interval[] {
    return Interval.merge(intervals);
  }
};
