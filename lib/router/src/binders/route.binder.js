"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const core_1 = require("@ribajs/core");
const debug = core_1.Debug('binders:route');
/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
exports.routeBinder = {
    name: 'route',
    bind(el) {
        this.customData = {
            prefetch: new services_1.Prefetch(),
            dispatcher: undefined,
            options: {
                removeAfterActivation: false,
                newTab: false,
            },
            $el: core_1.JQuery(el),
            checkURL(urlToCheck) {
                if (urlToCheck && core_1.Utils.onRoute(urlToCheck)) {
                    return true;
                }
                return false;
            },
            onClick(event) {
                debug('go to', this.customData.options.url);
                // Do not go to ref without pajax
                event.preventDefault();
                if (core_1.Utils.onRoute(this.customData.options.url)) {
                    debug('already on this site');
                }
                else {
                    if (this.customData.options.url) {
                        const pjax = services_1.Pjax.getInstance(this.customData.options.viewId);
                        pjax.goTo(this.customData.options.url, this.customData.options.newTab);
                    }
                }
                if (this.customData.options.removeAfterActivation && this.customData.$el) {
                    // this.unbind(); TODO?
                    this.customData.$el.remove();
                }
            },
            onNewPageReady() {
                if (this.customData.$el) {
                    this.customData.$el.trigger('new-page-ready');
                }
                this.customData.checkURL.call(this, this.customData.options.url);
            },
            onLinkEnter(event) {
                this.customData.prefetch.onLinkEnter(event, this.customData.options.url);
            },
        };
    },
    routine(el, optionsOrUrl) {
        if (core_1.Utils.isString(optionsOrUrl)) {
            this.customData.options.url = optionsOrUrl;
        }
        else if (core_1.Utils.isObject(optionsOrUrl)) {
            this.customData.options = optionsOrUrl;
        }
        this.customData.options.viewId = this.customData.options.viewId || 'main';
        this.customData.options.removeAfterActivation = core_1.Utils.isBoolean(this.customData.options.removeAfterActivation) ? this.customData.options.removeAfterActivation : false;
        this.customData.dispatcher = new core_1.EventDispatcher(this.customData.options.viewId);
        this.customData.options.newTab = false;
        if (!this.customData.$el) {
            throw new Error('$el is not set');
        }
        const isAnkerHTMLElement = this.customData.$el.prop('tagName') === 'A';
        debug('getBinder', el, this.customData.options.url);
        if (!this.customData.options.url && isAnkerHTMLElement) {
            const url = this.customData.$el.attr('href');
            if (url) {
                this.customData.options.url = url;
            }
        }
        if (this.customData.$el.attr('target') === '_blank') {
            this.customData.options.newTab = true;
        }
        const location = core_1.Utils.getLocation();
        const host = location.protocol + '//' + location.hostname;
        // normalize url
        if (this.customData.options.url && core_1.Utils.isAbsoluteUrl(this.customData.options.url)) {
            debug('is absolut url', this.customData.options.url);
            // if is an internal link
            if (core_1.Utils.isInternalUrl(this.customData.options.url)) {
                debug('interal url', this.customData.options.url);
                // get relative url
                this.customData.options.url = this.customData.options.url.replace(host, '');
            }
            else {
                debug('external url', this.customData.options.url);
                this.customData.options.newTab = true;
            }
        }
        else {
            debug('is relative url', this.customData.options.url);
        }
        // set href if not set
        if (isAnkerHTMLElement && !this.customData.$el.attr('href') && this.customData.options.url) {
            this.customData.$el.attr('href', this.customData.options.url);
        }
        this.customData.dispatcher.on('newPageReady', this.customData.onNewPageReady.bind(this));
        this.customData.$el.off('click').on('click', this.customData.onClick.bind(this));
        if (!this.customData.options.newTab && !core_1.Utils.onRoute(this.customData.options.url)) {
            el.addEventListener('mouseover', this.customData.onLinkEnter.bind(this));
            el.addEventListener('touchstart', this.customData.onLinkEnter.bind(this));
        }
        this.customData.checkURL.call(this, this.customData.options.url);
    },
    unbind(el) {
        el.removeEventListener('mouseover', this.customData.onLinkEnter);
        el.removeEventListener('touchstart', this.customData.onLinkEnter);
        this.customData.$el.off('click', this.customData.onClick);
        this.customData.dispatcher.off('newPageReady', this.customData.onNewPageReady);
        // console.warn('routeClassStarBinder routine', el);
    },
};
