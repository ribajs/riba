import { Formatter } from "@ribajs/core";
import { DateTime, ToSQLOptions } from "luxon";

/**
 * Returns a string representation of this DateTime appropriate for use in SQL Time
 */
export const LuxonToSQLTimeFormatter: Formatter = {
  name: "lx-to-sql-time",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toSQLTime
   * @param target can be a Luxon DateTime object
   * @param opts ToSQLOptions | undefined
   * @returns string | null
   */
  read(target: DateTime, opts?: ToSQLOptions) {
    return target.toSQLTime(opts);
  },
};
