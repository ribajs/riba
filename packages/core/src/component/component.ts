/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */
import { View } from "../view";
import { Riba } from "../riba";
import { BasicComponent } from "./basic-component";
import { Formatter } from "../interfaces";
import { EventDispatcher } from "@ribajs/events";
import type { ComponentLifecycleEventData } from "../interfaces";

export abstract class Component extends BasicComponent {
  protected view: View | null = null;
  protected riba?: Riba;
  /** true when binding is in progress */
  protected _binds = false;
  /** true when binding is done */
  protected _bound = false;
  /** true when component is connected to the dom */
  protected _connected = false;
  /** true when component is disconnected from the dom */
  protected _disconnected = false;
  protected lifecycleEvents = EventDispatcher.getInstance("lifecycle");

  /** true when binding is in progress */
  public get binds() {
    return this._binds;
  }

  /** true when binding is done */
  public get bound() {
    return this._bound;
  }

  /** true when component is connected to the dom */
  public get connected() {
    return this._connected;
  }

  /** true when component is disconnected from the dom */
  public get disconnected() {
    return this._disconnected;
  }

  /**
   * If true the component will automatically bind the component to riba if all required attributes are set.
   */
  protected autobind = true;

  constructor() {
    super();
    this.lifecycleEvents.trigger(
      "Component:constructor",
      this.getLifecycleEventData()
    );
  }

  protected async init(observedAttributes: string[]) {
    await super.init(observedAttributes);
    this.lifecycleEvents.trigger(
      "Component:init",
      this.getLifecycleEventData()
    );
    return this.bindIfReady();
  }

  /**
   * If `autobind` is true this component will bind riba automatically in this component if all all passed observed and required attributes are initialized
   */
  protected async bindIfReady() {
    /**
     * After all required and passed attributes are set we load the template and bind the component
     */
    if (this.ready()) {
      await this.beforeTemplate();
      const template = await this.loadTemplate();
      await this.afterTemplate(template);
      if (this.autobind) {
        await this.bind();
      }
      await this.onReady();
      return;
    }
    this.debug(
      `Not all required or passed attributes are set to load and bind the template`,
      this.observedAttributesToCheck,
      this.scope
    );
    return;
  }

  /** Only internal used */
  private async _beforeBind(): Promise<any> {
    this._binds = true;
    this.debug("Start to bind Riba");
    this.lifecycleEvents.trigger(
      "Component:beforeBind",
      this.getLifecycleEventData()
    );
  }

  /** Used to handle stuff before binding starts */
  protected async beforeBind(): Promise<any> {
    // this.debug("beforeBind", this.scope);
  }

  /** Only internal used */
  private async _afterBind(): Promise<any> {
    this._binds = false;
    this._bound = true;
    this.lifecycleEvents.trigger(
      "Component:afterBind",
      this.getLifecycleEventData()
    );
  }

  /** Used to handle stuff after binding is done */
  protected async afterBind(): Promise<any> {
    // this.debug("afterBind", this.scope);
  }

  protected getLifecycleEventData() {
    const data: ComponentLifecycleEventData = {
      tagName: this.tagName.toLowerCase(),
      // scope: this.scope,
      component: this,
      // id: this.id,
    };
    return data;
  }

  /**
   * Event handler to listen for publish binder event for two-way-binding in web components
   */
  // protected publish(name: string, newValue: any, namespace: string | null) {
  //   this.dispatchEvent(
  //     new CustomEvent("publish-binder-change:" + name, {
  //       detail: {
  //         name,
  //         newValue,
  //         namespace: null, // TODO
  //       },
  //     })
  //   );
  // }

  /**
   * Default custom Element method
   * Invoked when the custom element is disconnected from the document's DOM.
   */
  protected disconnectedCallback() {
    this._disconnected = true;
    this._connected = false;
    super.disconnectedCallback();
    // IMPORTANT ROUTE FIXME, if we unbind the component then it will no longer work if it is retrieved from the cache and the connectedCallback is called
    // because the riba attributes are removed. We need a solution for that, maybe we do not remove the attributes or we recreate the attributes
    // See view bind / unbind methods for that.
    // only unbind if cache is not enabled?
    // if (this._binds && this.view) {
    //   this.unbind();
    // }
    this.lifecycleEvents.trigger(
      "Component:disconnected",
      this.getLifecycleEventData()
    );
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is first connected to the document's DOM.
   */
  protected connectedCallback() {
    this._disconnected = false;
    this._connected = true;
    super.connectedCallback();
    this.lifecycleEvents.trigger(
      "Component:connected",
      this.getLifecycleEventData()
    );
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
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );

    this.bindIfReady();
  }

  /**
   * Extra call formatter to avoid the "this" context problem
   */
  protected callFormatterHandler(self: this): any {
    return {
      name: "call",
      read: (fn: (...args: any[]) => any, ...args: any[]) => {
        if (!fn) {
          console.error(
            `[${self.el.tagName}] Can not use "call" formatter: fn is undefined! Arguments: `,
            args
          );
          throw new Error("TypeError: fn is undefined");
        }
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
      name: "args",
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

  protected async bind() {
    if (this.binds || this.bound) {
      // this.debug("component already bound");
      return this.view;
    }

    if (!this.checkRequiredAttributes()) {
      this.debug("Not all required attributes are set for bind");
      return;
    }

    try {
      await this._beforeBind();
      await this.beforeBind();

      this.riba = new Riba();
      this.view = this.getView();
      if (this.view) {
        this.scope = this.view.models;
        this.view.bind();
      }

      await this._afterBind();
      await this.afterBind();
    } catch (error) {
      this._binds = false;
      this._bound = false;
      console.error(error);
    }

    return this.view;
  }

  protected getView() {
    //   | HTMLUnknownElement[] //   | NodeListOf<ChildNode> //   | Node //   | HTMLElement //   | HTMLCollection // elements?:
    const viewOptions = this.riba?.getViewOptions({
      handler: this.eventHandler(this),
      formatters: {
        call: this.callFormatterHandler(this),
        args: this.argsFormatterHandler(this),
      },
    });

    if (viewOptions) {
      const view = new View(
        Array.prototype.slice.call(this.childNodes),
        this.scope,
        viewOptions
      );
      return view;
    }
    return null;
  }

  protected async unbind() {
    if (this.view) {
      this._binds = false;
      this.view.unbind();
      this.view = null;
    }
  }

  protected async build() {
    if (this.view) {
      this.view.build();
    }
  }
}
