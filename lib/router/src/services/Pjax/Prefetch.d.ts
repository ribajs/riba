/// <reference types="jquery" />
/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {object}
 */
declare class Prefetch {
    /** singleton instance */
    private static instance;
    /**
     * Class name used to ignore prefetch on links
     *
     * @memberOf Barba.Prefetch
     * @type {String}
     * @default
     */
    ignoreClassLink: string;
    private debug;
    /**
     * Creates an singleton instance of Prefetch.
     */
    constructor();
    /**
     * Init the event listener on mouseover and touchstart
     * for the prefetch
     *
     * @memberOf Barba.Prefetch
     */
    init(autobindLinks?: boolean): false | undefined;
    /**
     * Callback for the mousehover/touchstart, please use the rv-route binder instead
     *
     * @memberOf Barba.Prefetch
     * @private
     * @param  {object} evt
     */
    onLinkEnter(evt: Event | JQuery.Event, url?: string, el?: HTMLAnchorElement): void;
}
export { Prefetch };
