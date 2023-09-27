import { Formatter } from "@ribajs/core";
import { DateTime, ToSQLOptions } from "luxon";

/**
 * Returns a string representation of this DateTime appropriate for use in SQL DateTime
 */
export const LuxonToSQLFormatter: Formatter = {
  name: "lx-to-sql",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toSQL
   * @param target can be a Luxon DateTime object
   * @param opts ToSQLOptions | undefined
   * @returns string | null
   */
  read(target: DateTime, opts?: ToSQLOptions) {
    return target.toSQL(opts);
  },
};
