/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */

import { EventHandler, Formatter } from '../interfaces';
import { View } from '../view';
import { Riba } from '../riba';
import { Binding } from '../binding';
import { Utils } from '../services/utils';
import { FakeHTMLElement } from './fake-html-element';

export type TemplateFunction = () => Promise<string | null> | string | null;

export interface RibaComponentContext {
  fallback: boolean;
  view: View;
}

export interface ObservedAttributeToCheck {
  initialized: boolean;
  passed: boolean;
}

export interface ObservedAttributesToCheck {
  [key: string]: ObservedAttributeToCheck;
}

export abstract class Component extends FakeHTMLElement {

  public static tagName: string;

  /**
   * Context of this component, used for debugging
   */
  public context?: RibaComponentContext;

  protected view?: View;

  protected templateLoaded: boolean = false;

  /**
   * Used to check if all passed observedAttributes are initialized
   */
  protected observedAttributesToCheck: ObservedAttributesToCheck = {};

  protected riba?: Riba;

  protected el: HTMLUnknownElement;

  protected abstract scope: any;

  public get bound() {
    return !!this.view;
  }

  /**
   * If true the component will automatically bind the component to riba if all required attributes are setted
   */
  protected autobind: boolean = true;

  private attributeObserverFallback?: MutationObserver;

  constructor(element?: HTMLUnknownElement, context?: RibaComponentContext) {
    super(element);
    this.context = context;

    if (element) {
      this.el = element;
    } else if (window.customElements) {
      this.el = this as unknown as HTMLElement;
    } else {
      throw new Error(`element is required on browsers without custom elements support`);
    }
  }

  /**
   * Remove this custom element
   */
  public remove() {
    if (this.el && this.el.parentElement) {
      this.el.parentElement.removeChild(this.el);
      if (!(window as any).customElements) {
        this.disconnectedFallbackCallback();
      }
    }
  }

  public disconnectedFallbackCallback() {
    this.disconnectedCallback();
  }

  protected abstract template(): Promise<string | null> | string | null;

  /**
   * returns a list of attributes wich are required until the riba binding starts
   */
  protected requiredAttributes(): string[] {
    return [];
  }

  protected async init(observedAttributes: string[]) {

    this.initAttributeObserver(observedAttributes);

    this.getPassedObservedAttributes(observedAttributes);

    return this.bindIfReady();
  }

  /**
   * If `autobind` is true this component will bind riba automatically in this component if all all passed observed and required attributes are initialized
   */
  protected async bindIfReady() {
    /**
     * After all required and passed attributes are set we load the template and bind the component
     */
    if (this.allPassedObservedAttributesAreInitialized() && this.checkRequiredAttributes()) {
      return this.loadTemplate()
      .then((template) => {
        if (this.autobind) {
          return this.bind();
        }
        return null;
      });
    }
    // console.warn('Not all required and passed attributes are set to load and bind the template', this.observedAttributesToCheck);
    return null;
  }

  /**
   * Check if the attribute (e.g. `src`) is passed to this custom element also checks if the attribute was passed with riba (e.g. `rv-src`)
   * @param observedAttribute
   */
  protected attributeIsPassed(observedAttribute: string) {
    // TODO this.riba is not defined on this time, so the TODO is get the fullPrefix from riba
    const fullPrefix = this.riba ? this.riba.fullPrefix : 'rv-';
    return this.el.getAttribute(observedAttribute) !== null || this.el.getAttribute(fullPrefix + observedAttribute) !== null;
  }

  /**
   * Get passed observed attributes, used to check if all passed attributes are initialized
   * @param observedAttributes
   */
  protected getPassedObservedAttributes(observedAttributes: string[]) {
    for (const observedAttribute of observedAttributes) {
      const passed = this.attributeIsPassed(observedAttribute);
      this.observedAttributesToCheck[observedAttribute] = {
        passed,
        initialized: false,
      };
    }
  }

  /**
   * Checks if all passed observed attributes are initialized
   */
  protected allPassedObservedAttributesAreInitialized() {
    let allInitialized = true;
    for (const key in this.observedAttributesToCheck) {
      if (this.observedAttributesToCheck.hasOwnProperty(key)) {
        if (this.observedAttributesToCheck[key].passed) {
          allInitialized = allInitialized && this.observedAttributesToCheck[key].initialized;
        }
      }
    }
    return allInitialized;
  }

