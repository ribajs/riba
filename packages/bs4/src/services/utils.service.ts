import {
  Utils as RibaUtils,
} from '@ribajs/core';

/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
 */
export class Utils extends RibaUtils {

  /**
   * Shoutout AngusCroll (https://goo.gl/pxwQGp)
   * @param obj
   */
  public static toType(obj: any) {
    const matches =  {}.toString.call(obj).match(/\s([a-z]+)/i);
    return matches ? matches[1].toLowerCase() : null;
  }

  /**
   *
   * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
   */
  public static isElement(obj: Element | Element[]) {
    return ((obj as Element[])[0] || obj as Element).nodeType;
  }

  /**
   *
   * @param componentName
   * @param config
   * @param configTypes
   */
  public static typeCheckConfig(componentName: string, config: any, configTypes: any) {
    for (const property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        const expectedTypes = configTypes[property];
        const value         = config[property];
        const valueType     = value && Utils.isElement(value) ? 'element' : Utils.toType(value);

        if (!valueType || !new RegExp(expectedTypes).test(valueType)) {
          throw new Error(
            `${componentName.toUpperCase()}: ` +
            `Option "${property}" provided type "${valueType}" ` +
            `but expected type "${expectedTypes}".`);
        }
      }
    }
  }
}
