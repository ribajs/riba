"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
class Dom {
    constructor($wrapper, containerSelector = '[data-namespace]', parseTitle) {
        /**
         * The name of the data attribute on the container
         *
         * @default
         */
        this.dataNamespace = 'namespace';
        this.debug = core_1.Debug('router:Dom');
        this._$wrapper = $wrapper;
        this.containerSelector = containerSelector;
        this.parseTitle = parseTitle;
    }
    /**
     * Parse the responseText obtained from the xhr call
     * @see https://stackoverflow.com/a/41038197/1465919
     */
    parseResponse(responseText) {
        this.currentHTML = responseText;
        const wrapper = document.createElement('template');
        wrapper.innerHTML = responseText;
        const titleEl = wrapper.querySelector('title');
        if (titleEl && titleEl.textContent) {
            document.title = titleEl.textContent;
        }
        return this.getContainer(wrapper);
        // this.currentHTML = responseText;
        // const $newPage = JQuery( responseText );
        // if (this.parseTitle === true) {
        //   const $title = $newPage.filter('title');
        //   if ($title.length) {
        //     document.title = $title.text();
        //   }
        // }
        // return this.getContainer($newPage);
    }
    /**
     * Get the main barba wrapper by the ID `wrapperId`
     */
    getWrapper() {
        return this._$wrapper;
    }
    /**
     * Get the container on the current DOM,
     * or from an Element passed via argument
     */
    getContainer(element) {
        if (!element) {
            throw new Error('Barba.js: [getContainer] No element to get container from!');
        }
        let el;
        if (element.jquery) {
            el = element[0];
        }
        else {
            el = element;
        }
        if (!el) {
            throw new Error('Barba.js: [getContainer] DOM not ready!');
        }
        const container = this.parseContainer(el);
        if (!container) {
            throw new Error('[DOM] No container found');
        }
        return core_1.JQuery(container);
        // if (!$newPage) {
        //   $newPage = JQuery(document.body);
        // }
        // if (!$newPage) {
        //   throw new Error('[DOM] DOM not ready!');
        // }
        // const $container = this.parseContainer($newPage[0] as Element);
        // if (!$container) {
        //   throw new Error('[DOM] No container found');
        // }
        // this.debug('getContainer', $container);
        // return $container;
    }
    /**
     * Get the namespace of the container
     */
    getNamespace($element) {
        if ($element && $element.data()) {
            return $element.data('namespace');
        }
        else {
            throw new Error('[DOM] Missing data-namespace attribute');
        }
    }
    /**
     * Put the container on the page
     */
    putContainer(element, appendChild = 'replace') {
        this.debug('putContainer', element);
        if (element.jquery) {
            element = element;
            element.css('visibility', 'hidden');
            const wrapper = this.getWrapper()[0];
            for (const el of element) {
                wrapper.appendChild(el);
            }
        }
        else {
            element = element;
            element.style.visibility = 'hidden';
            const wrapper = this.getWrapper()[0];
            wrapper.appendChild(element);
        }
    }
    /**
     * Get container selector
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param element
     */
    parseContainer(newPage) {
        if (!newPage) {
            throw new Error(`No container with selector "${this.containerSelector}" found!`);
        }
        let result;
        if (newPage.content) {
            result = newPage.content.querySelector(this.containerSelector);
        }
        else {
            result = newPage.querySelector(this.containerSelector);
        }
        if (!result) {
            throw new Error(`No container with selector "${this.containerSelector}" found! ${newPage.tagName}`);
        }
        return result;
        // const $container = $newPage.find(this.containerSelector);
        // if (!$container.length) {
        //   this.debug(`No container with selector "${this.containerSelector}" found!`, $newPage);
        //   throw new Error(`No container with selector "${this.containerSelector}" found!`);
        // }
        // return $container;
    }
}
exports.Dom = Dom;
