import { Formatter } from "@ribajs/core";
import { Duration } from "luxon";

/**
 * Reduce this Duration to its canonical representation in its current units.
 */
export const LuxonDurationNormalizeFormatter: Formatter = {
  name: "lx-duration-normalize",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-normalize
   * @param target Duration
   * @returns Duration
   */
  read(target: Duration): Duration {
    return target.normalize();
  },
};
