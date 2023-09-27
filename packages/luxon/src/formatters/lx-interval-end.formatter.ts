import { Formatter } from "@ribajs/core";
import { Interval } from "luxon";

/**
 * Returns the end of the Interval
 */
export const LuxonIntervalEndFormatter: Formatter = {
  name: "lx-interval-end",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-end
   * @param target Interval
   */
  read(target: Interval) {
    return target.end;
  },
};
