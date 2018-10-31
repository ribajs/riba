import { Utils } from '../../utils';

/**
 * Parse a string to boolean
 */
export const booleanFormatter = (value: string | boolean) => {
  return value === 'true' || value === true;
};
