type EventCallback = (...args: any[]) => any;

interface IEvents {
  [eventName: string]: EventCallback[];
}

/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
class GlobalEvent {
  // TODO make global dispatcher optional
  private static instance: GlobalEvent;
  /**
   * Object that keeps all the events
   *
   * @memberOf Barba.Dispatcher
   * @readOnly
   * @type {object}
   */
  private events: IEvents = {};

  /**
   * Creates an singleton instance of Dispatcher.
   * @memberof Dispatcher
   */
  constructor() {
    if (GlobalEvent.instance) {
      return GlobalEvent.instance;
    }

    GlobalEvent.instance = this;
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

export { GlobalEvent };
