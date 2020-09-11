import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the minutes formatter gets the minutes (0 - 59).
 * @see https://momentjs.com/docs/#/durations/minutes/
 */
export const MinutesFormatter: Formatter = {
  name: "minutes",
  /**
   * As with the other formatters for durations, the minutes formatter gets the minutes (0 - 59).
   * @see https://momentjs.com/docs/#/durations/minutes/
   * @param duration
   */
  read(duration: Duration) {
    return duration.minutes();
  },
};
