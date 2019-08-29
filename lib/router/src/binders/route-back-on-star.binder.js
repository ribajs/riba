"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
exports.goBack = () => {
    window.history.back();
};
/**
 * Calls `window.history.back()` an event.
 */
exports.routeBackOnStarBinder = {
    name: 'route-back-on-*',
    priority: 3000,
    bind(el) {
        // noting
    },
    unbind(el) {
        core_1.JQuery(el).off(this.args[0], exports.goBack);
    },
    routine(el, options) {
        if (this.args === null) {
            throw new Error('args is null');
        }
        const eventName = this.args[0];
        core_1.JQuery(el).off(eventName, exports.goBack);
        core_1.JQuery(el).on(eventName, exports.goBack);
    },
};
