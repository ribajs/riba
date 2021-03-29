/**
 * Auto parse custom element attributes
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */
import "@ribajs/types";
import { EventHandler, ObservedAttributesToCheck } from "../interfaces";
import { Binding } from "../binding";
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

  /**
   * @deprecated Use `this` instead
   */
  protected el: HTMLElement;

  protected abstract scope: any;

  constructor() {
    super();

    if (this._debug) {
      this._color = getRandomColor();
    }
    this.el = this; // revert
    this.onParentChanged = this.onParentChanged.bind(this);
    this.onRibaAttributeChanged = this.onRibaAttributeChanged.bind(this);
  }

  /**
   * Remove this custom element
   */
  public remove() {
    if (this && this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  protected abstract template():
    | HTMLElement
    | string
    | null
    | Promise<HTMLElement | string | null>;

  protected _log(mode: "debug" | "info" | "log" | "error", ...args: unknown[]) {
    const namespace = this.constructor.name || this.tagName;
    if (this._color) {
      this._color = getRandomColor();
    }
    consoleColoured({ namespace, color: this._color, mode }, args);
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
    this.initRibaAttributeObserver(observedAttributes);
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
          oa2c[observedAttribute].passed = this.attributeIsPassed(
            observedAttribute
          );
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
    return this.requiredAttributes().every(
      (requiredAttribute) =>
        this.scope.hasOwnProperty(requiredAttribute) &&
        typeof this.scope[requiredAttribute] !== "undefined"
    );
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
      context: Binding,
      event: Event,
      binding: Binding,
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

    this.removeEventListenerForRibaParent();
    this.removeEventListenersForRibaAttributes(this.observedAttributes);
  }

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected attributeChangedCallback(
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

    if (oldValue !== newValue) {
      this.notifyRibaAttributeChanged(
        attributeName,
        oldValue,
        newValue,
        namespace
      );
    }

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
   * This is for the rv-co-attribute binder
   * TODO only notify attributes which are passed as rv-co-*="*"
   * @param attrName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected notifyRibaAttributeChanged(
    attrName: string,
    oldValue: any,
    newValue: any,
    namespace: any
  ) {
    this.dispatchEvent(
      new CustomEvent("notify-attribute-change:" + attrName, {
        detail: {
          name: attrName,
          oldValue,
          newValue,
          namespace,
        },
      })
    );
  }

  protected askForRibaParent() {
    this.dispatchEvent(new CustomEvent("ask-for-parent"));
  }

  protected askForRibaAttribute(attrName: string) {
    //TODO Fix if co-* has different keypath as attribute name
    const eventName = "ask-for-attribute:" + attrName;
    // this.debug("Trigger " + eventName);
    this.dispatchEvent(new CustomEvent(eventName));
  }

  protected askForRibaAttributes(observedAttributes: string[]) {
    for (const observedAttribute of observedAttributes) {
      this.askForRibaAttribute(observedAttribute);
    }
  }

  protected onParentChanged(event: CustomEvent) {
    // this.debug("onParentChanged", event.detail);
    this.scope.$parent = event.detail;
  }

  protected onRibaAttributeChanged(event: CustomEvent) {
    const data = (event as CustomEvent).detail;
    this.debug("onRibaAttributeChanged", data);
    const oldValue = this.scope[data.name];
    this.attributeChangedCallback(
      data.name,
      oldValue,
      data.newValue,
      data.namespace
    );
  }

  protected listenForRibaParent() {
    this.addEventListener("parent" as any, this.onParentChanged);
  }

  protected removeEventListenerForRibaParent() {
    this.removeEventListener("parent" as any, this.onParentChanged);
  }

  protected listenForRibaAttribute(attrName: string) {
    const eventName = "attribute:" + attrName;
    this.debug("Listen for " + eventName);
    this.addEventListener(eventName as any, this.onRibaAttributeChanged);
  }

  protected removeEventListenerForRibaAttribute(attrName: string) {
    this.removeEventListener(
      ("attribute:" + attrName) as any,
      this.onRibaAttributeChanged
    );
  }

  /**
   * This is for the co-attribute-binder
   * TODO only watch for attributes passed as rv-co-* and not all
   * @param observedAttributes
   */
  protected listenForRibaAttributes(observedAttributes: string[]) {
    for (const observedAttribute of observedAttributes) {
      this.listenForRibaAttribute(observedAttribute);
    }
  }

  protected removeEventListenersForRibaAttributes(
    observedAttributes: string[]
  ) {
    for (const observedAttribute of observedAttributes) {
      this.removeEventListenerForRibaAttribute(observedAttribute);
    }
  }

  protected initRibaAttributeObserver(observedAttributes: string[]) {
    this.listenForRibaParent();
    this.listenForRibaAttributes(observedAttributes);
    this.askForRibaParent();
    this.askForRibaAttributes(observedAttributes);
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
