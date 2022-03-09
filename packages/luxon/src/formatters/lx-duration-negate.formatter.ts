import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Return the negative of this Duration.
 */
export const LuxonDurationNegateFormatter: Formatter = {
  name: "lx-duration-negate",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-negate
   * @param target Duration
   * @returns Duration
   */
  read(target: Duration): Duration {
    return target.negate();
  },
};
