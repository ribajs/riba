import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeUnit } from "luxon";

/**
 * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
 */
export const LuxonEndOfFormatter: Formatter = {
  name: "lx-end-of",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-endOf
   * @param target can be a Luxon DateTime object
   * @param unit DateTimeUnit
   * @returns DateTime
   */
  read(target: DateTime, unit: DateTimeUnit): DateTime {
    return target.endOf(unit);
  },
};
