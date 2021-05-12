export class EventDispatcher {
    constructor(namespace) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2V2ZW50LWRpc3BhdGNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxNQUFNLE9BQU8sZUFBZTtJQTZCMUIsWUFBWSxTQUFrQjtRQVp0QixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZUFBVSxHQUFHLFdBQVcsQ0FBQztRQVUvQixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDeEMsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDNUMsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQW5DTSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxNQUFNO1FBQzFDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBYUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBeUJNLElBQUksQ0FBQyxTQUFpQixFQUFFLEVBQWlCLEVBQUUsV0FBaUI7UUFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNB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