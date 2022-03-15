import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Gets the length of the duration in milliseconds.
 * @see https://momentjs.com/docs/#/durations/milliseconds/
 * @param duration
 */
export const AsMillisecondsFormatter: Formatter = {
  name: "asMilliseconds",
  /**
   * Gets the length of the duration in milliseconds.
   * @see https://momentjs.com/docs/#/durations/milliseconds/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asMilliseconds();
  }
};
