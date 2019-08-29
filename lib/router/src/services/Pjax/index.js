"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./HistoryManager"));
__export(require("./Dom"));
__export(require("./Prefetch"));
const core_1 = require("@ribajs/core");
const Cache_1 = require("../Cache");
const Transition_1 = require("../Transition");
const Dom_1 = require("./Dom");
const HistoryManager_1 = require("./HistoryManager");
/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {object}
 */
class Pjax {
    /**
     * Creates an singleton instance of Pjax.
     */
    constructor(id, $wrapper, containerSelector = '[data-namespace]', listenAllLinks = false, listenPopstate = true, transition = new Transition_1.HideShowTransition(), parseTitle = false) {
        this.history = new HistoryManager_1.HistoryManager();
        /**
         * Indicate wether or not use the cache
         *
         * @memberOf Barba.Pjax
         * @type {boolean}
         * @default
         */
        this.cacheEnabled = true;
        /**
         * Indicate if there is an animation in progress
         *
         * @memberOf Barba.Pjax
         * @readOnly
         * @type {boolean}
         */
        this.transitionProgress = false;
        this.parseTitle = false;
        Pjax.DEBUG('constructor', id);
        this.viewId = id;
        let instance = this;
        this.dispatcher = new core_1.EventDispatcher(this.viewId);
        this.listenAllLinks = listenAllLinks;
        this.listenPopstate = listenPopstate;
        if (Pjax.instances[this.viewId]) {
            instance = Pjax.instances[this.viewId];
        }
        instance.transition = instance.transition || transition;
        instance.$wrapper = instance.$wrapper || $wrapper;
        instance.listenAllLinks = core_1.Utils.isBoolean(instance.listenAllLinks) ? instance.listenAllLinks : listenAllLinks;
        instance.listenPopstate = core_1.Utils.isBoolean(instance.listenPopstate) ? instance.listenPopstate : listenPopstate;
        instance.parseTitle = instance.parseTitle || parseTitle;
        if (instance.$wrapper) {
            instance.dom = instance.dom || new Dom_1.Dom(instance.$wrapper, containerSelector, this.parseTitle);
            instance.$wrapper.attr('aria-live', 'polite');
        }
        Pjax.instances[this.viewId] = instance;
        return Pjax.instances[this.viewId];
    }
    static getInstance(id) {
        const result = Pjax.instances[id];
        if (!result) {
            throw new Error(`No Pjax instance with id ${id} found!`);
        }
        return result;
    }
    /**
     * Determine if the link should be followed
     *
     * @memberOf Barba.Pjax
     * @param  {MouseEvent} evt
     * @param  {HTMLAnchorElement} element
     * @return {boolean}
     */
    static preventCheck(evt, element, href) {
        if (!window.history.pushState) {
            return false;
        }
        /**
         * Get href from element if href is not set
         */
        if (!href && element) {
            href = this.getHref(element);
        }
        /**
         * Create fake html element if element is not set
         */
        if (href && !element) {
            element = document.createElement('a');
            element.setAttribute('href', href);
        }
        Pjax.DEBUG('preventCheck', href, element);
        if (!element) {
            return false;
        }
        if (!href) {
            return false;
        }
        // Ignore case when a hash is being tacked on the current URL
        if (href.indexOf('#') > -1) {
            return false;
        }
        // In case you're trying to load the same page
        if (core_1.Utils.cleanLink(href) === core_1.Utils.cleanLink(location.href)) {
            Pjax.DEBUG('trying to load the same page');
            return false;
        }
        // Middle click, cmd click and ctrl click
        if ((evt && (evt.which && evt.which > 1) || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey)) {
            Pjax.DEBUG('Middle click, cmd click or ctrl click');
            return false;
        }
        // Ignore target with _blank target
        if (element.target && element.target === '_blank') {
            Pjax.DEBUG('_blank target');
            return false;
        }
        // Check if it's the same domain
        if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) {
            Pjax.DEBUG('not the the same domain');
            return false;
        }
        // Check if the port is the same
        if (core_1.Utils.getPort() !== core_1.Utils.getPort(element.port)) {
            Pjax.DEBUG('not the the same port');
            return false;
        }
        // Ignore case where there is download attribute
        if (element.getAttribute && typeof element.getAttribute('download') === 'string') {
            Pjax.DEBUG('download link');
            return false;
        }
        if (element.classList.contains(this.ignoreClassLink)) {
            return false;
        }
        return true;
    }
    /**
     * Get the .href parameter out of an element
     * and handle special cases (like xlink:href)
     *
     * @memberOf Barba.Pjax
     * @param  {HTMLAnchorElement} el
     * @return {string} href
     */
    static getHref(el) {
        if (!el) {
            return undefined;
        }
        if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
            return el.getAttribute('xlink:href') || undefined;
        }
        if (typeof (el.href) === 'string') {
            let href = el.href;
            // normalize url
            if (href && core_1.Utils.isAbsoluteUrl(href)) {
                const location = core_1.Utils.getLocation();
                const host = location.protocol + '//' + location.hostname;
                // if is not an external link
                if (href.indexOf(host) === 0) {
                    // get relative href
                    href = href.replace(host, '');
                }
            }
            return href;
        }
        return undefined;
    }
    /**
     * Function to be called to start Pjax
     *
     * @memberOf Barba.Pjax
     */
    start() {
        if (this.$wrapper) {
            this.init(this.$wrapper, this.listenAllLinks, this.listenPopstate);
        }
        else {
            console.error(`Can't init pjax without wrapper`);
        }
    }
    /**
     * Return the currentURL cleaned
     *
     * @memberOf Barba.Pjax
     * @return {string} currentUrl
     */
    getCurrentUrl() {
        return core_1.Utils.cleanLink(core_1.Utils.getUrl());
    }
    /**
     * Change the URL with pushstate and trigger the state change
     *
     * @memberOf Barba.Pjax
     * @param {string} newUrl
     */
    goTo(url, newTab = false) {
        Pjax.DEBUG('goTo', url, newTab);
        if (newTab) {
            const win = window.open(url, '_blank');
            if (win) {
                return win.focus();
            }
            return false;
        }
        if (url.indexOf('http') !== 0) {
            window.history.pushState(null, '', url);
            return this.onStateChange();
        }
        // fallback
        this.forceGoTo(url);
    }
    /**
     * Return a transition object
     *
     * @memberOf Barba.Pjax
     * @return {Barba.Transition} Transition object
     */
    getTransition() {
        // User customizable
        return this.transition || new Transition_1.HideShowTransition();
    }
    /**
     * Load an url, will start an xhr request or load from the cache
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param  {string} url
     * @return {Promise<JQuery<HTMLElement>>}
     */
    load(url) {
        const deferred = core_1.Utils.deferred();
        const self = this;
        let xhr;
        xhr = Pjax.cache.get(url);
        if (!xhr) {
            xhr = core_1.Utils.xhr(url);
            Pjax.cache.set(url, xhr);
        }
        xhr.then((data) => {
            if (!self.dom) {
                throw new Error('[Pjax] you need to call the start method first!');
            }
            const $container = self.dom.parseResponse(data);
            self.dom.putContainer($container);
            if (!self.cacheEnabled) {
                Pjax.cache.reset();
            }
            deferred.resolve($container);
        }, () => {
            // Something went wrong (timeout, 404, 505...)
            self.forceGoTo(url);
            deferred.reject();
        });
        return deferred.promise;
    }
    /**
     * Attach the eventlisteners
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    bindEvents(listenAllLinks, listenPopstate) {
        // you can also use the rv-router for this
        if (listenAllLinks) {
            console.warn('listenAllLinks');
            document.addEventListener('click', this.onLinkClick.bind(this));
        }
        if (listenPopstate) {
            window.addEventListener('popstate', this.onStateChange.bind(this));
        }
    }
    /**
     * Force the browser to go to a certain url
     *
     * @memberOf Barba.Pjax
     * @param {Location} url
     * @private
     */
    forceGoTo(url) {
        if (url && url.href) {
            window.location = url;
        }
        if (typeof url === 'string') {
            window.location.href = url;
        }
    }
    /**
     * Callback called from click event
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param {MouseEvent} evt
     */
    onLinkClick(evt) {
        let el = evt.target;
        // Go up in the nodelist until we
        // find something with an href
        while (el && !Pjax.getHref(el)) {
            el = el.parentNode;
        }
        const href = Pjax.getHref(el);
        if (Pjax.preventCheck(evt, el, href)) {
            evt.stopPropagation();
            evt.preventDefault();
            this.dispatcher.trigger('linkClicked', el, evt);
            if (!href) {
                throw new Error('href is null');
            }
            this.goTo(href);
        }
    }
    /**
     * Method called after a 'popstate' or from .goTo()
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    onStateChange() {
        const newUrl = this.getCurrentUrl();
        if (this.transitionProgress) {
            this.forceGoTo(newUrl);
        }
        if (this.history.currentStatus().url === newUrl) {
            return false;
        }
        this.history.add(newUrl);
        const $newContainer = this.load(newUrl);
        const transition = this.getTransition();
        this.transitionProgress = true;
        this.dispatcher.trigger('initStateChange', this.viewId, this.history.currentStatus(), this.history.prevStatus());
        if (!this.dom) {
            throw new Error('[Pjax] you need to call the start method first!');
        }
        const transitionInstance = transition.init(this.dom.getContainer(document.body), $newContainer);
        $newContainer.then(this.onNewContainerLoaded.bind(this));
        transitionInstance.then(this.onTransitionEnd.bind(this));
    }
    /**
     * Function called as soon the new container is ready
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param {JQuery<HTMLElement>} $container
     */
    onNewContainerLoaded($container) {
        const currentStatus = this.history.currentStatus();
        if (!this.dom) {
            throw new Error('[Pjax] you need to call the start method first!');
        }
        currentStatus.namespace = this.dom.getNamespace($container);
        this.dispatcher.trigger('newPageReady', this.viewId, this.history.currentStatus(), this.history.prevStatus(), $container, this.dom.currentHTML, $container.data(), false);
    }
    /**
     * Function called as soon the transition is finished
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    onTransitionEnd() {
        this.transitionProgress = false;
        this.dispatcher.trigger('transitionCompleted', this.viewId, this.history.currentStatus(), this.history.prevStatus());
    }
    /**
     * Init the events
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    init($wrapper, listenAllLinks, listenPopstate) {
        if (!this.dom) {
            throw new Error('[Pjax] you need to call the start method first!');
        }
        const $container = this.dom.getContainer(document.body);
        this.$wrapper = $wrapper;
        this.history.add(this.getCurrentUrl(), this.dom.getNamespace($container));
        // Fire for the current view.
        this.dispatcher.trigger('initStateChange', this.viewId, this.history.currentStatus());
        this.dispatcher.trigger('newPageReady', this.viewId, this.history.currentStatus(), {}, $container, this.dom.currentHTML, $container.data(), true);
        this.dispatcher.trigger('transitionCompleted', this.viewId, this.history.currentStatus());
        this.bindEvents(listenAllLinks, listenPopstate);
    }
}
exports.Pjax = Pjax;
/**
 * Class name used to ignore links
 *
 * @memberOf Barba.Pjax
 * @type {string}
 * @default
 */
Pjax.ignoreClassLink = 'no-barba';
Pjax.cache = new Cache_1.BaseCache();
Pjax.instances = {};
Pjax.DEBUG = core_1.Debug('router:Pjax');
