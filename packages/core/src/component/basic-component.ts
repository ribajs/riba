/**
 * Auto parse custom element attributes
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */
import "@ribajs/types";
import {
  EventHandler,
  ObservedAttributesToCheck,
  TemplateFunction,
  ObserverSyncCallback,
} from "../types";
import { Binding } from "../binding";
import { Binder } from "../binder";
import { Observer } from "../observer";
import { parseJsonString, camelCase } from "@ribajs/utils/src/type";
import { getRandomColor, consoleColoured } from "@ribajs/utils/src/color";

export abstract class BasicComponent extends HTMLElement {
  public static tagName: string;

  public _debug = false;
  public _color?: string;

  protected templateLoaded = false;

  /**
   * Used to check if all passed observedAttributes are initialized
   */
  protected observedAttributesToCheck: ObservedAttributesToCheck = {};

  protected observedAttributes: string[] = [];

  public abstract scope: any;

  constructor() {
    super();

    if (this._debug) {
      this._color = getRandomColor();
    }
  }

  /**
   * Remove this custom element
   */
  public remove() {
    if (this && this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  protected abstract template(): ReturnType<TemplateFunction>;

  protected _log(mode: "debug" | "info" | "log" | "error", ...args: unknown[]) {
    const namespace = this.constructor.name || this.tagName;
    if (!this._color) {
      this._color = getRandomColor();
    }
    consoleColoured({ namespace, color: this._color, mode }, ...args);
  }

  protected info(...args: unknown[]) {
    return this._log("info", ...args);
  }

  protected debug(...args: unknown[]) {
    if (!this._debug) {
      return;
    }

    return this._log("debug", ...args);
  }

  protected error(...args: unknown[]) {
    console.error(...args);
  }

  /**
   * returns a list of attributes which are required until the riba binding starts
   */
  protected requiredAttributes(): string[] {
    return [];
  }

  protected async init(observedAttributes: string[]) {
    this.loadAttributes(observedAttributes);
    this.getPassedObservedAttributes(observedAttributes);
    return;
  }

  protected ready() {
    return (
      this.allPassedObservedAttributesAreInitialized() &&
      this.checkRequiredAttributes()
    );
  }

  /**
   * Check if the attribute (e.g. `src`) is passed to this custom element
   * @param observedAttribute
   */
  protected attributeIsPassed(observedAttribute: string) {
    return this.hasAttribute(observedAttribute);
  }

  /**
   * Get passed observed attributes, used to check if all passed attributes are initialized
   * @param observedAttributes
   */
  protected getPassedObservedAttributes(observedAttributes: string[]) {
    const oa2c = this.observedAttributesToCheck;
    for (const observedAttribute of observedAttributes) {
      if (!oa2c[observedAttribute]) {
        oa2c[observedAttribute] = { passed: false, initialized: false };
      } else {
        if (!oa2c[observedAttribute].passed) {
          oa2c[observedAttribute].passed =
            this.attributeIsPassed(observedAttribute);
        }
      }
    }
  }

  /**
   * Checks if all passed observed attributes are initialized
   */
  protected allPassedObservedAttributesAreInitialized() {
    return Object.keys(this.observedAttributesToCheck).every(
      (key) =>
        !this.observedAttributesToCheck[key]?.passed ||
        this.observedAttributesToCheck[key]?.initialized
    );
  }

  /**
   * Required attributes before the view is bound
   *
   * The attributeChangedCallback is called for each attribute which updates the riba view each time
   * which can have a big impact on performance or required attributes are not yet available which can lead to errors.
   * So define required attributes and the view is ony bind the first time after all this attributes are transmitted.
   */
  protected checkRequiredAttributes() {
    return this.requiredAttributes().every((requiredAttribute) => {
      requiredAttribute = camelCase(requiredAttribute);
      return (
        this.scope.hasOwnProperty(requiredAttribute) &&
        typeof this.scope[requiredAttribute] !== "undefined"
      );
    });
  }

  protected parseAttribute(attr: string | null) {
    let value: any = attr;
    if (attr === "true") {
      value = true;
    } else if (attr === "false") {
      value = false;
    } else if (attr === "null") {
      value = null;
    } else if (attr === "undefined") {
      value = undefined;
    } else if (attr === "") {
      value = undefined;
    } else if (!isNaN(Number(attr))) {
      value = Number(attr);
      // If number is too large store the value as string
      if (value >= Number.MAX_SAFE_INTEGER) {
        value = attr;
      }
    } else {
      const jsonString = parseJsonString(value);
      value = jsonString ? jsonString : value;
    }
    return value;
  }

  /**
   * Returns an event handler for the bindings (most on-*) inside this component.
   */
  protected eventHandler(self: BasicComponent): EventHandler {
    // IMPORTANT this must be a function and not a Arrow Functions
    return function (
      context: Binding | Binder,
      event: Event,
      binding: Binding | Binder,
      el: HTMLElement
    ) {
      if (!this || !this.call) {
        const error = new Error(
          `[rv-${binding.type}="${binding.keypath}"] Event handler "${binding.keypath}" not found!"`
        );
        console.error(binding, el);
        throw error;
      }

      this.call(self, event, binding.view.models, el);
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
    // if (this.bound && this.view) {
    //   // IMPORTANT ROUTE FIXME, if we unbind the component then it will no longer work if it is retrieved from the cache and the connectedCallback is called
    //   // because the riba attributes are removed. We need a solution for that, maybe we do not remove the attributes or we recreate the attributes
    //   // See view bind / unbind methods for that.
    //   // only unbind if cache is not enabled?
    //   this.unbind();
    // }
  }

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    // this.debug("attributeChangedCallback", attributeName, newValue);
    if (
      this.observedAttributesToCheck &&
      this.observedAttributesToCheck[attributeName]
    ) {
      this.observedAttributesToCheck[attributeName].initialized = true;
    }

    newValue = this.parseAttribute(newValue);

    const parsedAttributeName = camelCase(attributeName);

    if (this.scope && this.scope[parsedAttributeName]) {
      oldValue = this.scope[parsedAttributeName];
    }

    // automatically inject observed attributes to view scope
    this.scope[parsedAttributeName] = newValue;

    // call custom attribute changed callback with parsed values
    this.parsedAttributeChangedCallback(
      parsedAttributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  /**
   * Similar to attributeChangedCallback but attribute arguments are already parsed as they are stored in the scope
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    this.debug(
      "parsedAttributeChangedCallback called",
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
   * @param oldDocument
   * @param newDocument
   */
  protected adoptedCallback(oldDocument: Document, newDocument: Document) {
    this.debug("adoptedCallback called", oldDocument, newDocument);
  }

  protected async loadTemplate(): Promise<HTMLElement | string | null> {
    if (this.templateLoaded === true) {
      // this.debug("template already loaded");
      return null;
    }

    if (!this.checkRequiredAttributes()) {
      this.debug("Not all required attributes are set to load the template");
      return null;
    }

    this.templateLoaded = true;

    // if innerHTML is null this component uses the innerHTML which he already has!
    return Promise.resolve(this.template())
      .then((template) => {
        if (template instanceof HTMLElement) {
          this.innerHTML = "";
          this.appendChild(template as HTMLElement);
        } else if (template !== null) {
          this.innerHTML = template as string;
        }

        return template;
      })
      .catch((error) => {
        console.error(error);
        this.templateLoaded = false;
        return null;
      });
  }

  protected async beforeTemplate(): Promise<any> {
    // this.debug('beforeTemplate');
  }

  protected async afterTemplate(
    template: HTMLElement | string | null
  ): Promise<any> {
    this.debug("afterTemplate", template);
  }

  protected async onReady(): Promise<any> {
    // this.debug('onReady', this.bound);
  }

  /**
   * Observes a object keypath in the scope
   * @param keypath
   * @param callback
   */
  public observe(keypath: string, callback: ObserverSyncCallback): Observer {
    return new Observer(this.scope, keypath, callback);
  }

  /**
   * Observes a attributeName
   * @param attributeName
   * @param callback
   */
  public observeAttribute(
    attributeName: string,
    callback: ObserverSyncCallback
  ): Observer {
    const parsedAttributeName = camelCase(attributeName);
    return this.observe(parsedAttributeName, callback);
  }

  /**
   * Directly set a attribute value in the scope.
   * This method is meant to be called from the outside, e.g. from a binder or another component.
   * @note This method is used in the componentAttributeBinder
   * @param attributeName
   * @param newValue
   * @param namespace
   */
  public setBinderAttribute(
    attributeName: string,
    newValue: any,
    namespace: string | null = null
  ) {
    const parsedAttributeName = camelCase(attributeName);
    const oldValue = this.scope[parsedAttributeName];
    this.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  /**
   * Directly get a attribute value from the scope.
   * This method is meant to be called from the outside, e.g. from a binder or another component.
   * @note This method is used in the componentAttributeBinder
   * @param attributeName
   * @returns
   */
  public getBinderAttribute(attributeName: string) {
    const parsedAttributeName = camelCase(attributeName);
    const value = this.scope[parsedAttributeName];
    return value;
  }

  /**
   * Load all attributes and calls the attributeChangedCallback for each attribute.
   * Please note: Normally the browser calls the attributeChangedCallback for you
   */
  protected loadAttributes(observedAttributes: string[]) {
    const attributes = this.attributes;
    for (const i in attributes) {
      const attribute: Node = attributes[i];
      const name = attribute.nodeName;
      if (observedAttributes.indexOf(name) !== -1) {
        const newValue = attribute.nodeValue;
        this.attributeChangedCallback(name, undefined, newValue, null);
      }
    }
  }
}
