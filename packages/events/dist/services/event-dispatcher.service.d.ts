import { EventDispatcherInstances, EventCallback } from "../types/event-dispatcher";
/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
export declare class EventDispatcher {
    static instances: EventDispatcherInstances;
    static getInstance(namespace?: string): EventDispatcher;
    /**
     * Object that keeps all the events
     *
     * @readOnly
     * @type {object}
     */
    private events;
    private eventsOnce;
    private _namespace;
    get namespace(): string;
    /**
     * Creates an singleton instance of Dispatcher.
     */
    constructor(namespace?: string);
    /**
     * Bind a one-time callback to an event
     *
     * @param eventName
     * @param cb function to call when an event with eventName is triggered
     * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
     *
     * IMPORTANT; cb CANNOT BE arrow function if a thisContext is used, use function() {} instead
     */
    once(eventName: string, cb: EventCallback, thisContext?: any): void;
    /**
     * Bind a callback to an event
     *
     * @param eventName
     * @param cb function to call when an event with eventName is triggered
     * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
     *
     * IMPORTANT; cb CANNOT BE arrow function if a thisContext is used, use function() {} instead
     */
    on(eventName: string, cb: EventCallback, thisContext?: any): void;
    /**
     * Unbind event
     *
     * @param eventName optional, Name of the event; if name not supplied all event listeners for all events will be removed
     * @param cb optional, if a callback is supplied, only event listeners using the supplied callback function will be removed
     * @param thisContext optional, if a callback is supplied, only event listeners using the supplied thisContext will be removed
     */
    off(eventName?: string, cb?: EventCallback, thisContext?: any): void;
    /**
     * Fire the event running all the event associated to it
     *
     * @param eventName
     * @param args
     */
    trigger(eventName: string, ...args: any[]): void;
}
