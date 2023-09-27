import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
 */
export const LuxonToJSONFormatter: Formatter = {
  name: "lx-to-json",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toJSON
   * @param target can be a Luxon DateTime object
   * @returns string | null
   */
  read(target: DateTime) {
    return target.toJSON();
  },
};
