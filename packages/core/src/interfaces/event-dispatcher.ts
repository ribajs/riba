import type { EventDispatcher } from "../services/event-dispatcher.service";

export type EventCallback = (...args: any[]) => any;

export type BoundEventCallback = {
  cb: EventCallback;
  orgCb: EventCallback;
  thisConext: any;
};

export interface Events {
  [eventName: string]: (EventCallback | BoundEventCallback)[];
}

export interface EventDispatcherInstances {
  [key: string]: EventDispatcher;
}
