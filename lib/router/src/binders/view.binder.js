"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const services_1 = require("../services");
const debug = core_1.Debug('binders:view');
/**
 * The main wrapper for the riba view
 * TODO convert this to a component
 *
 * ```
 *   <div rv-view='{"listenAllLinks": true}'>
 *     <div class="rv-view-container" {% include 'jumplink-utils-barba-container-attributes', parseCollection: true %}>
 *       {{ content_for_layout }}
 *     </div>
 *   </div>
 * ```
 */
exports.viewBinder = {
    name: 'view',
    block: true,
    bind(el) {
        debug('bind', this.customData);
        const self = this;
        if (!this.customData) {
            this.customData = {};
        }
        this.customData.nested = this.customData.nested || null,
            this.customData.$wrapper = this.customData.$wrapper || core_1.JQuery(el),
            this.customData.onPageReady = (viewId, currentStatus, prevStatus, $container, newPageRawHTML, dataset, isInit) => {
                // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
                if (viewId !== self.customData.options.viewId) {
                    debug('not the right view', self.customData.options.viewId, viewId);
                    return;
                }
                // unbind the old rivets view
                if (self.customData.nested) {
                    debug('unbind nested'); // TODO not called?
                    if (self.customData.options.action === 'replace') {
                        self.customData.nested.unbind();
                    }
                }
                // add the dateset to the model
                if (!core_1.Utils.isObject(self.view.models)) {
                    self.view.models = {};
                }
                if (self.customData.options.datasetToModel === true && core_1.Utils.isObject(dataset)) {
                    self.view.models.dataset = dataset; // = $container.data();
                    debug('newPageReady dataset:', dataset);
                }
                // TODO append on action append
                self.customData.nested = new core_1.View($container[0], self.view.models, self.view.options);
                self.customData.nested.bind();
            };
        this.customData.onTransitionCompleted = (viewId) => {
            debug('onTransitionCompleted', self.customData);
            // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
            if (viewId !== self.customData.options.viewId) {
                debug('[onTransitionCompleted] not the right view', self.customData.options.viewId, viewId);
                return;
            }
            // scroll to Anchor of hash
            if (this.customData.options.scrollToAnchorHash && window.location.hash) {
                const $scrollToMe = core_1.JQuery(window.location.hash);
                if ($scrollToMe && $scrollToMe.length) {
                    const offset = $scrollToMe.offset();
                    if (offset && offset.top) {
                        debug('scroll to anchor:', $scrollToMe);
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                core_1.JQuery('body, html').animate({ scrollTop: offset.top }, {
                                    duration: 1000,
                                    complete: () => {
                                        debug('scroll complete');
                                        resolve();
                                    },
                                    fail: () => {
                                        debug('scroll fail');
                                        reject();
                                    },
                                });
                            }, 0);
                        });
                    }
                }
            }
            return Promise.resolve();
        };
        /*
        * Make the dispatcher available in the model to register event handlers.
        *
        * I.e., if we have initialized rivets/riba with:
        *
        *  `rivets.bind(document.body, model)`,
        *
        * then we can register event handlers for the Barba router dispatcher like this:
        *
        *  `model.routerDispatcher.on('newPageReady', ...);`
        *  `model.routerDispatcher.on('transitionCompleted', ...);`
        * ...etc.
        *
        */
        // this.view.models.routerDispatcher = dispatcher;
    },
    routine(el, options) {
        const $el = core_1.JQuery(el);
        // Set default options
        this.customData.options = options || {};
        this.customData.options.viewId = this.customData.options.viewId || $el.attr('id') || 'main';
        this.customData.options.action = this.customData.options.action || 'replace'; // replace / append
        this.customData.options.parseTitle = core_1.Utils.isBoolean(this.customData.options.parseTitle) ? this.customData.options.parseTitle : false;
        this.customData.options.containerSelector = this.customData.options.containerSelector || '[data-namespace]';
        if (this.customData.options.viewId === 'main') {
            this.customData.options.scrollToTop = core_1.Utils.isBoolean(this.customData.options.scrollToTop) ? this.customData.options.scrollToTop : true;
            this.customData.options.listenAllLinks = core_1.Utils.isBoolean(this.customData.options.listenAllLinks) ? this.customData.options.listenAllLinks : true;
            this.customData.options.listenPopstate = core_1.Utils.isBoolean(this.customData.options.listenPopstate) ? this.customData.options.listenPopstate : true;
            this.customData.options.scrollToAnchorHash = core_1.Utils.isBoolean(this.customData.options.scrollToAnchorHash) ? this.customData.options.scrollToAnchorHash : true;
            this.customData.options.datasetToModel = core_1.Utils.isBoolean(this.customData.options.datasetToModel) ? this.customData.options.datasetToModel : true;
        }
        else {
            this.customData.options.scrollToTop = core_1.Utils.isBoolean(this.customData.options.scrollToTop) ? this.customData.options.scrollToTop : false;
            this.customData.options.listenAllLinks = core_1.Utils.isBoolean(this.customData.options.listenAllLinks) ? this.customData.options.listenAllLinks : false;
            this.customData.options.listenPopstate = core_1.Utils.isBoolean(this.customData.options.listenPopstate) ? this.customData.options.listenPopstate : false;
            this.customData.options.scrollToAnchorHash = core_1.Utils.isBoolean(this.customData.options.scrollToAnchorHash) ? this.customData.options.scrollToAnchorHash : false;
            this.customData.options.datasetToModel = core_1.Utils.isBoolean(this.customData.options.datasetToModel) ? this.customData.options.datasetToModel : false;
        }
        this.customData.options.autoprefetchLinks = this.customData.options.listenAllLinks;
        this.customData.options.transition = this.customData.options.transition || new services_1.HideShowTransition(this.customData.options.action, this.customData.options.scrollToTop);
        this.customData.dispatcher = new core_1.EventDispatcher(this.customData.options.viewId);
        this.customData.prefetch = new services_1.Prefetch();
        debug('routine', this.customData.options.viewId);
        this.customData.$wrapper.attr('id', this.customData.options.viewId);
        debug('options', this.customData.options);
        this.customData.dispatcher.on('newPageReady', this.customData.onPageReady);
        this.customData.dispatcher.on('transitionCompleted', this.customData.onTransitionCompleted);
        const pjax = new services_1.Pjax(this.customData.options.viewId, this.customData.$wrapper, this.customData.options.containerSelector, this.customData.options.listenAllLinks, this.customData.options.listenPopstate, this.customData.options.transition, this.customData.options.parseTitle);
        this.customData.prefetch.init(this.customData.options.autoprefetchLinks);
        pjax.start();
    },
    unbind(el) {
        debug('unbind', this.customData.options.viewId);
        if (this.customData.dispatcher) {
            this.customData.dispatcher.off('newPageReady', this.customData.onPageReady);
            this.customData.dispatcher.off('transitionCompleted', this.customData.onTransitionCompleted);
        }
        if (this.customData && this.customData.nested !== null) {
            this.customData.nested.unbind();
        }
        delete this.customData;
    },
};
