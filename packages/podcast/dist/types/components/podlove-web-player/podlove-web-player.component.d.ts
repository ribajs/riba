import { Component, TemplateFunction } from "@ribajs/core";
import { PodloveWebPlayerComponentScope } from "../../types";
import { EventDispatcher } from "@ribajs/events";
export declare class PodloveWebPlayerComponent extends Component {
    static tagName: string;
    static loadingClass: string;
    static readyClass: string;
    protected routerEvents?: EventDispatcher;
    static get observedAttributes(): string[];
    protected requiredAttributes(): string[];
    scope: PodloveWebPlayerComponentScope;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected onNewPageReady(): void;
    protected setLoadingClass(loading: boolean): void;
    protected maybeLoadPolyfills(): Promise<void>;
    protected loadPlayer(): Promise<void>;
    protected beforeTemplate(): Promise<void>;
    protected beforeBind(): Promise<void>;
    protected template(): ReturnType<TemplateFunction>;
}
