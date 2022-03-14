import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, LocaleOptions } from "luxon";

/**
 * "Set" the locale, numberingSystem, or outputCalendar.
 */
export const LuxonReconfigureFormatter: Formatter = {
  name: "lx-reconfigure",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-reconfigure
   * @param target can be a Luxon DateTime object
   * @param properties LocaleOptions
   * @returns DateTime
   */
  read(target: DateTime, properties: LocaleOptions): DateTime {
    return target.reconfigure(properties);
  },
};
