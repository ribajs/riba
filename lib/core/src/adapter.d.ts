import { IAdapter, IRef, IObserverSyncCallback, IRVArray } from './interfaces';
export declare class Adapter implements IAdapter {
    static ARRAY_METHODS: string[];
    counter: number;
    weakmap: any;
    weakReference(obj: any): any;
    cleanupWeakReference(ref: IRef, id: number): void;
    stubFunction(obj: any, fn: string): void;
    observeMutations(obj: any, ref: string, keypath: string): void;
    unobserveMutations(obj: IRVArray, ref: string, keypath: string): void;
    observe(obj: any, keypath: string, callback: IObserverSyncCallback): void;
    unobserve(obj: any, keypath: string, callback: IObserverSyncCallback): void;
    get(obj: any, keypath: string): any;
    set(obj: any, keypath: string, value: any): void;
}
declare const adapter: Adapter;
export { adapter };
