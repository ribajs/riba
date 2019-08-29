"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
/**
 * BaseView to be extended
 *
 * @namespace Barba.BaseView
 * @type {Object}
 */
class BaseView {
    constructor() {
        this.dispatcher = new core_1.EventDispatcher();
    }
    /**
     * Helper to extend the object
     *
     * @memberOf Barba.BaseView
     * @param  {Object} newObject
     * @return {Object} newInheritObject
     */
    extend(obj) {
        return core_1.Utils.extend(false, this, obj);
    }
    /**
     * Init the view.
     * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
     * in this way .onEnter() and .onEnterCompleted() will be fired for the current
     * container when the page is loaded.
     *
     * @memberOf Barba.BaseView
     */
    init() {
        const self = this;
        this.dispatcher.on('initStateChange', (viewId, newStatus, oldStatus) => {
            if (oldStatus && oldStatus.namespace === self.namespace) {
                self.onLeave();
            }
        });
        this.dispatcher.on('newPageReady', (viewId, newStatus, oldStatus, $container, html, isInit) => {
            self.$container = $container;
            if (newStatus.namespace === self.namespace) {
                self.onEnter();
            }
        });
        this.dispatcher.on('transitionCompleted', (viewId, newStatus, oldStatus) => {
            if (newStatus.namespace === self.namespace) {
                self.onEnterCompleted();
            }
            if (oldStatus && oldStatus.namespace === self.namespace) {
                self.onLeaveCompleted();
            }
        });
    }
}
exports.BaseView = BaseView;
