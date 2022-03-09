import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "luxon";

/**
 * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
 */
export const LuxonDurationToJSONFormatter: Formatter = {
  name: "lx-duration-to-json",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#instance-method-toJSON
   * @param target Duration
   * @returns string
   */
  read(target: Duration): string {
    return target.toJSON();
  },
};
