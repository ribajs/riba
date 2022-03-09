import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Returns a string representation of this Interval appropriate for debugging.
 */
export const LuxonIntervalToStringFormatter: Formatter = {
  name: "lx-interval-to-string",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toString
   * @param target Interval
   * @returns string
   */
  read(target: Interval): string {
    return target.toString();
  },
};
