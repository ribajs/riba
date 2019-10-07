import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Check if value is undefined
 */
export const isObjectFormatter: IFormatter = {
  name: 'isObject',
  read: Utils.isObject,
};
