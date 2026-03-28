import { ObserverSyncCallback } from "../../src/types/index.js";
import { Observer } from "../../src/observer.js";
export interface Change {
    [key: string]: Observer[];
}
export declare class Data {
    private attributes;
    private change;
    constructor(attributes: {
        [key: string]: any;
    });
    on(key: string, callback: Observer): void;
    hasCallback(key: string, callback: ObserverSyncCallback): boolean;
    off(key: string, callback: ObserverSyncCallback): void;
    set(attributes: {
        [key: string]: any;
    }): void;
    get(key: string): any;
    alertCallbacks(key: string): void;
    private indexOf;
}
