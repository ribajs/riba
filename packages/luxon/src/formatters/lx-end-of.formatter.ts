import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, DurationObjectUnits } from "luxon";

/**
 * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
 */
export const LuxonEndOfFormatter: Formatter = {
  name: "lx-end-of",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-endOf
   * @param target can be a Luxon DateTime object
   * @param unit keyof DurationObjectUnits
   * @returns DateTime
   */
  read(target: DateTime, unit: keyof DurationObjectUnits): DateTime {
    return target.endOf(unit);
  },
};
