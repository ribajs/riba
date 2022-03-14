import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Returns an milliseconds value of this Duration.
 */
export const LuxonDurationToMillisFormatter: Formatter = {
  name: "lx-duration-to-millis",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toMillis
   * @param target Duration
   * @returns number
   */
  read(target: Duration): number {
    return target.toMillis();
  },
};
