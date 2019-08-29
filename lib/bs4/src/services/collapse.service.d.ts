/// <reference types="jquery" />
/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export declare class CollapseService {
    static DATA_KEY: string;
    static EVENT_KEY: string;
    static DATA_API_KEY: string;
    static EVENT: {
        SHOW: string;
        SHOWN: string;
        HIDE: string;
        HIDDEN: string;
        CLICK_DATA_API: string;
    };
    static CLASSNAME: {
        SHOW: string;
        COLLAPSE: string;
        COLLAPSING: string;
        COLLAPSED: string;
    };
    private $target;
    constructor($target: JQuery<HTMLElement>);
    show(): void;
    hide(): void;
    isExpanded(): boolean;
    isCollapsed(): boolean;
    toggle(): void;
}
