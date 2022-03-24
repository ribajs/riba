import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * Gets the length of the duration in seconds.
 * @see https://momentjs.com/docs/#/durations/seconds/
 */
export const AsSecondsFormatter: Formatter = {
  name: "asSeconds",
  /**
   * Gets the length of the duration in seconds.
   * @see https://momentjs.com/docs/#/durations/seconds/
   * @param duration
   */
  read(duration: Duration) {
    return duration.asSeconds();
  },
};
