import { Formatter } from "@ribajs/core";
import { Interval, IntervalObject } from "luxon";

/**
 * "Sets" the start and/or end dates.
 */
export const LuxonIntervalSetFormatter: Formatter = {
  name: "lx-interval-set",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-set
   * @param target Interval
   * @param values IntervalObject
   * @returns Interval
   */
  read(target: Interval, values?: IntervalObject): Interval {
    return target.set(values);
  },
};
