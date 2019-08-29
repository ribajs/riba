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
export declare type Obj = any;
export declare type Root = any;
