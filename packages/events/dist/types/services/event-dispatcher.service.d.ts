import { EventDispatcherInstances, Events, EventCallback } from "../types/event-dispatcher.js";
export declare class EventDispatcher {
    protected static instances: EventDispatcherInstances;
    static getNamespaces(): string[];
    static getInstance(namespace?: string): EventDispatcher;
    static getAllInstances(): EventDispatcherInstances;
    static clearInstance(namespace?: string): EventDispatcher;
    static deleteInstance(namespace?: string): void;
    static clearAllInstances(): void;
    static deleteAllInstances(): void;
    protected events: Events;
    protected eventsOnce: Events;
    protected _namespace: string;
    get namespace(): string;
    constructor(namespace?: string);
    once(eventName: string, cb: EventCallback, thisContext?: any): this;
    on(eventName: string, cb: EventCallback, thisContext?: any): this;
    off(eventName?: string, cb?: EventCallback, thisContext?: any): this;
    trigger(eventName: string, ...args: any[]): this;
}
