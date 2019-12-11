import {
  Utils as RibaUtils,
} from '@ribajs/core';

const MILLISECONDS_MULTIPLIER = 1000;

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

  // https://github.com/twbs/bootstrap/blob/master/dist/js/bootstrap.bundle.js#L137
  public static  getTransitionDurationFromElement(element: HTMLElement) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element

    const _window$getComputedSt = window.getComputedStyle(element);
    let transitionDuration = _window$getComputedSt.transitionDuration;
    let transitionDelay = _window$getComputedSt.transitionDelay;

    const floatTransitionDuration = parseFloat(transitionDuration);
    const floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first

    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  }
}
