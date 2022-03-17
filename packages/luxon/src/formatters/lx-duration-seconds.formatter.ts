import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Get the seconds.
 */
export const LuxonDurationSecondsFormatter: Formatter = {
  name: "lx-interval-seconds",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-seconds
   * @param target Interval
   * @returns number
   */
  read(target: Duration): number {
    return target.seconds;
  }
};
