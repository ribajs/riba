import { Formatter } from "@ribajs/core";
import { Duration, Moment } from "moment";

/**
 * Gets or sets the day of the week.
 * @see https://momentjs.com/docs/#/get-set/date/
 * @see https://momentjs.com/docs/#/durations/days/
 */
export const DaysFormatter: Formatter = {
  name: "days",
  /**
   * Gets or sets the day of the week.
   * @see https://momentjs.com/docs/#/get-set/date/
   * @see https://momentjs.com/docs/#/durations/days/
   * @param duration
   */
  read(target: Moment | Duration) {
    return target.days();
  }
};
