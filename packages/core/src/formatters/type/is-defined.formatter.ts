import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Checks if value is defined
 */
export const isDefinedFormatter: IFormatter = {
  name: 'isDefined',
  read: Utils.isDefined,
};
