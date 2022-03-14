import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Gets the length of the duration in months.
 * @see https://momentjs.com/docs/#/durations/months/
 */
export const AsMonthsFormatter: Formatter = {
  name: "asMonths",
  /**
   * Gets the length of the duration in months.
   * @see https://momentjs.com/docs/#/durations/months/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asMonths();
  },
};
