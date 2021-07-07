import { Component, TemplateFunction } from "@ribajs/core";
import { PodloveWebPlayerComponentScope } from "../../types";
export declare class PodloveWebPlayerComponent extends Component {
    static tagName: string;
    static loadingClass: string;
    static readyClass: string;
    static get observedAttributes(): string[];
    protected requiredAttributes(): string[];
    scope: PodloveWebPlayerComponentScope;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected setLoadingClass(loading: boolean): void;
    protected maybeLoadPolyfills(): Promise<void>;
    protected loadPlayer(): Promise<void>;
    protected beforeBind(): Promise<void>;
    protected template(): ReturnType<TemplateFunction>;
}
