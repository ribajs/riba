import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Return whether this Interval has the same start and end DateTimes.
 */
export const LuxonIntervalIsEmptyFormatter: Formatter = {
  name: "lx-interval-is-empty",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-isEmpty
   * @param target Interval
   * @returns boolean
   */
  read(target: Interval): boolean {
    return target.isEmpty();
  }
};
