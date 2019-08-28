import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Check if value is undefined
 */
export const isObject: IFormatter = {
  name: 'isObject',
  read: Utils.isObject,
};
