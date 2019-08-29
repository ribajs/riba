/// <reference types="jquery" />
/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
declare class Dom {
    /**
     * The name of the data attribute on the container
     *
     * @default
     */
    dataNamespace: string;
    /**
     * Class name used to identify the containers
     *
     * @default
     */
    containerSelector: string;
    /**
     * Full HTML String of the current page.
     * By default is the innerHTML of the initial loaded page.
     *
     * Each time a new page is loaded, the value is the response of the xhr call.
     *
     */
    currentHTML?: string;
    private _$wrapper;
    private parseTitle;
    private debug;
    constructor($wrapper: JQuery<Element>, containerSelector: string | undefined, parseTitle: boolean);
    /**
     * Parse the responseText obtained from the xhr call
     * @see https://stackoverflow.com/a/41038197/1465919
     */
    parseResponse(responseText: string): JQuery<Element>;
    /**
     * Get the main barba wrapper by the ID `wrapperId`
     */
    getWrapper(): JQuery<Element>;
    /**
     * Get the container on the current DOM,
     * or from an Element passed via argument
     */
    getContainer(element?: HTMLElement | HTMLTemplateElement | JQuery<HTMLElement | HTMLTemplateElement>): JQuery<Element>;
    /**
     * Get the namespace of the container
     */
    getNamespace($element: JQuery<Element>): string;
    /**
     * Put the container on the page
     */
    putContainer(element: HTMLElement | JQuery<Element>, appendChild?: 'append' | 'replace'): void;
    /**
     * Get container selector
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param element
     */
    parseContainer(newPage: HTMLTemplateElement | HTMLElement): Element;
}
export { Dom };
