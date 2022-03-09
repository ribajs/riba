import type { EventDispatcher } from "../services/event-dispatcher.service.js";
export declare type EventCallback = (...args: any[]) => any;
export declare type BoundEventCallback = {
    cb: EventCallback;
    orgCb: EventCallback;
    thisContext: any;
};
export interface Events {
    [eventName: string]: (EventCallback | BoundEventCallback)[];
}
export interface EventDispatcherInstances {
    [key: string]: EventDispatcher;
}
