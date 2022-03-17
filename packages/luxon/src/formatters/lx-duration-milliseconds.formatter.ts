import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Get the milliseconds.
 */
export const LuxonDurationMillisecondsFormatter: Formatter = {
  name: "lx-interval-milliseconds",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-milliseconds
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.milliseconds;
  }
};
