import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Returns whether the Duration is invalid.
 */
export const LuxonDurationIsValidFormatter: Formatter = {
  name: "lx-interval-is-valid",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-get-isValid
   * @param target Interval
   * @returns boolean
   */
  read(target: Duration): boolean {
    return target.isValid;
  }
};
