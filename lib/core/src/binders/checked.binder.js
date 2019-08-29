"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../services/utils");
/**
 * checked
 * Checks a checkbox or radio input when the value is true. Also sets the model
 * property when the input is checked or unchecked (two-way binder).
 */
exports.checkedBinder = {
    name: 'checked',
    publishes: true,
    priority: 2000,
    bind(el) {
        const self = this;
        this.customData = {};
        if (!this.customData.callback) {
            this.customData.callback = () => {
                self.publish();
            };
        }
        el.addEventListener('change', this.customData.callback);
    },
    unbind(el) {
        el.removeEventListener('change', this.customData.callback);
    },
    routine(el, value) {
        if (el.type === 'radio') {
            el.checked = utils_1.Utils.getString(el.value) === utils_1.Utils.getString(value);
        }
        else {
            el.checked = !!value;
        }
    },
};
