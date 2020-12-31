/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */
import { View } from "../view";
import { Riba } from "../riba";
import { BasicComponent } from "./basic-component";
import { Formatter } from "../interfaces";

export abstract class Component extends BasicComponent {
  protected view: View | null = null;

  protected riba?: Riba;

  protected bound = false;

  /**
   * If true the component will automatically bind the component to riba if all required attributes are set.
   */
  protected autobind = true;

  constructor(element?: HTMLUnknownElement) {
    super(element);
  }

  protected async init(observedAttributes: string[]) {
    await super.init(observedAttributes);
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

  protected async beforeBind(): Promise<any> {
    this.debug("beforeBind", this.scope);
  }

  protected async afterBind(): Promise<any> {
    this.debug("afterBind", this.scope);
  }

  /**
   * Event handler to liste for publish binder event for two-way-binding in web components
   */
  // protected publish(name: string, newValue: any, namespace: string | null) {
  //   this.el.dispatchEvent(
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
    // IMPORTANT ROUTE FIXME, if we unbind the component then it will no longer work if it is retrieved from the cache and the connectedCallback is called
    // because the riba attributes are removed. We need a solution for that, maybe we do not remove the attributes or we recreate the attributes
    // See view bind / unbind methods for that.
    // only unbind if cache is not enabled?
    // if (this.bound && this.view) {
    //   this.unbind();
    // }
    super.disconnectedCallback();
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
    if (this.bound === true) {
      // this.debug("component already bound");
      return this.view;
    }

    if (!this.checkRequiredAttributes()) {
      this.debug("Not all required attributes are set for bind");
      return;
    }

    this.bound = true;

    await this.beforeBind()
      .then(() => {
        if (!this.el) {
          throw new Error("this.el is not defined");
        }
        this.debug("Start to bind Riba");
        this.riba = new Riba();
        this.view = this.getView();
        if (this.view) {
          this.scope = this.view.models;
          this.view.bind();
        }
        return this.view;
      })
      .then(() => {
        return this.afterBind();
      })
      .catch((error) => {
        this.bound = false;
        console.error(error);
      });

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
      this.bound = false;
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
