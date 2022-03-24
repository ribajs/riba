import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns an ISO 8601-compliant string representation of this DateTime's week date
 */
export const LuxonToISOWeekDateFormatter: Formatter = {
  name: "lx-to-iso-week-date",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toISOWeekDate
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.toISOWeekDate();
  },
};
