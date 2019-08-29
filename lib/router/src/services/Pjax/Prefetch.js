"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const _1 = require(".");
/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {object}
 */
class Prefetch {
    /**
     * Creates an singleton instance of Prefetch.
     */
    constructor() {
        /**
         * Class name used to ignore prefetch on links
         *
         * @memberOf Barba.Prefetch
         * @type {String}
         * @default
         */
        this.ignoreClassLink = 'no-barba-prefetch';
        this.debug = core_1.Debug('router:Prefetch');
        if (Prefetch.instance) {
            return Prefetch.instance;
        }
        Prefetch.instance = this;
    }
    /**
     * Init the event listener on mouseover and touchstart
     * for the prefetch
     *
     * @memberOf Barba.Prefetch
     */
    init(autobindLinks = false) {
        if (!window.history.pushState) {
            return false;
        }
        // We do this with rv-route
        if (autobindLinks) {
            document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
            document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
        }
    }
    /**
     * Callback for the mousehover/touchstart, please use the rv-route binder instead
     *
     * @memberOf Barba.Prefetch
     * @private
     * @param  {object} evt
     */
    onLinkEnter(evt, url, el) {
        if (!url) {
            if (!el && evt) {
                el = evt.target || evt.currentTarget;
            }
            if (!el) {
                throw new Error('HTML Element not set');
            }
            while (el && !_1.Pjax.getHref(el)) {
                el = el.parentNode; // TODO testme
            }
            if (!el || el.classList.contains(this.ignoreClassLink)) {
                return;
            }
            url = _1.Pjax.getHref(el);
        }
        this.debug('onLinkEnter', url);
        if (!url) {
            console.warn(`Url is not defined, you can't cache the link without the url. Please make shure your element has the href attribute or pass the url directly to this function.`);
        }
        // Check if the link is elegible for Pjax
        if (url && _1.Pjax.preventCheck(evt, el, url) && !_1.Pjax.cache.get(url)) {
            const xhr = core_1.Utils.xhr(url);
            _1.Pjax.cache.set(url, xhr);
            this.debug('cached', url, xhr);
        }
        else {
            this.debug('not cached', url);
            if (url) {
                if (_1.Pjax.cache.get(url)) {
                    this.debug('already cached', _1.Pjax.cache.get(url));
                }
                if (!_1.Pjax.preventCheck(evt, el, url)) {
                    this.debug('preventCheck failed', _1.Pjax.preventCheck(evt, el, url));
                }
            }
        }
    }
}
exports.Prefetch = Prefetch;
