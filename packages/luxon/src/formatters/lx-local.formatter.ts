import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Gets a luxon date from a list of numerical arguments (year, month, day, ..., millisecond).
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-local
 */
export const LuxonLocalFormatter: Formatter = {
  name: "lx-local",
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
    return DateTime.local(year, month, day, hour, minute, second, millisecond);
  },
};
