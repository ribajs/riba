"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
class EventDispatcher {
    /**
     * Creates an singleton instance of Dispatcher.
     */
    constructor(namespace) {
        /**
         * Object that keeps all the events
         *
         * @readOnly
         * @type {object}
         */
        this.events = {};
        this.eventsOnce = {};
        this._namespace = "anonymous";
        if (namespace) {
            if (EventDispatcher.instances[namespace]) {
                return EventDispatcher.instances[namespace];
            }
            this._namespace = namespace;
            EventDispatcher.instances[namespace] = this;
            return EventDispatcher.instances[namespace];
        }
    }
    static getInstance(namespace = "main") {
        const result = EventDispatcher.instances[namespace];
        if (!result) {
            return new this(namespace);
        }
        return result;
    }
    get namespace() {
        return this._namespace;
    }
    /**
     * Bind a one-time callback to an event
     *
     * @param eventName
     * @param cb function to call when an event with eventName is triggered
     * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
     *
     * IMPORTANT; cb CANNOT BE arrow function if a thisContext is used, use function() {} instead
     */
    once(eventName, cb, thisContext) {
        this.eventsOnce[eventName] = this.eventsOnce[eventName] || [];
        if (typeof thisContext !== "undefined") {
            this.eventsOnce[eventName].push({
                cb: cb.bind(thisContext),
                orgCb: cb,
                thisContext,
            });
        }
        else {
            this.eventsOnce[eventName].push(cb);
        }
    }
    /**
     * Bind a callback to an event
     *
     * @param eventName
     * @param cb function to call when an event with eventName is triggered
     * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
     *
     * IMPORTANT; cb CANNOT BE arrow function if a thisContext is used, use function() {} instead
     */
    on(eventName, cb, thisContext) {
        this.events[eventName] = this.events[eventName] || [];
        if (typeof thisContext !== "undefined") {
            this.events[eventName].push({
                cb: cb.bind(thisContext),
                orgCb: cb,
                thisContext,
            });
        }
        else {
            this.events[eventName].push(cb);
        }
    }
    /**
     * Unbind event
     *
     * @param eventName optional, Name of the event; if name not supplied all event listeners for all events will be removed
     * @param cb optional, if a callback is supplied, only event listeners using the supplied callback function will be removed
     * @param thisContext optional, if a callback is supplied, only event listeners using the supplied thisContext will be removed
     */
    off(eventName, cb, thisContext) {
        if (eventName === undefined) {
            this.events = {};
            this.eventsOnce = {};
            return;
        }
        if (cb !== undefined) {
            if (thisContext !== undefined) {
                if (eventName in this.events) {
                    for (const [i, event] of this.events[eventName].entries()) {
                        const curEvent = event;
                        if (curEvent.orgCb === cb && curEvent.thisContext === thisContext) {
                            this.events[eventName].splice(i, 1);
                        }
                    }
                }
                if (eventName in this.eventsOnce) {
                    for (const [i, event] of this.eventsOnce[eventName].entries()) {
                        const curEvent = event;
                        if (curEvent.orgCb === cb && curEvent.thisContext === thisContext) {
                            this.eventsOnce[eventName].splice(i, 1);
                        }
                    }
                }
            }
            else {
                if (eventName in this.events) {
                    for (const [i, event] of this.events[eventName].entries()) {
                        const curEvent = event;
                        if (curEvent === cb) {
                            this.events[eventName].splice(i, 1);
                        }
                    }
                }
                if (eventName in this.eventsOnce) {
                    for (const [i, event] of this.eventsOnce[eventName].entries()) {
                        const curEvent = event;
                        if (curEvent === cb) {
                            this.eventsOnce[eventName].splice(i, 1);
                        }
                    }
                }
            }
        }
        else {
            this.events[eventName] = [];
            this.eventsOnce[eventName] = [];
        }
    }
    /**
     * Fire the event running all the event associated to it
     *
     * @param eventName
     * @param args
     */
    trigger(eventName, ...args) {
        if (eventName in this.events) {
            for (const event of this.events[eventName]) {
                if (event?.cb) {
                    event.cb(...args);
                }
                else {
                    event(...args);
                }
            }
        }
        if (eventName in this.eventsOnce) {
            for (const [i, event] of this.eventsOnce[eventName].entries()) {
                if (event?.cb) {
                    event.cb(...args);
                    this.eventsOnce[eventName].splice(i, 1);
                }
                else {
                    event(...args);
                    this.eventsOnce[eventName].splice(i, 1);
                }
            }
        }
    }
}
exports.EventDispatcher = EventDispatcher;
EventDispatcher.instances = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2V2ZW50LWRpc3BhdGNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQTs7OztHQUlHO0FBQ0gsTUFBYSxlQUFlO0lBMEIxQjs7T0FFRztJQUNILFlBQVksU0FBa0I7UUFsQjlCOzs7OztXQUtHO1FBQ0ssV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGVBQVUsR0FBRyxXQUFXLENBQUM7UUFVL0IsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3QztZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzVDLE9BQU8sZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFuQ00sTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsTUFBTTtRQUMxQyxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWFELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQWdCRDs7Ozs7Ozs7T0FRRztJQUNJLElBQUksQ0FBQyxTQUFpQixFQUFFLEVBQWlCLEVBQUUsV0FBaUI7UUFDakUsSUFB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