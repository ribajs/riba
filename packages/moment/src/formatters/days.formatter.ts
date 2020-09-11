import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the days formatter gets the days (0 - 30).
 * @see https://momentjs.com/docs/#/durations/days/
 */
export const DaysFormatter: Formatter = {
  name: "days",
  /**
   * As with the other formatters for durations, the days formatter gets the days (0 - 30).
   * @see https://momentjs.com/docs/#/durations/days/
   * @param duration
   */
  read(duration: Duration) {
    return duration.days();
  },
};
