import { Utils } from '../../utils';

/**
 * Just get the digits of a string, useful to remove px from css value
 * @see http://stackoverflow.com/a/1100653/1465919
 */
export const numberFormatter = (str: string, def: number) => {
  const num = Utils.getNumber(str);
  // If default value is set return the default value if num is 0, null or undefined
  if (def) {
    return num ? num : def;
  }
  return num;
};
