/// <reference types="jquery" />
export * from './HistoryManager';
export * from './Dom';
export * from './Prefetch';
import { BaseCache } from '../Cache';
import { ITransition } from '../../interfaces';
import { Dom } from './Dom';
import { HistoryManager } from './HistoryManager';
export interface IPjaxInstances {
    [key: string]: Pjax;
}
/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {object}
 */
declare class Pjax {
    /**
     * Class name used to ignore links
     *
     * @memberOf Barba.Pjax
     * @type {string}
     * @default
     */
    static ignoreClassLink: string;
    static cache: BaseCache;
    static instances: IPjaxInstances;
    static getInstance(id: string): Pjax;
    /**
     * Determine if the link should be followed
     *
     * @memberOf Barba.Pjax
     * @param  {MouseEvent} evt
     * @param  {HTMLAnchorElement} element
     * @return {boolean}
     */
    static preventCheck(evt: JQuery.Event | Event, element?: HTMLAnchorElement, href?: string): boolean;
    /**
     * Get the .href parameter out of an element
     * and handle special cases (like xlink:href)
     *
     * @memberOf Barba.Pjax
     * @param  {HTMLAnchorElement} el
     * @return {string} href
     */
    static getHref(el: HTMLAnchorElement | SVGAElement): string | undefined;
    private static DEBUG;
    dom?: Dom;
    history: HistoryManager;
    /**
     * Indicate wether or not use the cache
     *
     * @memberOf Barba.Pjax
     * @type {boolean}
     * @default
     */
    cacheEnabled: boolean;
    /**
     * Indicate if there is an animation in progress
     *
     * @memberOf Barba.Pjax
     * @readOnly
     * @type {boolean}
     */
    transitionProgress: boolean;
    private listenAllLinks;
    private listenPopstate;
    private parseTitle;
    private dispatcher;
    private transition?;
    private $wrapper?;
    private viewId;
    /**
     * Creates an singleton instance of Pjax.
     */
    constructor(id: string, $wrapper?: JQuery<HTMLElement>, containerSelector?: string, listenAllLinks?: boolean, listenPopstate?: boolean, transition?: ITransition, parseTitle?: boolean);
    /**
     * Function to be called to start Pjax
     *
     * @memberOf Barba.Pjax
     */
    start(): void;
    /**
     * Return the currentURL cleaned
     *
     * @memberOf Barba.Pjax
     * @return {string} currentUrl
     */
    getCurrentUrl(): string;
    /**
     * Change the URL with pushstate and trigger the state change
     *
     * @memberOf Barba.Pjax
     * @param {string} newUrl
     */
    goTo(url: string, newTab?: boolean): false | void;
    /**
     * Return a transition object
     *
     * @memberOf Barba.Pjax
     * @return {Barba.Transition} Transition object
     */
    getTransition(): ITransition;
    /**
     * Load an url, will start an xhr request or load from the cache
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param  {string} url
     * @return {Promise<JQuery<HTMLElement>>}
     */
    load(url: string): Promise<JQuery<HTMLElement>>;
    /**
     * Attach the eventlisteners
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected bindEvents(listenAllLinks: boolean, listenPopstate: boolean): void;
    /**
     * Force the browser to go to a certain url
     *
     * @memberOf Barba.Pjax
     * @param {Location} url
     * @private
     */
    protected forceGoTo(url: Location | string): void;
    /**
     * Callback called from click event
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param {MouseEvent} evt
     */
    protected onLinkClick(evt: JQuery.Event | Event): void;
    /**
     * Method called after a 'popstate' or from .goTo()
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected onStateChange(): false | undefined;
    /**
     * Function called as soon the new container is ready
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param {JQuery<HTMLElement>} $container
     */
    protected onNewContainerLoaded($container: JQuery<HTMLElement>): void;
    /**
     * Function called as soon the transition is finished
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected onTransitionEnd(): void;
    /**
     * Init the events
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected init($wrapper: JQuery<HTMLElement>, listenAllLinks: boolean, listenPopstate: boolean): void;
}
export { Pjax };
