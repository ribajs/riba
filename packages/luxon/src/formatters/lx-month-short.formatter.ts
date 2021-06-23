import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the human readable short month name, such as 'Oct'.
 */
export const LuxonMonthShortFormatter: Formatter = {
  name: "lx-month-short",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-monthShort
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.monthShort;
  },
};
