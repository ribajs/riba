"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const BaseTransition_1 = require("./BaseTransition");
/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 * @namespace Barba.HideShowTransition
 * @augments Barba.BaseTransition
 */
class HideShowTransition extends BaseTransition_1.BaseTransition {
    constructor(action = 'replace', scrollToTop = true) {
        super(action);
        this.debug = core_1.Debug('barba:HideShowTransition');
        this.action = action;
        this.scrollToTop = scrollToTop;
        this.debug('new HideShowTransition', this.action);
    }
    /**
     * TODO use css transition: https://github.com/julianshapiro/velocity/wiki/Property---ScrollTop
     */
    doScrollToTop() {
        this.debug('scrollToTop');
        return new Promise((resolve, reject) => {
            core_1.JQuery('html, body')
                .animate({
                scrollTop: '0px',
            }, {
                duration: 1000,
                complete: () => {
                    this.debug('scrollToTop complete');
                    resolve();
                },
                fail: () => {
                    this.debug('scrollToTop fail');
                    reject();
                },
            });
        });
    }
    start() {
        this.debug('start');
        if (!this.newContainerLoading) {
            throw new Error('this.newContainerLoading is not set');
        }
        if (this.scrollToTop) {
            this.doScrollToTop()
                .then(() => {
                this.debug('scroll then done');
            });
        }
        this.newContainerLoading.then(this.finish.bind(this));
    }
    finish() {
        this.debug('finish');
        this.done();
    }
}
exports.HideShowTransition = HideShowTransition;
