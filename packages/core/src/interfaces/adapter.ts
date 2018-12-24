
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
