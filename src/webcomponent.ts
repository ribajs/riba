/* tslint:disable: max-classes-per-file */
/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */

import Debug from 'debug';
import { View } from './view';
import { Tinybind, EventHandler } from './tinybind';
import { Binding } from './binding';

class FakeHTMLElement /*implements HTMLElement*/ {
  constructor(element?: HTMLElement) {
    if (window.customElements) {
      return Reflect.construct(HTMLElement, [], this.constructor);
    }
  }
}

if (window.customElements) {
  FakeHTMLElement.prototype = Object.create(HTMLElement.prototype, {
    constructor: {value: HTMLElement, configurable: true, writable: true},
  });
  Object.setPrototypeOf(FakeHTMLElement, HTMLElement);
}

export type TemplateFunction = () => string | null;

export abstract class RibaComponent extends FakeHTMLElement {

  public static tagName: string;

  protected debug: Debug.IDebugger;
  protected view?: View;

  protected el: HTMLElement;

  protected abstract scope: any;

  constructor(element?: HTMLElement) {
    super(element);
    this.debug = Debug('component:unknown');
    this.debug('constructor called', element, this);

    if (element) {
      this.el = element;
    } else if (window.customElements) {
      this.el = ((this as any) as HTMLElement);
    } else {
      throw new Error(`element is required on browsers without custom elements support`);
    }

    const template = this.template();
    // if innerHTML is null this component uses the innerHTML which he already has!
    if (template !== null) {
      this.el.innerHTML = template;
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

  protected template(): string | null {
    return null;
  }

  protected bind() {
    const tinybind = new Tinybind();
    const viewOptions = tinybind.getViewOptions({
      handler: this.eventHandler(this),
    });

    // this.debug('bind scope', this.scope);
    if (!this.el) {
      throw new Error('this.el is not defined');
    }

    this.view = new View(Array.prototype.slice.call(this.el.childNodes), this.scope, viewOptions);
    this.scope = this.view.models;
    this.view.bind();

    return this.view;
  }
}

export declare class RibaComponentClass extends RibaComponent implements RibaComponentClass {
  public static tagName: string;

  protected debug: Debug.IDebugger;
  protected view?: View;

  protected el: HTMLElement;

  protected scope: any;
  constructor(element?: HTMLElement);

  protected eventHandler(self: RibaComponent): EventHandler;

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
  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string): void;

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
   * @param oldDocument
   * @param newDocument
   */
  protected adoptedCallback(oldDocument: Document, newDocument: Document): void;

  protected template(): string | null;

  protected bind(): View;
}
