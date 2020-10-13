import type { EventDispatcher } from "../services/event-dispatcher.service";

export type EventCallback = (...args: any[]) => any;

export type BoundEventCallback = {
  function: EventCallback;
  originalFunction: EventCallback;
  thisConext: any;
};

export interface Events {
  [eventName: string]: (EventCallback | BoundEventCallback)[];
}

export interface EventDispatcherInstances {
  [key: string]: EventDispatcher;
}
