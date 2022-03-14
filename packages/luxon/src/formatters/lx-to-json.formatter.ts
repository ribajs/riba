import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
 */
export const LuxonToJSONFormatter: Formatter = {
  name: "lx-to-json",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toJSON
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.toJSON();
  },
};
