import { getFormatter } from "./get.formatter";

/**
 * Array formatter to get the last element of an array
 */
export const lastFormatter = {
  name: "last",
  read(array: any[]) {
    return getFormatter.read(array, array.length - 1);
  }
};
