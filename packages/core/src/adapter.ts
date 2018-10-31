/**
 * The default `.` adapter that comes with riba.js. Allows subscribing to
 * properties on plain objects, implemented in ES5 natives using
 * `Object.defineProperty`.
 */

import { IObserverSyncCallback } from './observer';

export interface IRef {
  callbacks: any[];
  pointers: any[];
}

/**
 * TODO For what is this?
 */
export interface IRVArray extends Array<any> {
  __rv: any;
}

export type AdapterFunction = (...args: any[]) => any;

export interface IAdapter {
  counter: number;
  weakmap: any;
  weakReference: (obj: any) => any; // => __rv ?
  cleanupWeakReference: (ref: IRef, id: number) => void;
  stubFunction: (obj: any, fn: string) => any; // => response ?
  observeMutations: (obj: any, ref: string, keypath: string) => void;
  unobserveMutations: (obj: IRVArray, ref: string, keypath: string) => void;
  observe: (obj: any, keypath: string, callback: IObserverSyncCallback) => void;
  unobserve: (obj: any, keypath: string, callback: IObserverSyncCallback) => void;
  get: (obj: any, keypath: string) => any;
  set: (obj: any, keypath: string, value: any) => void;
}

export interface IAdapters {
  [name: string]: IAdapter;
}

export class Adapter implements IAdapter {

  public static ARRAY_METHODS = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice',
  ];

  public counter: number = 0;
  public weakmap: any = {};

  public weakReference(obj: any) {
    if (!obj.hasOwnProperty('__rv')) {
      const id = this.counter++;

      Object.defineProperty(obj, '__rv', {
        value: id,
      });
    }

    if (!this.weakmap[obj.__rv]) {
      this.weakmap[obj.__rv] = {
        callbacks: {},
      };
    }

    return this.weakmap[obj.__rv];
  }

  public cleanupWeakReference(ref: IRef, id: number) {
    if (!Object.keys(ref.callbacks).length) {
      if (!(ref.pointers && Object.keys(ref.pointers).length)) {
        delete this.weakmap[id];
      }
    }
  }

  public stubFunction(obj: any, fn: string) {
    const original = obj[fn];
    const map = this.weakReference(obj);
    const weakmap = this.weakmap;

    obj[fn] = (...args: any[]): AdapterFunction => {
      const response = original.apply(obj, args);

      Object.keys(map.pointers).forEach((r) => {
        const k = map.pointers[r];

        if (weakmap[r]) {
          if (weakmap[r].callbacks[k] instanceof Array) {
            weakmap[r].callbacks[k].forEach((callback: IObserverSyncCallback) => {
              callback.sync();
            });
          }
        }
      });

      return response;
    };
  }

  public observeMutations(obj: any, ref: string, keypath: string) {
    if (obj instanceof Array) {
      const map = this.weakReference(obj);

      if (!map.pointers) {
        map.pointers = {};

        Adapter.ARRAY_METHODS.forEach((fn) => {
          this.stubFunction(obj, fn);
        });
      }

      if (!map.pointers[ref]) {
        map.pointers[ref] = [];
      }

      if (map.pointers[ref].indexOf(keypath) === -1) {
        map.pointers[ref].push(keypath);
      }
    }
  }

  public unobserveMutations(obj: IRVArray, ref: string, keypath: string) {
    if ((obj instanceof Array) && (obj.__rv != null)) {
      const map = this.weakmap[obj.__rv];

      if (map) {
        const pointers = map.pointers[ref];

        if (pointers) {
          const idx = pointers.indexOf(keypath);

          if (idx > -1) {
            pointers.splice(idx, 1);
          }

          if (!pointers.length) {
            delete map.pointers[ref];
          }

          this.cleanupWeakReference(map, obj.__rv);
        }
      }
    }
  }

  public observe(obj: any, keypath: string, callback: IObserverSyncCallback) {
    let value: any;
    const callbacks = this.weakReference(obj).callbacks;

    if (!callbacks[keypath]) {
      callbacks[keypath] = [];
      const desc = Object.getOwnPropertyDescriptor(obj, keypath);

      if (!desc || !(desc.get || desc.set || !desc.configurable)) {
        value = obj[keypath];

        Object.defineProperty(obj, keypath, {
          enumerable: true,

          get: () => {
            return value;
          },

          set: (newValue) => {
            if (newValue !== value) {
              this.unobserveMutations(value, obj.__rv, keypath);
              value = newValue;
              const map = this.weakmap[obj.__rv];

              if (map) {
                const _callbacks = map.callbacks[keypath];

                if (_callbacks) {
                  _callbacks.forEach((cb: IObserverSyncCallback) => {
                    cb.sync();
                  });
                }

                this.observeMutations(newValue, obj.__rv, keypath);
              }
            }
          },
        });
      }
    }

    if (callbacks[keypath].indexOf(callback) === -1) {
      callbacks[keypath].push(callback);
    }

    this.observeMutations(obj[keypath], obj.__rv, keypath);
  }

  public unobserve(obj: any, keypath: string, callback: IObserverSyncCallback) {
    const map = this.weakmap[obj.__rv];

    if (map) {
      const callbacks = map.callbacks[keypath];

      if (callbacks) {
        const idx = callbacks.indexOf(callback);

        if (idx > -1) {
          callbacks.splice(idx, 1);

          if (!callbacks.length) {
            delete map.callbacks[keypath];
            this.unobserveMutations(obj[keypath], obj.__rv, keypath);
          }
        }

        this.cleanupWeakReference(map, obj.__rv);
      }
    }
  }

  public get(obj: any, keypath: string) {
    return obj[keypath];
  }

  public set(obj: any, keypath: string, value: any) {
    obj[keypath] = value;
  }
}

const adapter = new Adapter();
export { adapter };
