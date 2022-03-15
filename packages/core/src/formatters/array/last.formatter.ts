import { getFormatter } from "./get.formatter.js";

/**
 * Array formatter to get the last element of an array
 */
export const lastFormatter = {
  name: "last",
  read(array: any[]) {
    return getFormatter.read(array, array.length - 1);
  }
};
