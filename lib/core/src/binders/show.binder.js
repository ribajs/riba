"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Shows the element when value is true.
 */
exports.showBinder = {
    name: 'show',
    routine(el, value) {
        el.style.display = value ? '' : 'none';
        if (value) {
            el.removeAttribute('hidden');
        }
        else {
            el.setAttribute('hidden', 'true');
        }
    },
};
