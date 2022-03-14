import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Gets the length of the duration in weeks.
 * @see https://momentjs.com/docs/#/durations/weeks/
 */
export const AsWeeksFormatter: Formatter = {
  name: "asWeeks",
  /**
   * Gets the length of the duration in weeks.
   * @see https://momentjs.com/docs/#/durations/weeks/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asWeeks();
  },
};
