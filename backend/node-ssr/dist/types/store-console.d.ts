/// <reference types="node" />
import type { ConsoleConstructor } from "console";
import type { ConsoleMessage, PipeConsole } from "./types";
export declare class StoreConsole implements PipeConsole {
    Console: ConsoleConstructor;
    readonly type = "store";
    private _messages;
    get debugs(): ConsoleMessage[];
    get errors(): ConsoleMessage[];
    get infos(): ConsoleMessage[];
    get logs(): ConsoleMessage[];
    get warns(): ConsoleMessage[];
    get messages(): ConsoleMessage[];
    constructor();
    assert(): void;
    clear(): void;
    count(): void;
    countReset(): void;
    debug(message?: any, ...optionalParams: any[]): void;
    dir(): void;
    dirxml(): void;
    error(message?: any, ...optionalParams: any[]): void;
    group(): void;
    groupCollapsed(): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    table(): void;
    time(): void;
    timeEnd(): void;
    timeLog(): void;
    trace(): void;
    warn(message?: any, ...optionalParams: any[]): void;
    profile(): void;
    profileEnd(): void;
    timeStamp(): void;
}
