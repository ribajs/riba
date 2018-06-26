import { ICallback } from './observer';

// The default `.` adapter that comes with tinybind.js. Allows subscribing to
// properties on plain objects, implemented in ES5 natives using
// `Object.defineProperty`.

const ARRAY_METHODS = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice'
];

export interface IRef {
  callbacks: any[];
  pointers: any[];
}

// TODO what the hell?!
export interface IRVArray extends Array<any> {
  __rv: any;
}

export type AdapterFunction = (...args: any[]) => any;

export interface IAdapter {
  counter: number;
  weakmap: any;
  weakReference: (obj: any) => any; // => __rv ?
  cleanupWeakReference: (ref: IRef, id: number) => void;
  stubFunction: (obj: any, fn: string) => any // => response ?
  observeMutations: (obj: any, ref: string, keypath: string) => void;
  unobserveMutations: (obj: IRVArray, ref: string, keypath: string) => void;
  observe: (obj: any, keypath: string, callback: ICallback) => void; 
  unobserve: (obj: any, keypath: string, callback: ICallback) => void;
  get: (obj: any, keypath: string) => any;
  set: (obj: any, keypath: string, value: any) => void;
}

export interface IAdapters {
  [name: string]: IAdapter;
}

export class Adapter implements IAdapter {
  counter: number = 0;
  weakmap:any = {};

  weakReference(obj: any) {
    if (!obj.hasOwnProperty('__rv')) {
      let id = this.counter++;

      Object.defineProperty(obj, '__rv', {
        value: id
      });
    }

    if (!this.weakmap[obj.__rv]) {
      this.weakmap[obj.__rv] = {
        callbacks: {}
      };
    }

    return this.weakmap[obj.__rv];
  }

  cleanupWeakReference(ref: IRef, id: number) {
    if (!Object.keys(ref.callbacks).length) {
      if (!(ref.pointers && Object.keys(ref.pointers).length)) {
        delete this.weakmap[id];
      }
    }
  }

  stubFunction(obj: any, fn: string) {
    let original = obj[fn];
    let map = this.weakReference(obj);
    let weakmap = this.weakmap;

    obj[fn] = (...args: any[]): AdapterFunction => {
      let response = original.apply(obj, args);

      Object.keys(map.pointers).forEach(r => {
        let k = map.pointers[r];

        if (weakmap[r]) {
          if (weakmap[r].callbacks[k] instanceof Array) {
            weakmap[r].callbacks[k].forEach((callback: ICallback) => {
              callback.sync();
            });
          }
        }
      });

      return response;
    };
  }

  observeMutations(obj: any, ref: string, keypath: string) {
    if (obj instanceof Array) {
      let map = this.weakReference(obj);

      if (!map.pointers) {
        map.pointers = {};

        ARRAY_METHODS.forEach(fn => {
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

  unobserveMutations(obj: IRVArray, ref: string, keypath: string) {
    if ((obj instanceof Array) && (obj.__rv != null)) {
      let map = this.weakmap[obj.__rv];

      if (map) {
        let pointers = map.pointers[ref];

        if (pointers) {
          let idx = pointers.indexOf(keypath);

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

  observe(obj: any, keypath: string, callback: ICallback) {
    var value: any;
    let callbacks = this.weakReference(obj).callbacks;

    if (!callbacks[keypath]) {
      callbacks[keypath] = [];
      let desc = Object.getOwnPropertyDescriptor(obj, keypath);

      if (!desc || !(desc.get || desc.set || !desc.configurable)) {
        value = obj[keypath];

        Object.defineProperty(obj, keypath, {
          enumerable: true,

          get: () => {
            return value;
          },

          set: newValue => {
            if (newValue !== value) {
              this.unobserveMutations(value, obj.__rv, keypath);
              value = newValue;
              let map = this.weakmap[obj.__rv];

              if (map) {
                let callbacks = map.callbacks[keypath];

                if (callbacks) {
                  callbacks.forEach((cb: ICallback) => {
                    cb.sync();
                  });
                }

                this.observeMutations(newValue, obj.__rv, keypath);
              }
            }
          }
        });
      }
    }

    if (callbacks[keypath].indexOf(callback) === -1) {
      callbacks[keypath].push(callback);
    }

    this.observeMutations(obj[keypath], obj.__rv, keypath);
  }

  unobserve(obj: any, keypath: string, callback: ICallback) {
    let map = this.weakmap[obj.__rv];

    if (map) {
      let callbacks = map.callbacks[keypath];

      if (callbacks) {
        let idx = callbacks.indexOf(callback);

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

  get(obj: any, keypath: string) {
    return obj[keypath];
  }

  set(obj: any, keypath: string, value: any) {
    obj[keypath] = value;
  }
};

const adapter = new Adapter();

export default adapter;
