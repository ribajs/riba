import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import type { PodloveWebPlayerComponentScope, PodloveWebPlayerStore, PodloveWebPlayerStoreAction } from "../../types/index.js";
export declare class PodloveWebPlayerComponent extends Component {
    static tagName: string;
    protected _template: string;
    static get observedAttributes(): string[];
    protected requiredAttributes(): string[];
    store?: PodloveWebPlayerStore;
    scope: PodloveWebPlayerComponentScope;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected setLoadingClass(loading: boolean): void;
    protected maybeLoadPolyfills(): Promise<void>;
    protected setId(): void;
    protected loadConfig(): Promise<void>;
    protected initConfig(): Promise<void>;
    protected loadPlayer(): Promise<void>;
    protected onPlay(action: PodloveWebPlayerStoreAction): void;
    protected beforeBind(): Promise<void>;
    protected afterBind(): Promise<void>;
    protected template(): ReturnType<TemplateFunction>;
}
