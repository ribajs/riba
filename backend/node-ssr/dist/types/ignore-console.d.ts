/// <reference types="node" />
import type { ConsoleConstructor } from "console";
import type { PipeConsole } from "./types";
export declare class IgnoreConsole implements PipeConsole {
    Console: ConsoleConstructor;
    readonly type = "ignore";
    constructor();
    assert(): void;
    clear(): void;
    count(): void;
    countReset(): void;
    debug(): void;
    dir(): void;
    dirxml(): void;
    error(): void;
    group(): void;
    groupCollapsed(): void;
    groupEnd(): void;
    info(): void;
    log(): void;
    table(): void;
    time(): void;
    timeEnd(): void;
    timeLog(): void;
    trace(): void;
    warn(): void;
    profile(): void;
    profileEnd(): void;
    timeStamp(): void;
}
