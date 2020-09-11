import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the seconds formatter gets the seconds.
 * @see https://momentjs.com/docs/#/durations/seconds/
 */
export const SecondsFormatter: Formatter = {
  name: "seconds",
  /**
   * As with the other formatters for durations, the seconds formatter gets the seconds.
   * @see https://momentjs.com/docs/#/durations/seconds/
   * @param duration
   */
  read(duration: Duration) {
    return duration.seconds();
  },
};
