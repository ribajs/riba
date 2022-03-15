import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Get the months.
 */
export const LuxonDurationMonthsFormatter: Formatter = {
  name: "lx-interval-months",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-months
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.months;
  }
};
