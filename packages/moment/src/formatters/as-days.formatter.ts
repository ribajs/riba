import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Gets the length of the duration in days.
 * @see https://momentjs.com/docs/#/durations/days/
 */
export const AsDaysFormatter: Formatter = {
  name: "asDays",
  /**
   * Gets the length of the duration in days.
   * @see https://momentjs.com/docs/#/durations/days/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asDays();
  },
};
