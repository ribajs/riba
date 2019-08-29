"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets the element's text value.
 */
exports.textBinder = {
    name: 'text',
    routine(el, value) {
        el.textContent = value != null ? value : '';
    },
};
