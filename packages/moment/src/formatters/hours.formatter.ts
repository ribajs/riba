import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the hours formatter gets the hours (0 - 23).
 * @see https://momentjs.com/docs/#/durations/hours/
 */
export const HoursFormatter: Formatter = {
  name: "hours",
  /**
   * As with the other formatters for durations, the hours formatter gets the hours (0 - 23).
   * @see https://momentjs.com/docs/#/durations/hours/
   * @param duration
   */
  read(duration: Duration) {
    return duration.hours();
  },
};
