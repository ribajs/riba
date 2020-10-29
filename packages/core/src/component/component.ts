/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */
import "@ribajs/types";
import { View } from "../view";
import { Riba } from "../riba";
import { BasicComponent } from "./basic-component";

export abstract class Component extends BasicComponent {
  protected view?: View;

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
        const viewOptions = this.riba.getViewOptions({
          handler: this.eventHandler(this),
          formatters: {
            call: this.callFormatterHandler(this),
            args: this.argsFormatterHandler(this),
          },
        });

        this.view = new View(
          (Array.prototype.slice.call(
            this.el.childNodes
          ) as unknown) as NodeListOf<ChildNode>,
          this.scope,
          viewOptions
        );
        this.scope = this.view.models;
        this.view.bind();
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

  protected async unbind() {
    if (this.view) {
      this.bound = false;
      this.view.unbind();
      delete this.view;
    }
  }

  protected async build() {
    if (this.view) {
      this.view.build();
    }
  }
}
