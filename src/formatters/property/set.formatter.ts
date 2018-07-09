import { Utils } from '../../utils';

/**
 * Set property of object
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const set = (obj: any | any[], key: string | number, value: any) => {
  if (Utils.isObject(obj) || Utils.isArray(obj)) {
    obj[key] = value;
  }

  return obj;
};
