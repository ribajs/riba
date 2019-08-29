"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
class BaseTransition {
    constructor(action = 'replace') {
        this.debug = core_1.Debug('barba:BaseTransition');
        this.action = action;
    }
    /**
     * This function is called from Pjax module to initialize
     * the transition.
     *
     * @memberOf Barba.BaseTransition
     * @private
     * @param  {Element} oldContainer
     * @param  {Promise} newContainer
     * @return {Promise}
     */
    init($oldContainer, newContainer) {
        const self = this;
        this.$oldContainer = $oldContainer;
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
    /**
     * This function needs to be called as soon the Transition is finished
     *
     * @memberOf Barba.BaseTransition
     */
    done() {
        this.debug('done');
        // this.$oldContainer[0].parentNode.removeChild(this.$oldContainer[]);
        if (!this.$oldContainer) {
            throw new Error('Can\'t remove old container');
        }
        if (this.action === 'replace') {
            this.$oldContainer.remove();
        }
        // this.newContainer.style.visibility = 'visible';
        if (!this.$newContainer) {
            throw new Error('Can\'t show new container');
        }
        this.$newContainer.css('visibility', 'visible');
        this.deferred.resolve();
    }
}
exports.BaseTransition = BaseTransition;
