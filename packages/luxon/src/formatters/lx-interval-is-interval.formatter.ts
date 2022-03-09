import { Formatter } from "@ribajs/core/src/index.js";
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  read(o: object): boolean {
    return Interval.isInterval(o);
  },
};
