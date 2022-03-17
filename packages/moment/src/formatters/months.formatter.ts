import { Formatter } from "@ribajs/core";
import { Duration, Moment } from "moment";

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
  read(target: Moment | Duration) {
    return typeof (target as Moment).month === "function"
      ? (target as Moment).month()
      : (target as Duration).months();
  }
};
