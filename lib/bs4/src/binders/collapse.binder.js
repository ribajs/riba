"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const collapse_service_1 = require("../services/collapse.service");
/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 */
exports.collapseBinder = {
    name: 'bs4-collapse',
    routine(el, targetSelector) {
        const $el = core_1.JQuery(el);
        const $target = core_1.JQuery(targetSelector);
        const collapseService = new collapse_service_1.CollapseService($target);
        const onStateChange = () => {
            if (collapseService.isCollapsed()) {
                $el
                    .addClass(collapse_service_1.CollapseService.CLASSNAME.COLLAPSED)
                    .attr('aria-expanded', 'false');
            }
            else {
                $el
                    .removeClass(collapse_service_1.CollapseService.CLASSNAME.COLLAPSED)
                    .attr('aria-expanded', 'true');
            }
        };
        $target.on(collapse_service_1.CollapseService.EVENT.SHOWN, onStateChange);
        $target.on(collapse_service_1.CollapseService.EVENT.HIDDEN, onStateChange);
        $el.on('click', (event) => {
            event.preventDefault();
            collapseService.toggle();
        });
        onStateChange();
    },
};
