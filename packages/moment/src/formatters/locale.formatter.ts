import { Formatter } from "@ribajs/core";
import moment, { Moment, MomentInput } from "moment";

/**
 *  Changing locales locally 1.7.0+
 * @see https://momentjs.com/docs/#/i18n/instance-locale/
 */
export const LocaleFormatter: Formatter = {
  name: "moment-locale",
  read(target: Moment | MomentInput, locale: string) {
    return moment(target).locale(locale);
  },
};
