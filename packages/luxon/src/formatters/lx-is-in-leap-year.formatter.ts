import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Returns true if this DateTime is in a leap year, false otherwise
 */
export const LuxonIsInLeapYearFormatter: Formatter = {
  name: "lx-is-in-leap-year",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-isInLeapYear
   * @param target can be a Luxon DateTime object
   * @returns boolean
   */
  read(target: DateTime): boolean {
    return target.isInLeapYear;
  }
};
