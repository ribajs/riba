import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the week number of the week year (1-52ish).
 */
export const LuxonWeekNumberFormatter: Formatter = {
  name: "lx-week-number",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-weekNumber
   * @param target can be a Luxon DateTime object
   * @returns number
   */
  read(target: DateTime): number {
    return target.weekNumber;
  }
};
