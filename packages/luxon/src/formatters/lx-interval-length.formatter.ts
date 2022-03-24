import { Formatter } from "@ribajs/core";
import { Interval, DurationObjectUnits } from "luxon";

/**
 * Returns the length of the Interval in the specified unit.
 */
export const LuxonIntervalLengthFormatter: Formatter = {
  name: "lx-interval-length",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-length
   * @param target Interval
   * @param unit keyof DurationObjectUnits | undefined
   * @returns number
   */
  read(target: Interval, unit?: keyof DurationObjectUnits): number {
    return target.length(unit);
  },
};
