import { Formatter } from "@ribajs/core";
import { DateTime, LocaleOptions } from "luxon";

/**
 * Returns an array of format "parts", meaning individual tokens along with metadata.
 * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
 * Defaults to the system's locale if no locale has been specified
 *
 * @see — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
 */
export const LuxonToLocalePartsFormatter: Formatter = {
  name: "lx-to-locale-parts",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-toLocaleParts
   * @param target can be a Luxon DateTime object
   * @param opts LocaleOptions & Intl.DateTimeFormatOptions
   * @returns *
   */
  read(
    target: DateTime,
    opts?: LocaleOptions & Intl.DateTimeFormatOptions
  ): { type: string; value: string }[] {
    return target.toLocaleParts(opts);
  }
};
