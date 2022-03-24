import { Formatter } from "@ribajs/core";
import { DateTime, Duration, DurationUnits, DiffOptions } from "luxon";

/**
 * Return the difference between this DateTime and right now.
 */
export const LuxonDiffNowFormatter: Formatter = {
  name: "lx-diff-now",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-diffNow
   * @param target can be a Luxon DateTime object
   * @param unit DurationUnits | undefined
   * @param opts DiffOptions | undefined
   * @returns Duration
   */
  read(target: DateTime, unit?: DurationUnits, opts?: DiffOptions): Duration {
    return target.diffNow(unit, opts);
  },
};
