import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Check if value is undefined
 */
export const isUndefinedFormatter: IFormatter = {
  name: 'isUndefined',
  read: Utils.isUndefined,
};
