import { Formatter } from "@ribajs/core";
import { Interval, DateTime } from "luxon";

/**
 * Returns the start of the Interval
 */
export const LuxonIntervalStartFormatter: Formatter = {
  name: "lx-interval-start",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-start
   * @param target Interval
   * @returns DateTime
   */
  read(target: Interval): DateTime {
    return target.start;
  }
};
