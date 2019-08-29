"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/scrollspy/
 */
exports.scrollspyStarBinder = {
    name: 'bs4-scrollspy-*',
    routine(el, targetSelector) {
        const $el = core_1.JQuery(el);
        const nativeIDTargetSelector = targetSelector.replace('#', '');
        // const dispatcher = new EventDispatcher('main');
        let target = document.getElementById(nativeIDTargetSelector);
        let $target = null;
        if (target) {
            $target = core_1.JQuery(target);
        }
        const className = this.args[0];
        /**
         * Determine if an element is in the viewport
         * @param elem The element
         * @return Returns true if element is in the viewport
         */
        const isInViewport = (elem) => {
            if (!elem) {
                return false;
            }
            const distance = elem.getBoundingClientRect();
            return (distance.top + distance.height >= 0 && distance.bottom - distance.height <= 0);
        };
        const onScroll = () => {
            // reget element each scroll because it could be removed from the page using the router
            target = document.getElementById(nativeIDTargetSelector);
            if (target) {
                $target = core_1.JQuery(nativeIDTargetSelector);
            }
            else {
                return;
            }
            if (isInViewport(target)) {
                $el.addClass(className);
                if ($el.is(':radio')) {
                    $el.prop('checked', true);
                }
            }
            else {
                $el.removeClass(className);
                if ($el.is(':radio')) {
                    $el.prop('checked', false);
                }
            }
        };
        core_1.JQuery(window).off('scroll', onScroll).on('scroll', onScroll);
        onScroll();
    },
};
