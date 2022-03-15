import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Gets the length of the duration in minutes.
 * @see https://momentjs.com/docs/#/durations/minutes/
 */
export const AsMinutesFormatter: Formatter = {
  name: "asMinutes",
  /**
   * Gets the length of the duration in minutes.
   * @see https://momentjs.com/docs/#/durations/minutes/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asMinutes();
  }
};
