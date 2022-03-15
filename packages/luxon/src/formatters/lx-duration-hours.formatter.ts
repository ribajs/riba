import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Get the hours.
 */
export const LuxonDurationHoursFormatter: Formatter = {
  name: "lx-interval-hours",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-hours
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.hours;
  }
};
