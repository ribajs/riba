import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Return whether this Interval overlaps with the specified Interval
 */
export const LuxonIntervalOverlapsFormatter: Formatter = {
  name: "lx-interval-overlaps",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-overlaps
   * @param target Interval
   * @param other Interval
   * @returns boolean
   */
  read(target: Interval, other: Interval): boolean {
    return target.overlaps(other);
  }
};
