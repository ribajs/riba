import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the week year
 */
export const LuxonWeekYearFormatter: Formatter = {
  name: "lx-week-year",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-weekYear
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.weekYear;
  }
};
