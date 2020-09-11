import { Formatter } from "@ribajs/core";
import { Duration } from "moment";

/**
 * As with the other formatters for durations, the years formatter gets the years.
 * @see https://momentjs.com/docs/#/durations/years/
 */
export const YearsFormatter: Formatter = {
  name: "years",
  /**
   * As with the other formatters for durations, the years formatter gets the years.
   * @see https://momentjs.com/docs/#/durations/years/
   * @param duration
   */
  read(duration: Duration) {
    return duration.years();
  },
};
