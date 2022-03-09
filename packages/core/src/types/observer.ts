import { Observer } from "../observer.js";

export interface ObserverSyncCallback {
  sync: () => void;
}
export interface Key {
  path: any;
  i: Root;
}

export interface Observers {
  [key: string]: Observer;
}

export type Root = any;
export type Obj = any;
