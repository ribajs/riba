/// <reference types="jquery" />
import { Prefetch } from '../services';
import { Binding, IBinder, EventDispatcher } from '@ribajs/core';
export interface IRouteOptions {
    url: string;
    viewId: string;
    removeAfterActivation: boolean;
    newTab: boolean;
}
export interface ICustomData {
    prefetch: Prefetch;
    dispatcher?: EventDispatcher;
    options: IRouteOptions;
    $el?: JQuery<HTMLUnknownElement>;
    checkURL(this: Binding, urlToCheck?: string): boolean;
    onClick(this: Binding, event: JQuery.Event): void;
    onNewPageReady(this: Binding): void;
    onLinkEnter(this: Binding, event: Event): void;
}
/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export declare const routeBinder: IBinder<string>;
