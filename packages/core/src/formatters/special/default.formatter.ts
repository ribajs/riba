import { Utils } from '../../services/utils';

/**
 * Set default value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const defaultBinder = (value: any, defaultValue: any) => {
  if (Utils.isDefined(value)) {
    if (Utils.isString(value)) {
      if (value.length > 0) {
        return value;
      } else {
        return defaultValue;
      }
    }
    return value;
  }
  return defaultValue;
};
