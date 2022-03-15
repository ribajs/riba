import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Return whether this Interval's start is adjacent to the specified Interval's end.
 */
export const LuxonIntervalAbutsEndFormatter: Formatter = {
  name: "lx-interval-abuts-end",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-abutsEnd
   * @param target Interval
   * @param other Interval
   * @returns boolean
   */
  read(target: Interval, other: Interval): boolean {
    return target.abutsEnd(other);
  }
};
