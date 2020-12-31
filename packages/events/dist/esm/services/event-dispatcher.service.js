/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
export class EventDispatcher {
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
EventDispatcher.instances = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2V2ZW50LWRpc3BhdGNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUEwQjFCOztPQUVHO0lBQ0gsWUFBWSxTQUFrQjtRQWxCOUI7Ozs7O1dBS0c7UUFDSyxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZUFBVSxHQUFHLFdBQVcsQ0FBQztRQVUvQixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDeEMsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDNUMsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQW5DTSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxNQUFNO1FBQzFDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBYUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBZ0JEOzs7Ozs7OztPQVFHO0lBQ0ksSUFBSSxDQUFDLFNBQWlCLEVBQUUsRUFBaUIsRUFBRSxXQUFpQjtRQUNqRSxJ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