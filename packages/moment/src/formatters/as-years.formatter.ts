import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Gets the length of the duration in years.
 * @see https://momentjs.com/docs/#/durations/years/
 */
export const AsYearsFormatter: Formatter = {
  name: "asYears",
  /**
   * Gets the length of the duration in years.
   * @see https://momentjs.com/docs/#/durations/years/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asYears();
  },
};
