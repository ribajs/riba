import { isNumber } from "@ribajs/utils/src/type";

/**
 * Gets back random value of array
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 *
 * Or gets back a randon number
 * Random number between 0 and 6:
 * @example <div rv-add-class='6 | random'>
 * Random number between 1 and 6:
 * @example <div rv-add-class='6 | random 1'>
 */
export const randomFormatter = {
  name: "random",
  read(arrayOrMaxNumber: any, min = 0) {
    // If is array
    if (Array.isArray(arrayOrMaxNumber)) {
      return arrayOrMaxNumber[
        Math.floor(Math.random() * arrayOrMaxNumber.length)
      ];
    }
    // If is number
    if (isNumber(arrayOrMaxNumber)) {
      const max = arrayOrMaxNumber as number;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return null;
  },
};
