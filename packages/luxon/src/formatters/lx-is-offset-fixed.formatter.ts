import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime } from "luxon";

/**
 * Get whether this zone's offset ever changes, as in a DST.
 */
export const LuxonIsOffsetFixedFormatter: Formatter = {
  name: "lx-is-offset-fixed",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-isOffsetFixed
   * @param target can be a Luxon DateTime object
   * @returns boolean
   */
  read(target: DateTime): boolean {
    return target.isOffsetFixed;
  },
};
