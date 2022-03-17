import { Formatter } from "@ribajs/core";
import { Interval, DateTime } from "luxon";

/**
 * Split this Interval at each of the specified DateTimes
 */
export const LuxonIntervalSplitAtFormatter: Formatter = {
  name: "lx-interval-split-at",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-splitAt
   * @param target Interval
   * @param ...dateTimes DateTime[]
   * @returns Interval[]
   */
  read(target: Interval, ...dateTimes: DateTime[]): Interval[] {
    return target.splitAt(...dateTimes);
  }
};
