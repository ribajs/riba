declare type EventCallback = (...args: any[]) => any;
export interface IEventDispatcherInstances {
    [key: string]: EventDispatcher;
}
/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
declare class EventDispatcher {
    static instances: IEventDispatcherInstances;
    static getInstance(id: string): EventDispatcher;
    /**
     * Object that keeps all the events
     *
     * @memberOf Barba.Dispatcher
     * @readOnly
     * @type {object}
     */
    private events;
    private id;
    /**
     * Creates an singleton instance of Dispatcher.
     * @memberof Dispatcher
     */
    constructor(id?: string);
    /**
     * Bind a callback to an event
     *
     * @memberOf Barba.Dispatcher
     * @param {string} eventName
     * @param {EventCallback} function
     */
    on(e: string, f: EventCallback): void;
    /**
     * Unbind event
     *
     * @memberOf Barba.Dispatcher
     * @param {string} eventName
     * @param {EventCallback} function
     */
    off(e: string, f: EventCallback): void;
    /**
     * Fire the event running all the event associated to it
     *
     * @memberOf Barba.Dispatcher
     * @param  {string} eventName
     * @param  {any[]} args
     */
    trigger(e: string, ...args: any[]): void;
}
export { EventDispatcher };
