import { Formatter } from "@ribajs/core";
import { Duration, DurationInput } from "luxon";

/**
 * Make this Duration shorter by the specified amount.
 */
export const LuxonDurationMinusFormatter: Formatter = {
  name: "lx-duration-minus",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-minus
   * @param target Duration
   * @param duration DurationInput
   * @returns Duration
   */
  read(target: Duration, duration: DurationInput): Duration {
    return target.minus(duration);
  }
};
