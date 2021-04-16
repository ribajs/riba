/**
 * The default `.` adapter that comes with riba.js. Allows subscribing to
 * properties on plain objects, implemented in ES5 natives using
 * `Object.defineProperty`.
 */

import { ObserverSyncCallback } from "./observer";

export interface Ref {
  callbacks: any[];
  pointers: any[];
}

/**
 * TODO For what is this?
 */
export interface RVArray extends Array<any> {
  __rv: any;
}

export type AdapterFunction = (...args: any[]) => any;

export abstract class Adapter {
  public abstract name: string;
  public abstract counter?: number;
  public abstract weakmap?: any;
  public abstract weakReference?: (obj: any) => any; // => __rv ?
  public abstract cleanupWeakReference?: (ref: Ref, id: number) => void;
  public abstract stubFunction?: (obj: any, fn: string) => any; // => response ?
  public abstract observeMutations?: (
    obj: any,
    ref: string,
    keypath: string
  ) => void;
  public abstract unobserveMutations?: (
    obj: RVArray,
    ref: string,
    keypath: string
  ) => void;
  public abstract observe: (
    obj: any,
    keypath: string,
    callback: ObserverSyncCallback
  ) => void;
  public abstract unobserve: (
    obj: any,
    keypath: string,
    callback: ObserverSyncCallback
  ) => void;
  public abstract get: (obj: any, keypath: string) => any;
  public abstract set: (obj: any, keypath: string, value: any) => void;
}
