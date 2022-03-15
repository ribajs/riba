import { Formatter } from "@ribajs/core/src/index.js";
import { Interval, DateTime } from "luxon";

/**
 * Returns the end of the Interval
 */
export const LuxonIntervalEndFormatter: Formatter = {
  name: "lx-interval-end",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-end
   * @param target Interval
   * @returns DateTime
   */
  read(target: Interval): DateTime {
    return target.end;
  }
};
