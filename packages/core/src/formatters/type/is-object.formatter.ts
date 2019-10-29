import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Checks if value is undefined
 */
export const isObjectFormatter: IFormatter = {
  name: 'isObject',
  read: Utils.isObject,
};
