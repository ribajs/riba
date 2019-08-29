/// <reference types="jquery" />
import { Component, Debug } from '@ribajs/core';
import { IBarConfig, IBarWrapper, IButtonsConfig, IPaginationConfig, IButtonConfig } from '../../index';
interface IScope extends IBarConfig {
    /**
     * An object describing the buttons displayed in the top bar.
     * The object contains two keys, primary and secondary, and each of those keys contain an array of button objects.
     * Primary buttons default to blue, and have a maximum of one button.
     * Secondary buttons have a maximum of four buttons.
     */
    buttons?: IButtonsConfig;
    /**
     * The title string displayed in the header behind the application's name.
     */
    title?: string;
    /**
     * A URL to an image file used as the icon in the top bar. If omitted, a default app icon will be used.
     */
    icon?: string;
    /**
     * An object configuring and toggling the pagination arrow button group.
     */
    pagination?: IPaginationConfig;
    /**
     * A button object configuring and toggling the breadcrumb in the top bar.
     */
    breadcrumb?: IButtonConfig;
    /**
     * If true the loading bar shows a loading animation
     */
    loading?: boolean;
    /**
     * Show the fallback bar which is normally only used outside the iframe
     */
    showFallbackBar: boolean;
}
export declare class BarComponent extends Component {
    static tagName: string;
    static readonly observedAttributes: string[];
    protected bar: IBarWrapper;
    protected $el: JQuery<HTMLElement>;
    protected debug: Debug.Debugger;
    protected scope: IScope;
    constructor(element?: HTMLElement);
    protected listenForConfigChanges(): void;
    protected beforeBind(): Promise<void>;
    protected afterBind(): Promise<void>;
    protected requiredAttributes(): never[];
    protected disconnectedCallback(): void;
    protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null): void;
    protected template(): string | null;
}
export {};
