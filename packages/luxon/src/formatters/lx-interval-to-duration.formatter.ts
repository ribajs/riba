import { Formatter } from "@ribajs/core";
import { Interval, Duration, DurationObjectUnits, DiffOptions } from "luxon";

/**
 * Return a Duration representing the time spanned by this interval.
 */
export const LuxonIntervalToDurationFormatter: Formatter = {
  name: "lx-interval-to-duration",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toDuration
   * @param target Interval
   * @param unit string | string[]
   * @param opts DiffOptions | undefined
   * @returns Duration
   */
  read(
    target: Interval,
    unit?: keyof DurationObjectUnits | (keyof DurationObjectUnits)[],
    opts?: DiffOptions,
  ): Duration {
    return target.toDuration(unit, opts);
  },
};
