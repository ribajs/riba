import { Formatter } from "@ribajs/core";
import { Duration, Moment } from "moment";

/**
 * Gets the years.
 * @see https://momentjs.com/docs/#/get-set/year/
 * @see https://momentjs.com/docs/#/durations/years/
 */
export const YearsFormatter: Formatter = {
  name: "years",
  /**
   * Gets the years.
   * @see https://momentjs.com/docs/#/get-set/year/
   * @see https://momentjs.com/docs/#/durations/years/
   * @param target can be a moment object or a duration
   */
  read(target: Moment | Duration) {
    return typeof (target as Moment).year === "function"
      ? (target as Moment).year()
      : (target as Duration).years();
  }
};
