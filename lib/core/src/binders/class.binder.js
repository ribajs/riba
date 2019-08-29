"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_module_1 = require("../vendors/jquery.module");
/**
 * class
 * Adds the value of the attribute to the class.
 * Instead of `class-[classname]` the classname is setted by the
 * attributes value and not by the star value
 */
exports.classBinder = {
    name: 'class',
    function: true,
    priority: 1000,
    bind(el) {
        const $el = jquery_module_1.JQuery(el);
        this.customData = {
            $el,
            staticClasses: $el.attr('class'),
        };
    },
    unbind(el) {
        delete this.customData;
    },
    routine(el, newValue) {
        if (newValue) {
            jquery_module_1.JQuery(el).attr('class', this.customData.staticClasses);
            jquery_module_1.JQuery(el).addClass(newValue);
        }
    },
};
