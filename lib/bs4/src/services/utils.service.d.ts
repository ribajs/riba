import { Utils as RibaUtils } from '@ribajs/core';
/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
 */
export declare class Utils extends RibaUtils {
    /**
     * Shoutout AngusCroll (https://goo.gl/pxwQGp)
     * @param obj
     */
    static toType(obj: any): string | null;
    /**
     *
     * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
     */
    static isElement(obj: Element | Element[]): number;
    /**
     *
     * @param componentName
     * @param config
     * @param configTypes
     */
    static typeCheckConfig(componentName: string, config: any, configTypes: any): void;
}
