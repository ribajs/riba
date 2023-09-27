import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Returns the start of the Interval
 */
export const LuxonIntervalStartFormatter: Formatter = {
  name: "lx-interval-start",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-start
   * @param target Interval
   */
  read(target: Interval) {
    return target.start;
  },
};
