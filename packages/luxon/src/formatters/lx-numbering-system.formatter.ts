import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get the numbering system of a DateTime, such 'beng'.
 */
export const LuxonNumberingSystemFormatter: Formatter = {
  name: "lx-numbering-system",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-numberingSystem
   * @param target can be a Luxon DateTime object
   * @returns string
   */
  read(target: DateTime): string {
    return target.numberingSystem;
  }
};
