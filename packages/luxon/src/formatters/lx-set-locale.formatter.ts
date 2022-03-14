import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * "Set" the locale.
 */
export const LuxonSetLocaleFormatter: Formatter = {
  name: "lx-set-locale",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-setLocale
   * @param target can be a Luxon DateTime object
   * @param locale string
   * @returns DateTime
   */
  read(target: DateTime, locale: string): DateTime {
    return target.setLocale(locale);
  },
};
