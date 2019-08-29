"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendors_1 = require("../vendors");
/**
 * animate-{class}
 * Add / remove animation class with start and done affix
 */
exports.animateStarBinder = {
    name: 'animate-*',
    function: true,
    priority: 1000,
    bind(el) {
        const $el = vendors_1.JQuery(el);
        const animateClassName = this.args[0];
        $el
            .addClass(animateClassName);
    },
    unbind(el) {
        //
    },
    routine(el, start) {
        const $el = vendors_1.JQuery(el);
        const animateClassName = this.args[0];
        if (start) {
            $el
                .addClass(animateClassName + '-start')
                .removeClass(animateClassName + '-done');
        }
        else {
            $el
                .removeClass(animateClassName + '-start')
                .addClass(animateClassName + '-done');
        }
    },
};
