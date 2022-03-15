import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Equality check Two Durations are equal iff they have the same units and the same values for each unit.
 */
export const LuxonDurationEqualsFormatter: Formatter = {
  name: "lx-duration-equals",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-equals
   * @param target Duration
   * @param other Duration
   * @returns boolean
   */
  read(target: Duration, other: Duration): boolean {
    return target.equals(other);
  }
};
