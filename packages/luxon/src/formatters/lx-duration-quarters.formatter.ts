import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Get the quarters.
 */
export const LuxonDurationQuartersFormatter: Formatter = {
  name: "lx-interval-quarters",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-quarters
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.quarters;
  }
};
