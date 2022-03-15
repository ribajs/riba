import { Formatter } from "@ribajs/core/src/index.js";
import { Duration, Moment } from "moment";

/**
 * Gets the minutes.
 * @see https://momentjs.com/docs/#/get-set/minute/
 * @see https://momentjs.com/docs/#/durations/minutes/
 */
export const MinutesFormatter: Formatter = {
  name: "minutes",
  /**
   * Gets the minutes.
   * @see https://momentjs.com/docs/#/get-set/minute/
   * @see https://momentjs.com/docs/#/durations/minutes/
   * @param target can be a moment object or a duration
   */
  read(target: Moment | Duration) {
    return target.minutes();
  }
};
