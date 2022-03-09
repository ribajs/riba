import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Return an Interval representing the union of this Interval and the specified Interval.
 */
export const LuxonIntervalUnionFormatter: Formatter = {
  name: "lx-interval-union",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-union
   * @param target Interval
   * @param other Interval
   * @returns Interval
   */
  read(target: Interval, other: Interval): Interval {
    return target.union(other);
  },
};
