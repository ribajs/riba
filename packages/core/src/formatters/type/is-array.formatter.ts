import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Checks if value is an array
 */
export const isArrayFormatter: IFormatter = {
  name: 'isArray',
  read: Utils.isArray,
};
