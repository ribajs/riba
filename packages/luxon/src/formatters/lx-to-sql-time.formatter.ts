import { Formatter } from "@ribajs/core/src/index.js";
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
   * @returns string
   */
  read(target: DateTime, opts?: ToSQLOptions): string {
    return target.toSQLTime(opts);
  },
};
