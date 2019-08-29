"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const BaseTransition_1 = require("./BaseTransition");
/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
class CustomTransition extends BaseTransition_1.BaseTransition {
    constructor() {
        super(...arguments);
        this.debug = core_1.Debug('rivets:CustomTransition');
    }
    init($oldContainer, newContainer) {
        const self = this;
        this.$oldContainer = $oldContainer;
        this.debug('init');
        this.deferred = core_1.Utils.deferred();
        const newContainerReady = core_1.Utils.deferred();
        this.newContainerLoading = newContainerReady.promise;
        this.start();
        newContainer.then(($newContainer) => {
            self.$newContainer = $newContainer;
            newContainerReady.resolve();
        });
        return this.deferred.promise;
    }
    start() {
        this.debug('CustomTransition start');
        if (!this.newContainerLoading) {
            throw new Error('this.newContainerLoading is not set');
        }
        this.newContainerLoading.then(this.finish.bind(this));
    }
    finish($container) {
        document.body.scrollTop = 0;
        this.debug('CustomTransition finish');
        this.done();
    }
}
exports.CustomTransition = CustomTransition;
