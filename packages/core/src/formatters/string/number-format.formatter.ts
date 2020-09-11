import { Formatter } from "../../interfaces";
import { isNumber } from "@ribajs/utils/src/type";
import { toDecimalFormatter } from "../type/to-decimal.formatter";
import { isIntegerFormatter } from "../type/is-integer.formatter";

// TODO set by current locale
const DEFAULT_DECIMAL_SEPARATOR = ".";
const DEFAULT_THOUSAND_SEPARATOR = "'";
const DEFAULT_PRECISION = 2;
const DEFAULT_NUMBER_PADDING = 0;
const DEFAULT_NUMBER_PADDING_SYMBOL = "0";

/**
 * Returns a formatted version of the target as string.
 * The number will always be rounded after the DIN 1333 (1.55 => 1.6 and -1.55 => -1.6)
 */
export const numberFormatFormatter: Formatter = {
  name: "numberFormat",
  /**
   * Returns a formatted version of the target as string.
   * The number will always be rounded after the DIN 1333 (1.55 => 1.6 and -1.55 => -1.6)
   * @param target
   * @param numberPadding (default: 0)
   * @param precision (default: 2)
   * @param decimalSeparator (default: ".")
   * @param thousandSeparator (default: "'")
   */
  read(
    target: number,
    precision = DEFAULT_PRECISION,
    decimalSeparator = DEFAULT_DECIMAL_SEPARATOR,
    thousandSeparator = DEFAULT_THOUSAND_SEPARATOR,
    numberPadding = DEFAULT_NUMBER_PADDING,
    numberPaddingSymbol = DEFAULT_NUMBER_PADDING_SYMBOL
  ) {
    if (!toDecimalFormatter.read) {
      throw new Error("toDecimalFormatter must have a read function");
    }
    if (!isIntegerFormatter.read) {
      throw new Error("isIntegerFormatter must have a read function");
    }
    target = isNumber(target) ? target : toDecimalFormatter.read(target);

    if (!isIntegerFormatter.read(precision)) {
      precision = DEFAULT_PRECISION;
    }

    /*
     * Thanks to user2823670
     * http://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
     */
    let retStr = (+(
      Math.round(+(Math.abs(target) + "e" + precision)) +
      "e" +
      -precision
    )).toFixed(precision);
    if (target < 0) retStr = "-" + retStr;

    /**
     * Thanks to Elias Zamaria
     * http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
     */
    const ret = retStr.split(".");
    if (ret.length == 2) {
      return (
        ret[0]
          .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
          .padStart(numberPadding, numberPaddingSymbol) +
        decimalSeparator +
        ret[1]
      );
    }

    return ret[0]
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
      .padStart(numberPadding, numberPaddingSymbol);
  },
};
