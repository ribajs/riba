"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const services_1 = require("../services");
const debug = core_1.Debug('binders:view-static');
/**
 * Loads a url with pjax and show them insite the element this binder is used on
 */
exports.viewStaticBinder = {
    name: 'view-static',
    block: true,
    bind(el) {
        debug('bind', this.customData);
        if (!this.customData) {
            this.customData = {
                nested: null,
            };
        }
    },
    routine(el, options) {
        debug('routine', this.customData);
        const $wrapper = core_1.JQuery(el);
        const self = this;
        // Set default options
        options = options || {};
        options.listenAllLinks = false;
        options.listenPopstate = false;
        options.parseTitle = false;
        options.transition = options.transition || new services_1.HideShowTransition();
        options.viewId = options.url;
        const pjax = new services_1.Pjax(options.viewId, $wrapper, '[data-namespace]', options.listenAllLinks, options.listenPopstate, options.transition, options.parseTitle);
        const $newContainer = pjax.load(options.url);
        $newContainer.then(($container) => {
            $wrapper.replaceWith($container);
            $container.css('visibility', 'visible');
            // add the dateset to the model
            if (!core_1.Utils.isObject(self.view.models)) {
                self.view.models = {};
            }
            // self.view.models.dataset = $container.data();
            if (self.customData.nested) {
                debug('unbind nested');
                self.customData.nested.unbind();
            }
            self.customData.nested = new core_1.View($container[0], self.view.models, self.view.options);
            self.customData.nested.bind();
        });
    },
    unbind(el) {
        debug('unbind');
        if (this.customData.nested) {
            debug('unbind nested'); // TODO not called?
            this.customData.nested.unbind();
        }
        delete this.customData;
    },
};
