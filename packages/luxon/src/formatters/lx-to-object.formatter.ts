import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns a JavaScript object with this DateTime's year, month, day, and so on.
 */
export const LuxonToObjectFormatter: Formatter = {
  name: "lx-to-object",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toObject
   * @param target can be a Luxon DateTime object
   * @param opts *
   * @returns Object
   */
  read(target: DateTime, includeConfig?: boolean) {
    return target.toObject({ includeConfig });
  },
};
