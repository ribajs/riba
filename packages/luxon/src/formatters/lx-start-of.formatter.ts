import { Formatter } from "@ribajs/core";
import { DateTime, DurationObjectUnits } from "luxon";

/**
 * "Set" this DateTime to the beginning of a unit of time.
 */
export const LuxonStartOfFormatter: Formatter = {
  name: "lx-start-of",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-startOf
   * @param target can be a Luxon DateTime object
   * @param unit string
   * @returns DateTime
   */
  read(target: DateTime, unit: keyof DurationObjectUnits): DateTime {
    return target.startOf(unit);
  }
};
