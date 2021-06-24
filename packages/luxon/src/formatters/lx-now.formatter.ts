import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Create a DateTime for the current instant, in the system's time zone.

Use Settings to override these default values if needed.
 */
export const LuxonNowFormatter: Formatter = {
  name: "lx-now",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-now
   * @param target can be a Luxon DateTime object
   * @returns DateTime
   */
  read(): DateTime {
    return DateTime.now();
  },
};
