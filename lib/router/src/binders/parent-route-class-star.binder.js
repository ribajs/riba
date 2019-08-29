"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
exports.parentRouteClassStarBinder = {
    name: 'parent-route-class-*',
    bind(el) {
        this.customData = {
            dispatcher: new core_1.EventDispatcher('main'),
        };
    },
    /**
     * Tests the url with the current location, if the url is equal to the current location this element is active
     * @param el Binder HTML Element
     * @param url Url to compare with the current location
     */
    routine(el, url) {
        const $el = core_1.JQuery(el);
        const className = this.args[0].toString() || 'active';
        const isAnkerHTMLElement = $el.prop('tagName') === 'A';
        if (!url && isAnkerHTMLElement) {
            const href = $el.attr('href');
            if (href) {
                url = href;
            }
        }
        const onUrlChange = (urlToCheck) => {
            if (urlToCheck) {
                if (core_1.Utils.onParentRoute(urlToCheck)) {
                    $el.addClass(className);
                    // check if element is radio input
                    if ($el.is(':radio')) {
                        $el.prop('checked', true);
                    }
                    return true;
                }
                else {
                    $el.removeClass(className);
                    // uncheck if element is radio input
                    if ($el.is(':radio')) {
                        $el.prop('checked', false);
                    }
                }
            }
            return false;
        };
        this.customData.dispatcher.on('newPageReady', () => onUrlChange(url));
        onUrlChange(url);
    },
    unbind(el) {
        // console.warn('routeClassStarBinder routine', el);
    },
};
