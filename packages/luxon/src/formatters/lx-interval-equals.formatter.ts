import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Return whether this Interval has the same start and end as the specified Interval.
 */
export const LuxonIntervalEqualsFormatter: Formatter = {
  name: "lx-interval-equals",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-equals
   * @param target Interval
   * @param other Interval
   * @returns boolean
   */
  read(target: Interval, other: Interval): boolean {
    return target.equals(other);
  }
};
