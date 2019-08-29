import { IBinder, IViewOptions, IBindableElement } from './interfaces';
import { Binding } from './binding';
import { Debug } from './vendors/debug.module';
import { Component } from './components';
export declare type TBlock = boolean;
/**
 * TODO Check if there is an official interface which fits better here
 */
export interface IDataElement extends HTMLUnknownElement {
    data?: string;
}
/**
 * A collection of bindings built from a set of parent nodes.
 */
export declare class View {
    static debug: Debug.Debugger;
    static DECLARATION_SPLIT: RegExp;
    /**
     * Binder for mustache style `{model.property}` text Binders
     */
    static mustacheTextBinder: IBinder<string>;
    static bindingComparator: (a: Binding, b: Binding) => number;
    /**
     * Helper function to Create a new view insite of a binding
     * @param bindin
     * @param models
     * @param anchorEl
     */
    static create(binding: Binding, models: any, anchorEl: HTMLElement | Node | null): View;
    els: HTMLCollection | HTMLElement[] | Node[];
    models: any;
    options: IViewOptions;
    bindings: Array<Binding>;
    webComponents: Array<Component>;
    /**
     * The DOM elements and the model objects for binding are passed into the
     * constructor along with any local options that should be used throughout the
     * context of the view and it's bindings.
     * @param els
     * @param models
     * @param options
     */
    constructor(els: HTMLCollection | HTMLElement | Node | NodeListOf<ChildNode> | HTMLUnknownElement[], models: any, options: IViewOptions);
    buildBinding(node: HTMLUnknownElement, type: string | null, declaration: string, binder: IBinder<any>, identifier: string | null): void;
    /**
     * Parses the DOM tree and builds `Binding` instances for every matched
     * binding declaration.
     */
    build(): void;
    traverse(node: IBindableElement): TBlock;
    /**
     * Binds all of the current bindings for this view.
     */
    bind(): void;
    /**
     * Unbinds all of the current bindings for this view.
     */
    unbind(): void;
    /**
     * Syncs up the view with the model by running the routines on all bindings.
     */
    sync(): void;
    /**
     * Publishes the input values from the view back to the model (reverse sync).
     */
    publish(): void;
    /**
     * Updates the view's models along with any affected bindings.
     * @param models
     */
    update(models?: any): void;
}
