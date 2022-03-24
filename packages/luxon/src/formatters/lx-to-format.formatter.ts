import { Formatter } from "@ribajs/core";
import { DateTime, LocaleOptions } from "luxon";

/**
 * Returns a string representation of this DateTime formatted according to the specified format string.
 */
export const LuxonToFormatFormatter: Formatter = {
  name: "lx-to-format",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toFormat
   * @param target can be a Luxon DateTime object
   * @param fmt string
   * @param opts Object
   * @returns string
   */
  read(
    target: DateTime,
    fmt: string,
    opts: LocaleOptions & Intl.DateTimeFormatOptions
  ): string {
    return target.toFormat(fmt, opts);
  },
};
