import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Get the years.
 */
export const LuxonDurationYearsFormatter: Formatter = {
  name: "lx-interval-years",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-years
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.years;
  }
};
