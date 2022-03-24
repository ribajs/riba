import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Return whether this Interval engulfs the start and end of the specified Interval.
 */
export const LuxonIntervalEngulfsFormatter: Formatter = {
  name: "lx-interval-engulfs",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-engulfs
   * @param target Interval
   * @param other Interval
   * @returns boolean
   */
  read(target: Interval, other: Interval): boolean {
    return target.engulfs(other);
  },
};
