import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Returns a string representation of this DateTime appropriate for use in SQL Date
 */
export const LuxonToSQLDateFormatter: Formatter = {
  name: "lx-to-sql-date",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toSQLDate
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.toSQLDate();
  }
};
