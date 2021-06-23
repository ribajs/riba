import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the year
 */
export const LuxonYearFormatter: Formatter = {
  name: "lx-year",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-year
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.year;
  },
};
