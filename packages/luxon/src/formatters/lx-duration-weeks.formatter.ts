import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Get the weeks
 */
export const LuxonDurationWeeksFormatter: Formatter = {
  name: "lx-interval-weeks",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-weeks
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.weeks;
  },
};
