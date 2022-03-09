import { Formatter } from "@ribajs/core/src/index.js";
import { Interval, DateInput, DurationInput } from "luxon";

/**
 * Create an Interval from a start DateTime and a Duration to extend to.
 */
export const LuxonIntervalAfterFormatter: Formatter = {
  name: "lx-interval-after",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-after
   * @param start DateInput
   * @param duration DurationInput
   * @returns Interval
   */
  read(start: DateInput, duration: DurationInput): Interval {
    return Interval.after(start, duration);
  },
};
