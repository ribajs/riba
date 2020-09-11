import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the milliseconds formatter gets the milliseconds.
 * @see https://momentjs.com/docs/#/durations/milliseconds/
 */
export const MillisecondsFormatter: Formatter = {
  name: "milliseconds",
  /**
   * As with the other formatters for durations, the milliseconds formatter gets the milliseconds.
   * @see https://momentjs.com/docs/#/durations/milliseconds/
   * @param duration
   */
  read(duration: Duration) {
    return duration.milliseconds();
  },
};
