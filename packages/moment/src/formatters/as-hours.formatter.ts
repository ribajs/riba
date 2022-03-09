import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Gets the length of the duration in hours.
 * @see https://momentjs.com/docs/#/durations/hours/
 */
export const AsHoursFormatter: Formatter = {
  name: "asHours",
  /**
   * Gets the length of the duration in hours.
   * @see https://momentjs.com/docs/#/durations/hours/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asHours();
  },
};
