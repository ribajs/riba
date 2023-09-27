import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Get the locale of a DateTime, such 'en-GB'.
 */
export const LuxonLocaleFormatter: Formatter = {
  name: "lx-locale",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-locale
   * @param target can be a Luxon DateTime object
   */
  read(target: DateTime) {
    return target.locale;
  },
};
