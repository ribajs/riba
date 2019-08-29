"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets the element's text value.
 */
exports.htmlBinder = {
    name: 'html',
    routine(el, value) {
        el.innerHTML = value != null ? value : '';
    },
};
