import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeUnit } from "luxon";

/**
 * Return whether this DateTime is in the same unit of time as another DateTime.
 */
export const LuxonHasSameFormatter: Formatter = {
  name: "lx-has-same",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-hasSame
   * @param target can be a Luxon DateTime object
   * @param otherDateTime DateTime
   * @param unit DateTimeUnit
   * @returns boolean
   */
  read(target: DateTime, otherDateTime: DateTime, unit: DateTimeUnit): boolean {
    return target.hasSame(otherDateTime, unit);
  },
};
