"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendors_1 = require("../vendors");
/**
 * Binds an event handler on the element.
 */
exports.onStarBinder = {
    name: 'on-*',
    function: true,
    priority: 1000,
    bind(el) {
        if (!this.customData) {
            this.customData = {
                handler: null,
            };
        }
    },
    unbind(el) {
        if (this.customData.handler) {
            if (this.args === null) {
                throw new Error('args is null');
            }
            vendors_1.JQuery(el).off(this.args[0], this.customData.handler);
        }
    },
    routine(el, value) {
        if (this.args === null) {
            throw new Error('args is null');
        }
        const eventName = this.args[0];
        if (this.customData.handler) {
            vendors_1.JQuery(el).off(eventName, this.customData);
        }
        this.customData.handler = this.eventHandler(value, el);
        try {
            vendors_1.JQuery(el).on(eventName, (this.customData.handler));
        }
        catch (error) {
            console.warn(error);
            vendors_1.JQuery(el).on(eventName, (event) => {
                this.customData.handler(event);
            });
        }
    },
};
