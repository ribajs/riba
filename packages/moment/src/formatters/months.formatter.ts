import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the months formatter gets the months (0 - 11).
 * @see https://momentjs.com/docs/#/durations/months/
 */
export const MonthsFormatter: Formatter = {
  name: "months",
  /**
   * As with the other formatters for durations, the months formatter gets the months (0 - 11).
   * @see https://momentjs.com/docs/#/durations/months/
   * @param duration
   */
  read(duration: Duration) {
    return duration.months();
  },
};
