import { Utils } from '../../services/utils';

/**
 * Check if value is undefined
 */
export const isUndefined = (value: any) => {
  return !Utils.isDefined(value);
};
