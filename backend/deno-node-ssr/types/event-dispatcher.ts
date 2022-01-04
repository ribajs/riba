// deno-lint-ignore-file no-explicit-any
// See https://github.com/ribajs/riba/blob/master/packages/events/src/services/event-dispatcher.service.ts

export type EventCallback = (...args: any[]) => any;

export type BoundEventCallback = {
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

export declare class EventDispatcher {
  protected static instances: EventDispatcherInstances;
  static getNamespaces(): string[];
  static getInstance(namespace?: string): EventDispatcher;
  static getAllInstances(): EventDispatcherInstances;
  static clearInstance(namespace?: string): EventDispatcher;
  static deleteInstance(namespace?: string): void;
  static clearAllInstances(): void;
  static deleteAllInstances(): void;
  protected events: Events;
  protected eventsOnce: Events;
  protected _namespace: string;
  get namespace(): string;
  constructor(namespace?: string);
  once(eventName: string, cb: EventCallback, thisContext?: any): void;
  on(eventName: string, cb: EventCallback, thisContext?: any): void;
  off(eventName?: string, cb?: EventCallback, thisContext?: any): void;
  trigger(eventName: string, ...args: any[]): void;
}
