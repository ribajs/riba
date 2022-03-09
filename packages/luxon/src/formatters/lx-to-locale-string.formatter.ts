import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, LocaleOptions } from "luxon";

/**
 * Returns a localized string representing this date.
 */
export const LuxonToLocaleStringFormatter: Formatter = {
  name: "lx-to-locale-string",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toLocaleString
   * @param target can be a Luxon DateTime object
   * @param opts LocaleOptions & Intl.DateTimeFormatOptions | undefined
   * @returns string
   */
  read(
    target: DateTime,
    opts?: LocaleOptions & Intl.DateTimeFormatOptions
  ): string {
    return target.toLocaleString(opts);
  },
};
