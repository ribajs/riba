import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Return whether this Interval's end is adjacent to the specified Interval's start.
 */
export const LuxonIntervalAbutsStartFormatter: Formatter = {
  name: "lx-interval-abuts-start",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-abutsStart
   * @param target Interval
   * @param other Interval
   * @returns boolean
   */
  read(target: Interval, other: Interval): boolean {
    return target.abutsStart(other);
  },
};
