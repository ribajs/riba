import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, DurationObjectUnits } from "luxon";

/**
 * Convert this Duration into its representation in a different set of units.
 */
export const LuxonDurationShiftToFormatter: Formatter = {
  name: "lx-duration-shift-to",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-shiftTo
   * @param target Duration
   * @param ...units (keyof DurationObjectUnits)[]
   * @returns Duration
   */
  read(target: Duration, ...units: (keyof DurationObjectUnits)[]): Duration {
    return target.shiftTo(...units);
  },
};
