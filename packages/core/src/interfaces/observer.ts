import { Observer } from "../observer";

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
