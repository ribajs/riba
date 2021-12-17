"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
class EventDispatcher {
    constructor(namespace) {
        this.events = {};
        this.eventsOnce = {};
        this._namespace = 'anonymous';
        if (namespace) {
            if (EventDispatcher.instances[namespace]) {
                return EventDispatcher.instances[namespace];
            }
            this._namespace = namespace;
            EventDispatcher.instances[namespace] = this;
            return EventDispatcher.instances[namespace];
        }
    }
    static getInstance(namespace = 'main') {
        const result = EventDispatcher.instances[namespace];
        if (!result) {
            return new this(namespace);
        }
        return result;
    }
    get namespace() {
        return this._namespace;
    }
    once(eventName, cb, thisContext) {
        this.eventsOnce[eventName] = this.eventsOnce[eventName] || [];
        if (typeof thisContext !== 'undefined') {
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
    on(eventName, cb, thisContext) {
        this.events[eventName] = this.events[eventName] || [];
        if (typeof thisContext !== 'undefined') {
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
    trigger(eventName, ...args) {
        var _a, _b;
        if (eventName in this.events) {
            for (const event of this.events[eventName]) {
                if ((_a = event) === null || _a === void 0 ? void 0 : _a.cb) {
                    event.cb(...args);
                }
                else {
                    event(...args);
                }
            }
        }
        if (eventName in this.eventsOnce) {
            for (const [i, event] of this.eventsOnce[eventName].entries()) {
                if ((_b = event) === null || _b === void 0 ? void 0 : _b.cb) {
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
//# sourceMappingURL=event-dispatcher.service.js.map