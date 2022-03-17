import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Get the minutes.
 */
export const LuxonDurationMinutesFormatter: Formatter = {
  name: "lx-interval-minutes",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-minutes
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.minutes;
  }
};
