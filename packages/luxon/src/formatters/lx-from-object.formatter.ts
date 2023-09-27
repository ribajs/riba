import { Formatter } from "@ribajs/core";
import { DateTime, DateObjectUnits, DateTimeJSOptions } from "luxon";

/**
 * Gets a luxon date from an object.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromObject
 */
export const LuxonFromObjectFormatter: Formatter = {
  name: "lx-from-object",
  /**
   * @param object DateTimeJSOptions | undefined
   * @returns DateTime
   */
  read(obj: DateObjectUnits, opts?: DateTimeJSOptions): DateTime {
    return DateTime.fromObject(obj, opts);
  },
};
