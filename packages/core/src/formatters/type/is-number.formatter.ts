import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Checks if value is a number
 */
export const isNumberFormatter: IFormatter = {
  name: 'isNumber',
  read: Utils.isNumber,
};
