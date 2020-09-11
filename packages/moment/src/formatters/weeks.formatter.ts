import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the weeks formatter gets the weeks (0 - 4).
 * @see https://momentjs.com/docs/#/durations/weeks/
 */
export const WeeksFormatter: Formatter = {
  name: "weeks",
  /**
   * As with the other formatters for durations, the weeks formatter gets the weeks (0 - 4).
   * @see https://momentjs.com/docs/#/durations/weeks/
   * @param duration
   */
  read(duration: Duration) {
    return duration.weeks();
  },
};
