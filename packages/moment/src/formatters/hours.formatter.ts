import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, Moment } from "moment";

/**
 * Gets the hour.
 * @see https://momentjs.com/docs/#/get-set/minute/
 * @see https://momentjs.com/docs/#/durations/hours/
 */
export const HoursFormatter: Formatter = {
  name: "hours",
  /**
   * Gets the hour.
   * @see https://momentjs.com/docs/#/get-set/minute/
   * @see https://momentjs.com/docs/#/durations/hours/
   * @param target can be a moment object or a duration
   */
  read(target: Moment | Duration) {
    return target.hours();
  }
};
