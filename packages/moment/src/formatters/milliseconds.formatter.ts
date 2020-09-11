import { Formatter } from "@ribajs/core";
import { Duration, Moment } from "moment";

/**
 * Gets the milliseconds.
 * @see https://momentjs.com/docs/#/durations/milliseconds/
 */
export const MillisecondsFormatter: Formatter = {
  name: "milliseconds",
  /**
   * Gets the milliseconds.
   * @see https://momentjs.com/docs/#/durations/milliseconds/
   * @param target can be a moment object or a duration
   */
  read(target: Moment | Duration) {
    return target.milliseconds();
  },
};
