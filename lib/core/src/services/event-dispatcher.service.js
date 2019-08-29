"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
class EventDispatcher {
    /**
     * Creates an singleton instance of Dispatcher.
     * @memberof Dispatcher
     */
    constructor(id) {
        /**
         * Object that keeps all the events
         *
         * @memberOf Barba.Dispatcher
         * @readOnly
         * @type {object}
         */
        this.events = {};
        if (!id) {
            id = 'main';
        }
        this.id = id;
        if (EventDispatcher.instances[this.id]) {
            return EventDispatcher.instances[this.id];
        }
        EventDispatcher.instances[this.id] = this;
        return EventDispatcher.instances[this.id];
    }
    static getInstance(id) {
        const result = EventDispatcher.instances[id];
        if (!result) {
            throw new Error(`No EventDispatcher instance with id ${id} found!`);
        }
        return result;
    }
    /**
     * Bind a callback to an event
     *
     * @memberOf Barba.Dispatcher
     * @param {string} eventName
     * @param {EventCallback} function
     */
    on(e, f) {
        this.events[e] = this.events[e] || [];
        this.events[e].push(f);
    }
    /**
     * Unbind event
     *
     * @memberOf Barba.Dispatcher
     * @param {string} eventName
     * @param {EventCallback} function
     */
    off(e, f) {
        if (e in this.events === false) {
            return;
        }
        this.events[e].splice(this.events[e].indexOf(f), 1);
    }
    /**
     * Fire the event running all the event associated to it
     *
     * @memberOf Barba.Dispatcher
     * @param  {string} eventName
     * @param  {any[]} args
     */
    trigger(e, ...args) {
        if (e in this.events === false) {
            return;
        }
        for (let i = 0; i < this.events[e].length; i++) {
            this.events[e][i].apply(this, args);
        }
    }
}
exports.EventDispatcher = EventDispatcher;
EventDispatcher.instances = {};
