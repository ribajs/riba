import { Formatter } from "@ribajs/core/src/index.js";
import { Duration } from "moment";

/**
 * Sometimes, you want all the goodness of moment#from but you don't want to have to create two moments, you just want to display a length of time.
 * For this you can use the humanize duration formatter.
 * @see https://momentjs.com/docs/#/durations/humanize/
 */
export const HumanizeFormatter: Formatter = {
  name: "humanize",
  /**
   * Sometimes, you want all the goodness of moment#from but you don't want to have to create two moments, you just want to display a length of time.
   * For this you can use the humanize duration formatter.
   * @see https://momentjs.com/docs/#/durations/humanize/
   * @param duration
   * @param withSuffix By default, the return string is describing a duration a month (suffix-less). If you want an oriented duration in a month, a month ago (with suffix), pass in true.
   * @param thresholds Humanize output can be configured with relative time thresholds. To specify thresholds for a particular invocation of humanize, pass them as a sole argument or after suffix arg: `{d: 7, w: 4}`
   */
  read(duration: Duration, withSuffix = false, thresholds?: any) {
    return duration.humanize(withSuffix, thresholds);
  }
};