  /**
   * Required attributes before the view is bound
   *
   * The attributeChangedCallback is called for each attribute wich updates the riba view each time
   * which can have a big impact on performance or required attributes are not yet available which can lead to errors.
   * So define required attriutes and the view is ony bind the first time after all this attributes are transmitted.
   */
  protected checkRequiredAttributes() {
    let allDefined = true;
    const requiredAttributes = this.requiredAttributes();
    requiredAttributes.forEach((requiredAttribute: string) => {
      if (!this.scope.hasOwnProperty(requiredAttribute) || !this.scope[requiredAttribute] ) {
        // console.warn(`Attribute ${requiredAttribute} not set: ${this.scope[requiredAttribute]}`);
        allDefined = false;
      } else {
        // console.warn(`Attribute ${requiredAttribute} is defined: ${this.scope[requiredAttribute]}`);
      }
    });
    return allDefined;
  }

  protected parseAttribute(attr: string | null) {
    let value: any = attr;
    if (attr === 'true') {
      value = true;
    } else if (attr === 'false') {
      value = false;
    } else if (attr === 'null') {
      value = null;
    } else if (attr === 'undefined') {
      value = undefined;
    } else if (attr === '') {
      value = undefined;
    } else if (!isNaN(Number(attr))) {
      value = Number(attr);
      // If number is too large store the value as string
      if (value >= Number.MAX_SAFE_INTEGER) {
        value = attr;
      }
    } else {
      const jsonString = Utils.parseJsonString(value);
      value = jsonString ? jsonString : value;
    }
    return value;
  }

  /**
   * Event handler to liste for publish binder event for two-way-binding in web components
   */
  protected publish(name: string, newValue: any, namespace: string | null) {
    this.el.dispatchEvent(new CustomEvent('publish-binder-change:' + name, { detail: {
      name,
      newValue,
      namespace: null, // TODO
    }}));
  }

  /**
   * Returns an event handler for the bindings (most on-*) insite this component.
   */
  protected eventHandler(self: Component): EventHandler {
    // IMPORTANT this must be a function and not a Arrow Functions
    return function(this: EventHandler, context: Binding, event: Event, binding: Binding, el: HTMLElement) {
      this.call(self, context, event, binding.view.models, el);
    };
  }

  /**
   * Extra call formatter to avoid the "this" context problem
   */
  protected callFormatterHandler(self: this): any {
    return {
      name: 'call',
      read: (fn: (...args: any[]) => any, ...args: any[]) => {
        return fn.apply(self, args);
      },
    };
  }

