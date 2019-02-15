type EventCallback = (...args: any[]) => any;

interface IEvents {
  [eventName: string]: EventCallback[];
}

export interface IEventDispatcherInstances {
  [key: string]: EventDispatcher;
}

/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
class EventDispatcher {

  public static instances: IEventDispatcherInstances = {};

  public static getInstance(id: string) {
    const result = EventDispatcher.instances[id];
    if (!result) {
      throw new Error(`No EventDispatcher instance with id ${id} found!`);
    }
    return result;
  }

  /**
   * Object that keeps all the events
   *
   * @memberOf Barba.Dispatcher
   * @readOnly
   * @type {object}
   */
  private events: IEvents = {};

  private id: string;

  /**
   * Creates an singleton instance of Dispatcher.
   * @memberof Dispatcher
   */
  constructor(id?: string) {
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

  /**
   * Bind a callback to an event
   *
   * @memberOf Barba.Dispatcher
   * @param {string} eventName
   * @param {EventCallback} function
   */
  public on(e: string, f: EventCallback) {
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
  public off(e: string, f: EventCallback) {
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
  public trigger(e: string, ...args: any[]) { // e, ...args
    if (e in this.events === false) {
      return;
    }

    for (let i = 0; i < this.events[e].length; i++) {
      this.events[e][i].apply(this, args);
    }
  }
}

export { EventDispatcher };
