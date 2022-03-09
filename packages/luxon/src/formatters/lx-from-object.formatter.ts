import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, DateObject } from "luxon";

/**
 * Gets a luxon date from an object.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromObject
 */
export const LuxonFromObjectFormatter: Formatter = {
  name: "lx-from-object",
  /**
   * @param object DateObject | undefined
   * @returns DateTime
   */
  read(object: DateObject): DateTime {
    return DateTime.fromObject(object);
  },
};
