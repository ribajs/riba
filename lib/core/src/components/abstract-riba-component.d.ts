/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */
import { IDebugger } from '../vendors';
import { EventHandler } from '../interfaces';
import { View } from '../view';
import { Riba } from '../riba';
import { FakeHTMLElement } from './fake-html-element';
export declare type TemplateFunction = () => Promise<string | null> | string | null;
export interface IRibaComponentContext {
    fallback: boolean;
    view: View;
}
export declare abstract class Component extends FakeHTMLElement {
    static tagName: string;
    /**
     * Context of this component, used for debugging
     */
    context?: IRibaComponentContext;
    protected debug: IDebugger;
    protected view?: View;
    protected templateLoaded: boolean;
    protected riba?: Riba;
    protected el: HTMLUnknownElement;
    protected abstract scope: any;
    readonly bound: boolean;
    /**
     * If true the component will automatically bind the component to riba if all required attributes are setted
     */
    protected autobind: boolean;
    private attributeObserverFallback?;
    constructor(element?: HTMLUnknownElement, context?: IRibaComponentContext);
    /**
     * Remove this custom element
     */
    remove(): void;
    disconnectedFallbackCallback(): void;
    protected abstract template(): Promise<string | null> | string | null;
    /**
     * returns a list of attributes wich are required until the riba binding starts
     */
    protected requiredAttributes(): string[];
    protected init(observedAttributes: string[]): Promise<View | null | undefined>;
    /**
     * Required attributes before the view is bound
     *
     * The attributeChangedCallback is called for each attribute wich updates the riba view each time
     * which can have a big impact on performance or required attributes are not yet available which can lead to errors.
     * So define required attriutes and the view is ony bind the first time after all this attributes are transmitted.
     */
    protected checkRequiredAttributes(): boolean;
    protected parseAttribute(attr: string | null): any;
    /**
     * Event handler to liste for publish binder event for two-way-binding in web components
     */
    protected publish(name: string, newValue: any, namespace: string | null): void;
    /**
     * Returns an event handler for the bindings (most on-*) insite this component.
     */
    protected eventHandler(self: Component): EventHandler;
    /**
     * Extra call formatter to avoid the "this" context problem
     */
    protected callFormatterHandler(self: this): any;
    /**
     * Extra args formatter to avoid the "this" context problem
     *
     * Sets arguments to a function without directly call them
     * @param fn The function you wish to call
     * @param args the parameters you wish to call the function with
     */
    protected argsFormatterHandler(self: this): any;
    /**
     * Default custom Element method
     * Invoked when the custom element is first connected to the document's DOM.
     */
    protected connectedCallback(): void;
    /**
     * Default custom Element method
     * Invoked when the custom element is disconnected from the document's DOM.
     */
    protected disconnectedCallback(): void;
    /**
     * Default custom Element method
     * Invoked when the custom element is moved to a new document.
     * @param attributeName
     * @param oldValue
     * @param newValue
     * @param namespace
     */
    protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null): void;
    /**
     * Similar to attributeChangedCallback but attribute arguments are already parsed as they are stored in the scope
     * @param attributeName
     * @param oldValue
     * @param newValue
     * @param namespace
     */
    protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null): void;
    /**
     * Default custom Element method
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
     * @param oldDocument
     * @param newDocument
     */
    protected adoptedCallback(oldDocument: Document, newDocument: Document): void;
    protected loadTemplate(): Promise<any>;
    protected bind(): Promise<View | undefined>;
    protected unbind(): Promise<void>;
    protected build(): Promise<void>;
    protected beforeBind(): Promise<any>;
    protected afterBind(): Promise<any>;
    private BinderChangedEventHandler;
    /**
     * Event handler to listen attribute change event as fallback for MutationObserver
     */
    private initAttributeObserver;
}
