class EventDispatcher {
    static instances = {};
    static getNamespaces() {
        return Object.keys(this.instances);
    }
    static getInstance(namespace = "main") {
        const result = EventDispatcher.instances[namespace];
        if (!result) {
            return new this(namespace);
        }
        return result;
    }
    static getAllInstances() {
        return EventDispatcher.instances;
    }
    static clearInstance(namespace = "main") {
        const instance = EventDispatcher.instances[namespace];
        instance.events = {};
        instance.eventsOnce = {};
        return instance;
    }
    static deleteInstance(namespace = "main") {
        this.clearInstance(namespace);
        delete this.instances[namespace];
    }
    static clearAllInstances() {
        const namespaces = this.getNamespaces();
        for (const namespace of namespaces) {
            this.clearInstance(namespace);
        }
    }
    static deleteAllInstances() {
        this.clearAllInstances();
        this.instances = {};
    }
    events = {};
    eventsOnce = {};
    _namespace = "anonymous";
    get namespace() {
        return this._namespace;
    }
    constructor(namespace) {
        if (namespace) {
            if (EventDispatcher.instances[namespace]) {
                return EventDispatcher.instances[namespace];
            }
            this._namespace = namespace;
            EventDispatcher.instances[namespace] = this;
            return EventDispatcher.instances[namespace];
        }
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
        return this;
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
        return this;
    }
    off(eventName, cb, thisContext) {
        if (eventName === undefined) {
            this.events = {};
            this.eventsOnce = {};
            return this;
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
        return this;
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
        return this;
    }
}
export { EventDispatcher };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtZGlzcGF0Y2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2V2ZW50LWRpc3BhdGNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxNQUFhLGVBQWU7SUFDaEIsTUFBTSxDQUFDLFNBQVMsR0FBNkIsRUFBRSxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxhQUFhO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLE1BQU07UUFDMUMsTUFBTSxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZTtRQUMzQixPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE1BQU07UUFDNUMsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQixRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTTtRQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sTUFBTSxDQUFDLGlCQUFpQjtRQUM3QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEMsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFRUyxNQUFNLEdBQVcsRUFBRSxDQUFDO0lBQ3BCLFVBQVUsR0FBVyxFQUFFLENBQUM7SUFFeEIsVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUVuQyxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFLRCxZQUFZLFNBQWtCO1FBQzVCLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN4QyxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0M7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM1QyxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBV00sSUFBSSxDQUFDLFNBQWlCLEVBQUUsRUFBaUIsRUFBRSxXQUFpQjtRQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlELElBQUksT0FBTyxXQUFXLEtBQUssV0FBVyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM5QixFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSxFQUFFO2dCQUNULFdBQVc7YUFDWixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDckM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFXTSxFQUFFLENBQUMsU0FBaUIsRUFBRSxFQUFpQixFQUFFLFdBQWlCO1FBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEQsSUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDeEIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsV0FBVzthQUNaLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQVNNLEdBQUcsQ0FBQyxTQUFrQixFQUFFLEVBQWtCLEVBQUUsV0FBaUI7UUFDbEUsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDcEIsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUM3QixJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM1QixLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDekQsTUFBTSxRQUFRLEdBQUcsS0FBMkIsQ0FBQzt3QkFDN0MsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLFdBQVcsRUFBRTs0QkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyQztxQkFDRjtpQkFDRjtnQkFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNoQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDN0QsTUFBTSxRQUFRLEdBQUcsS0FBMkIsQ0FBQzt3QkFDN0MsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLFdBQVcsRUFBRTs0QkFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUN6QztxQkFDRjtpQkFDRjthQUNGO2lCQUFNO2dCQUNMLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQzVCLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUN6RCxNQUFNLFFBQVEsR0FBRyxLQUFzQixDQUFDO3dCQUN4QyxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUU7NEJBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDaEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQzdELE1BQU0sUUFBUSxHQUFHLEtBQXNCLENBQUM7d0JBQ3hDLElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTs0QkFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUN6QztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUU0sT0FBTyxDQUFDLFNBQWlCLEVBQUUsR0FBRyxJQUFXO1FBQzlDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMxQyxJQUFLLEtBQXdDLEVBQUUsRUFBRSxFQUFFO29CQUNoRCxLQUE0QixDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUMzQztxQkFBTTtvQkFDSixLQUF1QixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7aUJBQ25DO2FBQ0Y7U0FDRjtRQUNELElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDaEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdELElBQUssS0FBd0MsRUFBRSxFQUFFLEVBQUU7b0JBQ2hELEtBQTRCLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDekM7cUJBQU07b0JBQ0osS0FBdUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7U0ExTVUsZUFBZSJ9