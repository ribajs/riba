import { Formatter } from "@ribajs/core";
import { DateTime, LocaleOptions } from "luxon";

/**
 * Returns the resolved Intl options for this DateTime.
 */
export const LuxonResolvedLocaleOptsFormatter: Formatter = {
  name: "lx-resolved-locale-opts",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-method-resolvedLocaleOpts
   * @param target can be a Luxon DateTime object
   * @param opts Intl.DateTimeFormatOptions & LocaleOptions
   * @returns Intl.ResolvedDateTimeFormatOptions
   */
  read(
    target: DateTime,
    opts: Intl.DateTimeFormatOptions & LocaleOptions
  ): Intl.ResolvedDateTimeFormatOptions {
    return target.resolvedLocaleOpts(opts);
  }
};
