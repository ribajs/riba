import { Formatter } from "@ribajs/core/src/index.js";
import { Interval, DateInput, DurationInput } from "luxon";

/**
 * Create an Interval from an end DateTime and a Duration to extend backwards to.
 */
export const LuxonIntervalBeforeFormatter: Formatter = {
  name: "lx-interval-before",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-before
   * @param end DateInput
   * @param duration DurationInput
   * @returns Interval
   */
  read(end: DateInput, duration: DurationInput): Interval {
    return Interval.before(end, duration);
  },
};
