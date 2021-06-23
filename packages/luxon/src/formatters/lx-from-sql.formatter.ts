import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeOptions } from "luxon";

/**
 * Gets a luxon date from an SQL date, time or datetime string. Defaults to en-us if no locale provided, ignoring sysem locale.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromSQL
 */
export const LuxonFromSQLFormatter: Formatter = {
  name: "lx-from-sql",
  /**
   * @param text string
   * @param options DateTimeOptions | undefined
   * @returns DateTime
   */
  read(text: string, options?: DateTimeOptions): DateTime {
    return DateTime.fromSQL(text, options);
  },
};
