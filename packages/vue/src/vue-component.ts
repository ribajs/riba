import {
  createApp,
  App,
  Component,
  WritableComputedOptions,
  ComponentPublicInstance,
} from "vue";
import { BasicComponent } from "@ribajs/core/src/index.js";

export abstract class VueComponent extends BasicComponent {
  protected vue?: App;

  protected vueVm?: ComponentPublicInstance;

  protected bound = false;

  /**
   * If true the component will automatically bind the component to riba if all required attributes are set.
   */
  protected autobind = true;

  protected abstract methods: any;

  constructor() {
    super();
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

  protected beforeMount() {
    this.debug("beforeMount", this.scope);
  }

  protected beforeUnmount() {
    this.debug("beforeUnmount", this.scope);
  }

  protected beforeCreate() {
    this.debug("beforeCreate", this.scope);
  }

  protected beforeUpdate() {
    this.debug("beforeUpdate", this.scope);
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
  protected async attributeChangedCallback(
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

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    this.debug(
      "parsedAttributeChangedCallback",
      attributeName,
      oldValue,
      newValue,
      this.scope,
      this.vueVm
    );
    if (this.vueVm) {
      this.vueVm.$forceUpdate(); // [attributeName] = newValue;
    }
  }

  protected async bind() {
    if (this.bound === true) {
      // this.debug("component already bound");
      return this.vue;
    }

    if (!this.checkRequiredAttributes()) {
      this.debug("Not all required attributes are set for bind");
      return;
    }

    this.bound = true;

    this.debug("Start to bind Vue");

    await this.beforeBind();

    const VueOptions: Component<
      any,
      any,
      any,
      Record<string, WritableComputedOptions<any>>
    > = {
      data: () => {
        return this.scope;
      },
      props: this.observedAttributes,
      methods: this.methods,
      beforeMount: this.beforeMount.bind(this),
      beforeUnmount: this.beforeUnmount.bind(this),
      beforeCreate: this.beforeCreate.bind(this),
      beforeUpdate: this.beforeUpdate.bind(this),
      name: VueComponent.tagName,
      watch: this.getAttributeWatchOption(),
    };
    this.vue = createApp(VueOptions);
    this.vueVm = this.vue.mount(this);

    await this.afterBind();

    return this.vue;
  }

  // Untested
  protected getAttributeWatchOption() {
    const watch: any = {};
    for (const observedAttribute of this.observedAttributes) {
      watch[observedAttribute] = (newValue: any, oldValue: any) => {
        this.debug("watch", observedAttribute, newValue, oldValue);
        return this.attributeChangedCallback(
          observedAttribute,
          oldValue,
          newValue,
          null
        );
      };
    }
    return watch;
  }

  protected async unbind() {
    if (this.vue) {
      this.bound = false;
      this.vue.unmount();
      delete this.vue;
    }
  }

  protected async build() {
    if (this.vue) {
      this.vue.mount(this);
    }
  }
}
