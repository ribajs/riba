import { IFormatter } from '../../interfaces/formatter';
import { Utils } from '../../services/utils';

/**
 * Checks if value is an boolean
 */
export const isBooleanFormatter: IFormatter = {
  name: 'isBoolean',
  read: Utils.isBoolean,
};
