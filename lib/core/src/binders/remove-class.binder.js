"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_module_1 = require("../vendors/jquery.module");
/**
 * remove-class
 */
exports.removeClassBinder = {
    name: 'remove-class',
    routine(el, value) {
        const $el = jquery_module_1.JQuery(el);
        if (value) {
            $el.removeClass(value);
        }
        return value;
    },
};
