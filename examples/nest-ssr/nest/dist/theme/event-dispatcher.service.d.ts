import type { EventCallback } from '@ribajs/core';
export declare class EventDispatcher {
    static instances: {
        [namespace: string]: EventDispatcher;
    };
    static getInstance(namespace?: string): EventDispatcher;
    private events;
    private eventsOnce;
    private _namespace;
    get namespace(): string;
    constructor(namespace?: string);
    once(eventName: string, cb: EventCallback, thisContext?: any): void;
    on(eventName: string, cb: EventCallback, thisContext?: any): void;
    off(eventName?: string, cb?: EventCallback, thisContext?: any): void;
    trigger(eventName: string, ...args: any[]): void;
}
