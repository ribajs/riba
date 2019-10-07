import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Check if value is defined
 */
export const isDefinedFormatter: IFormatter = {
  name: 'isDefined',
  read: Utils.isDefined,
};
