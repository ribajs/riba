"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendors_1 = require("../vendors");
const utils_1 = require("../services/utils");
const debug = vendors_1.Debug('binder:value');
const getData = (el) => {
    const customData = {};
    customData.$el = vendors_1.JQuery(el);
    customData.type = customData.$el.prop('type');
    customData.tagName = customData.$el.prop('tagName');
    customData.contenteditable = customData.$el.attr('contenteditable') ? true : false;
    customData.isRadio = customData.tagName === 'INPUT' && customData.type === 'radio';
    return customData;
};
/**
 * Sets the element's value. Also sets the model property when the input changes
 * (two-way binder).
 */
exports.valueBinder = {
    name: 'value',
    publishes: true,
    priority: 3000,
    bind(el) {
        if (!this.customData) {
            this.customData = getData(el);
        }
        if (!this.customData.isRadio) {
            this.customData.event = el.getAttribute('event-name') || (el.tagName === 'SELECT' ? 'change' : 'input');
            const self = this;
            if (!this.customData.callback) {
                this.customData.callback = () => {
                    debug('callback called');
                    self.publish();
                };
            }
            if (!this.customData.event) {
                this.customData.event = 'change input keyup paste blur focus';
            }
            vendors_1.JQuery(el).on(this.customData.event, this.customData.callback);
        }
    },
    unbind(el) {
        vendors_1.JQuery(el).off(this.customData.event, this.customData.callback);
    },
    routine(el, value) {
        const oldValue = this.getValue(el);
        debug('routine value', value);
        if (!this.customData) {
            this.customData = getData(el);
        }
        if (this.customData.isRadio) {
            el.setAttribute('value', value);
        }
        else {
            if (el.type === 'select-multiple') {
                if (Array.isArray(value)) {
                    for (let i = 0; i < el.options.length; i++) {
                        const option = el.options[i];
                        option.selected = value.indexOf(option.value) > -1;
                    }
                    // TODO check if the value was really changed
                    el.dispatchEvent(new Event('change'));
                }
            }
            else if (el.getAttribute('contenteditable')) {
                if (utils_1.Utils.getString(value) !== oldValue) {
                    el.innerHTML = value; // TODO write test for contenteditable
                    el.dispatchEvent(new Event('change'));
                }
            }
            else {
                if (utils_1.Utils.getString(value) !== oldValue) {
                    el.value = value != null ? value : '';
                    el.dispatchEvent(new Event('change'));
                }
            }
        }
    },
    getValue: utils_1.Utils.getInputValue,
};
