import { Formatter } from "@ribajs/core/src/index.js";
import { Interval, DurationInput } from "luxon";

/**
 * Split this Interval into smaller Intervals, each of the specified length.
 */
export const LuxonIntervalSplitByFormatter: Formatter = {
  name: "lx-interval-split-by",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-splitBy
   * @param target Interval
   * @param duration DurationInput
   * @returns Interval[]
   */
  read(target: Interval, duration: DurationInput): Interval[] {
    return target.splitBy(duration);
  }
};