  /**
   * Extra args formatter to avoid the "this" context problem
   *
   * Sets arguments to a function without directly call them
   * @param fn The function you wish to call
   * @param args the parameters you wish to call the function with
   */
  protected argsFormatterHandler(self: this): Formatter {
    return {
      name: 'args',
      read: (fn: (...args: any[]) => any, ...fnArgs: any[]) => {
        return (event: Event, scope: any, el: HTMLElement, binding: any) => {
          // append the event handler args to passed args
          fnArgs.push(event);
          fnArgs.push(scope);
          fnArgs.push(el);
          fnArgs.push(binding);
          return fn.apply(self, fnArgs);
        };
      },
    };
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is first connected to the document's DOM.
   */
  protected connectedCallback() {
    // console.warn('connectedCallback called');
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is disconnected from the document's DOM.
   */
  protected disconnectedCallback() {
    if (this.view) {
      this.view.unbind();
    }

    if (this.attributeObserverFallback) {
      this.attributeObserverFallback.disconnect();
    }

    this.el.removeEventListener('binder-changed', this.BinderChangedEventHandler);
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is moved to a new document.
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {

    if (this.observedAttributesToCheck && this.observedAttributesToCheck[attributeName]) {
      this.observedAttributesToCheck[attributeName].initialized = true;
    }

    newValue = this.parseAttribute(newValue);

    const parsedAttributeName = Utils.camelCase(attributeName);

    if (this.scope && this.scope[parsedAttributeName]) {
      oldValue = this.scope[parsedAttributeName];
    }

    // automatically inject observed attributes to view scope
    this.scope[parsedAttributeName] = newValue;

    // call custom attribute changed callback with parsed values
    this.parsedAttributeChangedCallback(parsedAttributeName, oldValue, newValue, namespace);

    this.bindIfReady();
  }

  /**
   * Similar to attributeChangedCallback but attribute arguments are already parsed as they are stored in the scope
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected parsedAttributeChangedCallback(attributeNames: string | string[], oldValue: any, newValue: any, namespace: string | null) {
    // console.warn('parsedAttributeChangedCallback called', attributeNames, oldValue, newValue, namespace);
  }

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
   * @param oldDocument
   * @param newDocument
   */
  protected adoptedCallback(oldDocument: Document, newDocument: Document) {
    // console.warn('adoptedCallback called', oldDocument, newDocument);
  }

  protected async loadTemplate() {
    if (this.templateLoaded) {
      console.warn('template already loaded');
      return null;
    }

    if (!this.checkRequiredAttributes()) {
      // console.warn('not all required attributes are set to load the template');
      return null;
    }

    // if innerHTML is null this component uses the innerHTML which he already has!
    return Promise.resolve(this.template())
    .then((template) => {
      if (template !== null) {
        this.el.innerHTML = template;
      }
      return template;
    })
    .then((template) => {
      this.templateLoaded = true;
      return template;
    })
    .catch((error) => {
      console.error(error);
      this.templateLoaded = false;
      return error;
    });
  }

  protected async bind() {
    if (this.bound) {
      console.warn('component already bounded');
      return;
    }

    if (!this.checkRequiredAttributes()) {
      // console.warn('not all required attributes are set for bind');
      return;
    }

    await this.beforeBind()
    .then(() => {
      if (!this.el) {
        throw new Error('this.el is not defined');
      }

      this.riba = new Riba();
      const viewOptions = this.riba.getViewOptions({
        handler: this.eventHandler(this),
        formatters: {
          call: this.callFormatterHandler(this),
          args: this.argsFormatterHandler(this),
        },
      });

      this.view = new View(Array.prototype.slice.call(this.el.childNodes) as unknown as NodeListOf<ChildNode>, this.scope, viewOptions);
      this.scope = this.view.models;
      this.view.bind();
      return this.view;
    })
    .then((view) => {
      return this.afterBind();
    })
    .catch((error) => {
      console.error(error);
    });

    return this.view;
  }

  protected async unbind() {
    if (this.view) {
      this.view.unbind();
      delete this.view;
    }
  }

  protected async build() {
    if (this.view) {
      this.view.build();
    }
  }

  protected async beforeBind(): Promise<any> {
    // console.warn('beforeBind', this.bound);
  }

  protected async afterBind(): Promise<any> {
    // console.warn('afterBind', this.bound);
  }

  private BinderChangedEventHandler(event: Event) {
    const data = ( event as CustomEvent ).detail;
    this.attributeChangedCallback(data.name, data.oldValue, data.oldValue, data.namespace);
  }

  /**
   * Event handler to listen attribute change event as fallback for MutationObserver
   */
  private initAttributeObserver(observedAttributes: string[]) {

    if ((window as any).customElements) {
      // use native implementaion
    } else {
      if ((window as any).MutationObserver) {
        // use MutationObserver as fallback
        this.attributeObserverFallback = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
              if (mutation.attributeName) {
                // if this attribute is a watched attribute
                if (observedAttributes.indexOf(mutation.attributeName) !== -1) {
                  const newValue = this.el.getAttribute(mutation.attributeName);
                  this.attributeChangedCallback(mutation.attributeName, mutation.oldValue, newValue, mutation.attributeNamespace);
                }
              }
            }
          });
        });
        this.attributeObserverFallback.observe(this.el, {
          attributes: true,
        });
      } else {
        // use attribute change event as fallback for MutationObserver
        this.el.addEventListener('binder-changed', this.BinderChangedEventHandler);
        // this.$el.on('binder-changed', this.BinderChangedEventHandler);
      }

      // call attributeChangedCallback for all already setted static attributes
      const attributes = this.el.attributes;
      for (const i in attributes) {
        if (attributes.hasOwnProperty(i)) {
          const attribute: Node = attributes[i];
          const name = attribute.nodeName;
          if (observedAttributes.indexOf(name) !== -1) {
            const newValue = attribute.nodeValue;
            this.attributeChangedCallback(name, null, newValue, null);
          }
        }
      }
    }
  }
}
