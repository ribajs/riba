import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, Duration, DurationUnits, DiffOptions } from "luxon";

/**
 * Return the difference between two DateTimes as a Duration.
 */
export const LuxonDiffFormatter: Formatter = {
  name: "lx-diff",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-diff
   * @param target can be a Luxon DateTime object
   * @param otherDateTime DateTime
   * @param unit DurationUnits | undefined
   * @param opts DiffOptions | undefined
   * @returns Duration
   */
  read(
    target: DateTime,
    otherDateTime: DateTime,
    unit: DurationUnits,
    opts?: DiffOptions
  ): Duration {
    return target.diff(otherDateTime, unit, opts);
  }
};
