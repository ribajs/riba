import { Observer } from '../observer';

export interface IObserverSyncCallback {
  sync: () => void;
}
export interface IKey {
  path: any;
  i: Root;
}

export interface IObservers {
  [key: string]: Observer;
}

export type Obj = any;

export type Root = any;
