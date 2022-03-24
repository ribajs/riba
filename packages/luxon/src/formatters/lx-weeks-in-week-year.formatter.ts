import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns the number of weeks in this DateTime's year
 */
export const LuxonWeeksInWeekYearFormatter: Formatter = {
  name: "lx-weeks-in-week-year",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-weeksInWeekYear
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.weeksInWeekYear;
  },
};
