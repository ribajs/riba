import { Formatter } from "@ribajs/core/src/index.js";
import { Interval } from "luxon";

/**
 * Returns a string representation of this Interval formatted according to the specified format string.
 */
export const LuxonIntervalToFormatFormatter: Formatter = {
  name: "lx-interval-to-format",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toFormat
   * @param target Interval
   * @param dateFormat string
   * @param separator string | undefined
   * @returns string
   */
  read(target: Interval, dateFormat: string, separator?: string): string {
    return target.toFormat(dateFormat, separator ? { separator } : undefined);
  },
};
