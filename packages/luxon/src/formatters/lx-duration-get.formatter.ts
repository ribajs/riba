import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, DurationObjectUnits } from "luxon";

/**
 * Get the value of unit.
 */
export const LuxonDurationGetFormatter: Formatter = {
  name: "lx-duration-get",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-get
   * @param target Duration
   * @param unit string
   * @returns number
   */
  read(target: Duration, unit: keyof DurationObjectUnits): number {
    return target.get(unit);
  },
};
