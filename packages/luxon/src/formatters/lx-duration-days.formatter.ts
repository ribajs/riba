import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Get the days.
 */
export const LuxonDurationDaysFormatter: Formatter = {
  name: "lx-interval-days",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-days
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.days;
  },
};
