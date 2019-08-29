"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
class CollapseService {
    constructor($target) {
        this.$target = $target;
    }
    show() {
        this.$target
            .removeClass(CollapseService.CLASSNAME.COLLAPSE)
            .addClass(CollapseService.CLASSNAME.SHOW)
            .trigger(CollapseService.EVENT.SHOWN);
    }
    hide() {
        this.$target
            .removeClass(CollapseService.CLASSNAME.SHOW)
            .addClass(CollapseService.CLASSNAME.COLLAPSE)
            .trigger(CollapseService.EVENT.HIDDEN);
    }
    isExpanded() {
        return this.$target.hasClass(CollapseService.CLASSNAME.SHOW);
    }
    isCollapsed() {
        return !this.isExpanded();
    }
    toggle() {
        if (this.isCollapsed()) {
            this.show();
        }
        else {
            this.hide();
        }
    }
}
exports.CollapseService = CollapseService;
CollapseService.DATA_KEY = 'bs.collapse';
CollapseService.EVENT_KEY = `.${CollapseService.DATA_KEY}`;
CollapseService.DATA_API_KEY = '.data-api';
CollapseService.EVENT = {
    SHOW: `show${CollapseService.EVENT_KEY}`,
    SHOWN: `shown${CollapseService.EVENT_KEY}`,
    HIDE: `hide${CollapseService.EVENT_KEY}`,
    HIDDEN: `hidden${CollapseService.EVENT_KEY}`,
    CLICK_DATA_API: `click${CollapseService.EVENT_KEY}${CollapseService.DATA_API_KEY}`,
};
CollapseService.CLASSNAME = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed',
};
