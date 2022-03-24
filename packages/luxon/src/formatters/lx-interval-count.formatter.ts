import { Formatter } from "@ribajs/core";
import { Interval, DurationObjectUnits } from "luxon";

/**
 * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
 */
export const LuxonIntervalCountFormatter: Formatter = {
  name: "lx-interval-count",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-count
   * @param target Interval
   * @param unit keyof DurationObjectUnits
   * @returns number
   */
  read(target: Interval, unit: keyof DurationObjectUnits): number {
    return target.count(unit);
  },
};
