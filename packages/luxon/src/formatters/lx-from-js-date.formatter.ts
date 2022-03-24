import { Formatter } from "@ribajs/core";
import { DateTime, DateTimeJSOptions } from "luxon";

/**
 * Gets a luxon date from a JS date.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromJSDate
 */
export const LuxonFromJSDateFormatter: Formatter = {
  name: "lx-from-js-date",
  /**
   * @param date Date
   * @param options DateTimeJSOptions | undefined
   * @returns DateTime
   */
  read(date: Date, options?: DateTimeJSOptions): DateTime {
    return DateTime.fromJSDate(date, options);
  },
};
