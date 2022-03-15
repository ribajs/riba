import { isNumber } from "@ribajs/utils/src/type.js";

/**
 * Array formatter to get a subarray from array
 */
export const rangeFormatter = {
  name: "range",
  read(arr: any[], start: number, end: number) {
    start = Number(isNumber(start) ? start : 0);
    end = Number(isNumber(end) ? end : arr.length - 1);
    if (end > arr.length - 1) {
      end = arr.length - 1;
    }
    if (start > end) {
      return [];
    }
    return arr.slice(Number(start || 0), 1 + end);
  }
};
