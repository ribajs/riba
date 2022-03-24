import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Gets a luxon date from a list of numerical arguments (year, month, day, ..., millisecond) in UTC time.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-utc
 */
export const LuxonUTCFormatter: Formatter = {
  name: "lx-utc",
  /**
   * @param year number
   * @param month number
   * @param day number
   * @param hour number
   * @param minute number
   * @param second number
   * @param millisecond number
   * @returns DateTime
   */
  read([
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  ]: number[]): DateTime {
    return DateTime.utc(year, month, day, hour, minute, second, millisecond);
  },
};
