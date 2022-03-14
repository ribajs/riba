import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the locale of a DateTime, such 'en-GB'.
 */
export const LuxonLocaleFormatter: Formatter = {
  name: "lx-locale",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-locale
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.locale;
  },
};
