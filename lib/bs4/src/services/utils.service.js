"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
 */
class Utils extends core_1.Utils {
    /**
     * Shoutout AngusCroll (https://goo.gl/pxwQGp)
     * @param obj
     */
    static toType(obj) {
        const matches = {}.toString.call(obj).match(/\s([a-z]+)/i);
        return matches ? matches[1].toLowerCase() : null;
    }
    /**
     *
     * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
     */
    static isElement(obj) {
        return (obj[0] || obj).nodeType;
    }
    /**
     *
     * @param componentName
     * @param config
     * @param configTypes
     */
    static typeCheckConfig(componentName, config, configTypes) {
        for (const property in configTypes) {
            if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                const expectedTypes = configTypes[property];
                const value = config[property];
                const valueType = value && Utils.isElement(value) ? 'element' : Utils.toType(value);
                if (!valueType || !new RegExp(expectedTypes).test(valueType)) {
                    throw new Error(`${componentName.toUpperCase()}: ` +
                        `Option "${property}" provided type "${valueType}" ` +
                        `but expected type "${expectedTypes}".`);
                }
            }
        }
    }
}
exports.Utils = Utils;
