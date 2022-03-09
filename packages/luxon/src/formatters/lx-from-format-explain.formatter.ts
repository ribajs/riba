import { Formatter } from "@ribajs/core/src/index.js";
import { DateTime, DateTimeOptions, ExplainedFormat } from "luxon";

/**
 * Explain how a string would be parsed by fromFormat()
 */
export const LuxonFromFormatExplainFormatter: Formatter = {
  name: "lx-from-format-explain",
  /**
   * @see https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromFormatExplain
   * @param target can be a Luxon DateTime object
   * @param text string
   * @param fmt string
   * @param options DateTimeOptions
   * @returns ExplainedFormat
   */
  read(text: string, fmt: string, options: DateTimeOptions): ExplainedFormat {
    return DateTime.fromFormatExplain(text, fmt, options);
  },
};
