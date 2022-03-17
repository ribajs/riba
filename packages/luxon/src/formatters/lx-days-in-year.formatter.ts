import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns the number of days in this DateTime's year
 */
export const LuxonDaysInYearFormatter: Formatter = {
  name: "lx-days-in-year",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-daysInYear
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.daysInYear;
  }
};
