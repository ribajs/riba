"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-color="'blue'"></div>
 * ```
 */
exports.cssStarBinder = {
    name: 'style-*',
    routine(el, value) {
        const propertyName = this.args[0];
        if (value === null || value === undefined || value === '') {
            el.style.removeProperty(propertyName);
        }
        else {
            el.style[propertyName] = value;
        }
    },
};
