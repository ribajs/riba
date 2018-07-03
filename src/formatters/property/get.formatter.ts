import { Utils } from '../../utils';

/**
 * Get property of object or array
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const get = (obj: any | any[], key: string | number) => {
  if (Utils.isObject(obj) || Utils.isArray(obj)) {
    return obj[key];
  }
  return null;
};
