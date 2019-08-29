"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Hides the element when value is true (negated version of `show` binder).
 */
exports.hideBinder = {
    name: 'hide',
    routine(el, value) {
        el.style.display = value ? 'none' : '';
        if (value) {
            el.setAttribute('hidden', 'true');
        }
        else {
            el.removeAttribute('hidden');
        }
    },
};
