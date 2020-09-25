import { Formatter } from "@ribajs/core";
import { Duration, Moment } from "moment";

/**
 * Gets the week of the year.
 * @see https://momentjs.com/docs/#/get-set/iso-week/
 * @see https://momentjs.com/docs/#/durations/weeks/
 */
export const WeeksFormatter: Formatter = {
  name: "weeks",
  /**
   * Gets the week of the year.
   * @see https://momentjs.com/docs/#/get-set/iso-week/
   * @see https://momentjs.com/docs/#/durations/weeks/
   * @param target can be a moment object or a duration
   */
  read(target: Moment | Duration) {
    return target.weeks();
  },
};
