import { Formatter } from "@ribajs/core";
import { DateTime } from "luxon";

/**
 * Create an invalid DateTime.
 */
export const LuxonInvalidFormatter: Formatter = {
  name: "lx-invalid",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-invalid
   * @param reason string
   * @param explanation string
   * @returns DateTime
   */
  read(reason: string, explanation: string): DateTime {
    return DateTime.invalid(reason, explanation);
  }
};
