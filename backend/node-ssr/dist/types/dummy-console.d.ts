export declare class DummyConsole implements Console {
    memory: any;
    exception: any;
    Console: any;
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
