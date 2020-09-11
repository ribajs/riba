import { Formatter } from "@ribajs/core";
import { Duration, Moment } from "moment";

/**
 * Gets the seconds.
 * @see https://momentjs.com/docs/#/get-set/second/
 * @see https://momentjs.com/docs/#/durations/seconds/
 */
export const SecondsFormatter: Formatter = {
  name: "seconds",
  /**
   * Gets the seconds.
   * @see https://momentjs.com/docs/#/get-set/second/
   * @see https://momentjs.com/docs/#/durations/seconds/
   * @param target can be a moment object or a duration
   */
  read(target: Moment | Duration) {
    return target.seconds();
  },
};
