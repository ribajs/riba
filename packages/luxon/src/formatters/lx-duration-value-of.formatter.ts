import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Returns an milliseconds value of this Duration.
 */
export const LuxonDurationValueOfFormatter: Formatter = {
  name: "lx-duration-value-of",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-valueOf
   * @param target Duration
   * @returns number
   */
  read(target: Duration): number {
    return target.valueOf();
  }
};
