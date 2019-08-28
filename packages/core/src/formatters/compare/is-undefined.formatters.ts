import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Check if value is undefined
 */
export const isUndefined: IFormatter = {
  name: 'isUndefined',
  read: Utils.isUndefined,
};
