"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enables the element when value is true.
 */
exports.enabledBinder = {
    name: 'enabled',
    routine(el, value) {
        el.disabled = !value;
    },
};
