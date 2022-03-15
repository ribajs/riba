import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Return an Interval representing the intersection of this Interval and the specified Interval.
 */
export const LuxonIntervalIntersectionFormatter: Formatter = {
  name: "lx-interval-intersection",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-intersection
   * @param target Interval
   * @param other Interval
   * @returns Interval | null
   */
  read(target: Interval, other: Interval): Interval | null {
    return target.intersection(other);
  }
};
