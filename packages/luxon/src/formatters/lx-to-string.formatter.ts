import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns a string representation of this DateTime appropriate for debugging
 */
export const LuxonToStringFormatter: Formatter = {
  name: "lx-to-string",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toString
   * @param target can be a Luxon DateTime object
   */
  read(target: DateTime) {
    return target.toString();
  },
};
