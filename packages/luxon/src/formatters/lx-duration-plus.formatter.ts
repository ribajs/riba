import { Formatter } from "@ribajs/core";
import { Duration, DurationInput } from "luxon";

/**
 * Make this Duration longer by the specified amount.
 */
export const LuxonDurationPlusFormatter: Formatter = {
  name: "lx-duration-plus",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-plus
   * @param target Duration
   * @param duration DurationInput
   * @returns Duration
   */
  read(target: Duration, duration: DurationInput): Duration {
    return target.plus(duration);
  },
};
