import {
  EventDispatcherInstances,
  Events,
  EventCallback,
  BoundEventCallback,
} from "../types/event-dispatcher.js";

/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
export class EventDispatcher {
  protected static instances: EventDispatcherInstances = {};

  public static getNamespaces(): string[] {
    return Object.keys(this.instances);
  }

  public static getInstance(namespace = "main"): EventDispatcher {
    const result = EventDispatcher.instances[namespace];
    if (!result) {
      return new this(namespace);
    }
    return result;
  }

  public static getAllInstances(): EventDispatcherInstances {
    return EventDispatcher.instances;
  }

  public static clearInstance(namespace = "main") {
    const instance = EventDispatcher.instances[namespace];
    instance.events = {};
    instance.eventsOnce = {};
    return instance;
  }

  public static deleteInstance(namespace = "main") {
    this.clearInstance(namespace);
    delete this.instances[namespace];
  }

  public static clearAllInstances() {
    const namespaces = this.getNamespaces();
    for (const namespace of namespaces) {
      this.clearInstance(namespace);
    }
  }

  public static deleteAllInstances() {
    this.clearAllInstances();
    this.instances = {};
  }

  /**
   * Object that keeps all the events
   *
   * @readOnly
   * @type {object}
   */
  protected events: Events = {};
  protected eventsOnce: Events = {};

  protected _namespace = "anonymous";

  public get namespace(): string {
    return this._namespace;
  }

  /**
   * Creates an singleton instance of Dispatcher.
   */
  constructor(namespace?: string) {
    if (namespace) {
      if (EventDispatcher.instances[namespace]) {
        return EventDispatcher.instances[namespace];
      }
      this._namespace = namespace;
      EventDispatcher.instances[namespace] = this;
      return EventDispatcher.instances[namespace];
    }
  }

  /**
   * Bind a one-time callback to an event
   *
   * @param eventName
   * @param cb function to call when an event with eventName is triggered
   * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
   *
   * @note cb can not be arrow function if a thisContext is used, use `function() {}` instead
   */
  public once(eventName: string, cb: EventCallback, thisContext?: any) {
    this.eventsOnce[eventName] = this.eventsOnce[eventName] || [];
    if (typeof thisContext !== "undefined") {
      this.eventsOnce[eventName].push({
        cb: cb.bind(thisContext),
        orgCb: cb,
        thisContext,
      });
    } else {
      this.eventsOnce[eventName].push(cb);
    }
    return this;
  }

  /**
   * Bind a callback to an event
   *
   * @param eventName
   * @param cb function to call when an event with eventName is triggered
   * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
   *
   * @note cb can not be arrow function if a thisContext is used, use `function() {}` instead
   */
  public on(eventName: string, cb: EventCallback, thisContext?: any) {
    this.events[eventName] = this.events[eventName] || [];
    if (typeof thisContext !== "undefined") {
      this.events[eventName].push({
        cb: cb.bind(thisContext),
        orgCb: cb,
        thisContext,
      });
    } else {
      this.events[eventName].push(cb);
    }
    return this;
  }

  /**
   * Unbind event
   *
   * @param eventName optional, Name of the event; if name not supplied all event listeners for all events will be removed
   * @param cb optional, if a callback is supplied, only event listeners using the supplied callback function will be removed
   * @param thisContext optional, if a callback is supplied, only event listeners using the supplied thisContext will be removed
   */
  public off(eventName?: string, cb?: EventCallback, thisContext?: any) {
    if (eventName === undefined) {
      this.events = {};
      this.eventsOnce = {};
      return this;
    }
    if (cb !== undefined) {
      if (thisContext !== undefined) {
        if (eventName in this.events) {
          for (const [i, event] of this.events[eventName].entries()) {
            const curEvent = event as BoundEventCallback;
            if (curEvent.orgCb === cb && curEvent.thisContext === thisContext) {
              this.events[eventName].splice(i, 1);
            }
          }
        }
        if (eventName in this.eventsOnce) {
          for (const [i, event] of this.eventsOnce[eventName].entries()) {
            const curEvent = event as BoundEventCallback;
            if (curEvent.orgCb === cb && curEvent.thisContext === thisContext) {
              this.eventsOnce[eventName].splice(i, 1);
            }
          }
        }
      } else {
        if (eventName in this.events) {
          for (const [i, event] of this.events[eventName].entries()) {
            const curEvent = event as EventCallback;
            if (curEvent === cb) {
              this.events[eventName].splice(i, 1);
            }
          }
        }
        if (eventName in this.eventsOnce) {
          for (const [i, event] of this.eventsOnce[eventName].entries()) {
            const curEvent = event as EventCallback;
            if (curEvent === cb) {
              this.eventsOnce[eventName].splice(i, 1);
            }
          }
        }
      }
    } else {
      this.events[eventName] = [];
      this.eventsOnce[eventName] = [];
    }
    return this;
  }

  /**
   * Fire the event running all the event associated to it
   *
   * @param eventName
   * @param args
   */
  public trigger(eventName: string, ...args: any[]) {
    if (eventName in this.events) {
      for (const event of this.events[eventName]) {
        if ((event as BoundEventCallback | undefined)?.cb) {
          (event as BoundEventCallback).cb(...args);
        } else {
          (event as EventCallback)(...args);
        }
      }
    }
    if (eventName in this.eventsOnce) {
      for (const [i, event] of this.eventsOnce[eventName].entries()) {
        if ((event as BoundEventCallback | undefined)?.cb) {
          (event as BoundEventCallback).cb(...args);
          this.eventsOnce[eventName].splice(i, 1);
        } else {
          (event as EventCallback)(...args);
          this.eventsOnce[eventName].splice(i, 1);
        }
      }
    }
    return this;
  }
}
