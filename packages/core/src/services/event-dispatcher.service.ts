import {
  EventDispatcherInstances,
  Events,
  EventCallback,
  BoundEventCallback,
} from "../interfaces/event-dispatcher";

/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
export class EventDispatcher {
  public static instances: EventDispatcherInstances = {};

  public static getInstance(namespace: string) {
    const result = EventDispatcher.instances[namespace];
    if (!result) {
      return new this(namespace);
    }
    return result;
  }

  /**
   * Object that keeps all the events
   *
   * @readOnly
   * @type {object}
   */
  private events: Events = {};

  private _namespace: string;

  public get namespace(): string {
    return this._namespace || "anonymous";
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
      this._namespace = namespace;
    }
  }

  /**
   * Bind a callback to an event
   *
   * @param eventName
   * @param cb function to call, if an event with eventName is triggered
   * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
   *
   * IMPORTANT; cb CANNOT BE arrow function if a thisContext is used, use function() {} instead
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
  }

  /**
   * Unbind event
   *
   * @param eventName Name of the event
   * @param cb optional, if a callback is supplied, only event listeners using the supplied callback function will be removed
   * @param thisContext optional, if a callback is supplied, only event listeners using the supplied thisContext will be removed
   */
  public off(eventName: string, cb?: EventCallback, thisContext?: any) {
    if (eventName in this.events === false) {
      return;
    }
    if (cb !== undefined) {
      for (let i = this.events[eventName].length - 1; i >= 0; i--) {
        const curEvent = this.events[eventName][i] as BoundEventCallback;
        if (curEvent.orgCb && curEvent.thisContext) {
          if (typeof thisContext !== "undefined") {
            if (curEvent.thisContext !== thisContext) {
              continue;
            }
          }
          if (curEvent.orgCb !== cb) {
            continue;
          }
          this.events[eventName].splice(i, 1);
        }
      }
    } else {
      this.events[eventName] = [];
    }
  }

  /**
   * Fire the event running all the event associated to it
   *
   * @param eventName
   * @param args
   */
  public trigger(eventName: string, ...args: any[]) {
    // e, ...args
    if (eventName in this.events === false) {
      return;
    }

    for (let i = 0; i < this.events[eventName].length; i++) {
      if ((this.events[eventName][i] as BoundEventCallback | undefined)?.cb) {
        (this.events[eventName][i] as BoundEventCallback).cb.apply(this, args);
      } else {
        (this.events[eventName][i] as EventCallback).apply(this, args);
      }
    }
  }
}
