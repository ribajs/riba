"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Disables the element when value is true (negated version of `enabled` binder).
 */
exports.disabledBinder = {
    name: 'disabled',
    routine(el, value) {
        el.disabled = !!value;
    },
};
