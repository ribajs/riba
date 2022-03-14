import { Formatter } from "@ribajs/core/src/index.js";
import { Interval, DurationObjectUnits } from "luxon";

/**
 * Returns whether this Interval's start and end are both in the same unit of time
 */
export const LuxonIntervalHasSameFormatter: Formatter = {
  name: "lx-interval-has-same",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-hasSame
   * @param target Interval
   * @param unit string
   * @returns boolean
   */
  read(target: Interval, unit: keyof DurationObjectUnits): boolean {
    return target.hasSame(unit);
  },
};
