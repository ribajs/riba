/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 * using a [polyfill](https://github.com/webcomponents/webcomponentsjs) for browser they not support Web Components and to compile the components to ES5
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 * @see https://github.com/webcomponents/webcomponentsjs
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/webcomponents.js
 */
// import 'core-js'; // Needed for IE 11 if custom elements polifill is used https://github.com/webcomponents/webcomponentsjs/issues/968
import '@webcomponents/webcomponentsjs';

/**
 * TODO compile to es5 by wrapp to custom module
 * https://github.com/webcomponents/webcomponentsjs/issues/795
 * https://github.com/webcomponents/webcomponentsjs/#custom-elements-es5-adapterjs
 */
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

import Debug from 'debug';
import { View } from './view';
import { Tinybind, EventHandler } from './tinybind';
import { Binding } from './binding';

export type TemplateFunction = () => string | null;

export abstract class RibaComponent extends HTMLElement {

  public static tagName: string;

  protected debug: Debug.IDebugger;
  protected view?: View;

  protected abstract scope: any;

  constructor() {
    super();
    this.debug = Debug('component:unknown');

    this.debug('constructor called');

    const template = this.template();
    // if innerHTML is null this component uses the innerHTML which he already has!
    if (template !== null) {
      this.innerHTML = template;
    }
  }

  protected eventHandler(self: RibaComponent): EventHandler {
    // IMPORTANT this must be a function and not a Arrow Functions
    return function(this: EventHandler, context: Binding, ev: Event, binding: Binding, el: HTMLElement) {
      this.call(self, ev, binding.view.models, el, context);
    };
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is first connected to the document's DOM.
   */
  protected connectedCallback() {
    this.debug('connectedCallback called');
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is disconnected from the document's DOM.
   */
  protected disconnectedCallback() {
    this.debug('disconnectedCallback called');
    if (this.view) {
      this.view.unbind();
    }
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is moved to a new document.
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string) {
    this.debug('attributeChangedCallback called', attributeName, oldValue, newValue, namespace);
  }

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
   * @param oldDocument
   * @param newDocument
   */
  protected adoptedCallback(oldDocument: Document, newDocument: Document) {
    this.debug('adoptedCallback called', oldDocument, newDocument);
  }

  protected template() {
    return null;
  }

  protected bind() {
    const tinybind = new Tinybind();
    const viewOptions = tinybind.getViewOptions({
      handler: this.eventHandler(this),
    });

    this.debug('bind scope', this.scope);

    /**
     * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
     */
    this.view = new View(Array.prototype.slice.call(this.childNodes), this.scope, viewOptions);
    this.scope = this.view.models;
    this.view.bind();

    return this.view;
  }
}
