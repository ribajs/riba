import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Check if value is defined
 */
export const isDefined: IFormatter = {
  name: 'isDefined',
  read: Utils.isDefined,
};
