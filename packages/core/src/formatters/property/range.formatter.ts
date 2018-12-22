import { get } from './get.formatter';
import { Utils } from '../../services/utils';

/**
 * Array formatter to get a subarray from array
 */
export const range = (arr: any[], start: number, end: number) => {
  start = Number(Utils.isNumber(start) ? start : 0);
  end = Number(Utils.isNumber(end) ? end : arr.length - 1);
  if (end > arr.length - 1) {
    end = arr.length - 1;
  }
  if (start > end) {
    return [];
  }
  return arr.slice(Number(start || 0), 1 + end);
};
