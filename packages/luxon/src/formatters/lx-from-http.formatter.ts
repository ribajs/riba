import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, DateTimeOptions } from "luxon";

/**
 * Gets a luxon date from a HTTP header date.
 * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromHTTP
 */
export const LuxonFromHTTPFormatter: Formatter = {
  name: "lx-from-http",
  /**
   * @param text string
   * @param options DateTimeOptions | undefined
   * @returns DateTime
   */
  read(text: string, options?: DateTimeOptions): DateTime {
    return DateTime.fromHTTP(text, options);
  },
};
