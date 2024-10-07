import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Check if an object is an Interval.
 */
export const LuxonIntervalIsIntervalFormatter: Formatter = {
  name: "lx-interval-is-interval",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-isInterval
   * @param o object
   * @returns boolean
   */
  read(o: object): boolean {
    return Interval.isInterval(o);
  },
};
