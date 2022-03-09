import {
  Options,
  BindableElement,
  ClassOfBinder,
  ClassOfComponent,
  DataElement,
} from "./types/index.js";
import { parseNode } from "./parse-node";
import { parseDeclaration } from "./parse-declaration";
import { BasicComponent, Component } from "./component";
import { isCustomElement } from "@ribajs/utils/src/index.js";
import { Binder } from "./binder";

/**
 * Sets the attribute on the element. If no binder is matched it will fall
 * back to using this binder.
 */
import { AttributeBinder } from "./binders/attribute.binder.js";

/**
 * A collection of bindings built from a set of parent nodes.
 */
export class View {
  public static bindingComparator = (a: Binder, b: Binder) => {
    const aPriority = a.priority || 0;
    const bPriority = b.priority || 0;
    return bPriority - aPriority;
  };

  /**
   * Helper function to create a new view inside of a binding
   * @param binding
   * @param models
   * @param anchorEl
   */
  public static create(
    binder: Binder,
    models: any,
    anchorEl: HTMLElement | Node | null
  ) {
    const template = binder.el.cloneNode(true);
    const view = new View(template, models, binder.view.options);
    view.bind();
    if (!binder?.marker?.parentNode) {
      console.warn("[View]: No parent node for binding!");
    } else {
      binder.marker.parentNode.insertBefore(template, anchorEl);
    }
    return view;
  }

  public els: HTMLCollection | HTMLElement[] | Node[];
  public models: any;
  public options: Options;
  public bindings: Array<Binder> = [];
  public webComponents: Array<Component | BasicComponent> = [];
  // public componentView: View | null = null;

  /**
   * The DOM elements and the model objects for binding are passed into the
   * constructor along with any local options that should be used throughout the
   * context of the view and it's bindings.
   * @param els
   * @param models
   * @param options
   */
  constructor(
    els:
      | HTMLCollection
      | HTMLElement
      | Node
      | NodeListOf<ChildNode>
      | HTMLUnknownElement[],
    models: any,
    options: Options
  ) {
    if (Array.isArray(els)) {
      this.els = els;
    } else {
      this.els = [els] as HTMLElement[] | Node[];
    }
    this.models = models;
    this.options = options;

    this.build();
  }

  /**
   * Regist all components
   * This can sometimes be useful so that the browser automatically recognizes whether a component is inserted into the dom.
   * However, the components are already registered when they are found by riba in the DOM.
   *
   * Please note, this method does not support the browser fallback for browsers that cannot use custom elements.
   */
  public registComponents() {
    for (const nodeName in this.options.components) {
      if (this.options.components[nodeName]) {
        // Not already registered?
        if (!customElements.get(nodeName)) {
          const COMPONENT = this.options.components[nodeName];
          this.registComponent(COMPONENT, nodeName);
        }
      }
    }
  }
  /**
   * Binds all of the current bindings for this view.
   */
  public bind() {
    this.bindings.forEach((binding) => {
      binding._bind();
    });
  }

  /**
   * Unbinds all of the current bindings for this view.
   */
  public unbind() {
    if (Array.isArray(this.bindings)) {
      this.bindings.forEach((binding) => {
        binding._unbind();
        if (typeof binding.el && this.options.removeBinderAttributes) {
          // TODO reset attribute ?
          // binding.el.setAttribute(attribute.name);
        }
      });
    }

    // TODO fallback to unbind web components
    if (Array.isArray(this.webComponents)) {
      this.webComponents.forEach((webComponent) => {
        if (typeof (webComponent as Component).unbind === "function") {
          (webComponent as Component).unbind();
        }
      });
    }
  }

  /**
   * Syncs up the view with the model by running the routines on all bindings.
   */
  public sync() {
    this.bindings.forEach((binding) => {
      if (binding.sync) {
        binding.sync();
      }
    });
  }

  /**
   * Publishes the input values from the view back to the model (reverse sync).
   */
  public publish() {
    this.bindings.forEach((binder) => {
      if (binder.publishes && binder.publish) {
        binder.publish();
      }
    });
  }

  /**
   * Updates the view's models along with any affected bindings.
   * @param models
   */
  public update(models: any = {}) {
    Object.keys(models).forEach((key) => {
      this.models[key] = models[key];
    });

    for (const binding of this.bindings) {
      if (binding._update) {
        binding._update(models);
      }
    }
  }

  /**
   * Parses the DOM tree and builds `Binding` instances for every matched
   * binding declaration.
   */
  public build() {
    this.bindings = []; // this.bindings || [];

    if (!this.options.templateDelimiters) {
      throw new Error("templateDelimiters required");
    }

    const elements = this.els;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element) {
        parseNode(
          this,
          element as DataElement,
          this.options.templateDelimiters
        );
      }
    }

    this.bindings.sort(View.bindingComparator);
  }

  protected startsWithPrefix(name: string) {
    const bindingFullPrefixes = this.options.fullPrefix;
    if (!bindingFullPrefixes) {
      throw new Error("prefix is required");
    }

    for (const fullPrefix of bindingFullPrefixes) {
      if (name.startsWith(fullPrefix)) {
        return fullPrefix;
      }
    }

    return undefined;
  }

  public binderRegex(identifier: string) {
    const wildcards = identifier.match(/\*/g)?.length || 0;
    let regexp: RegExp;
    if (wildcards > 1) {
      regexp = new RegExp(
        `^${identifier.replace("*", "([^-]*)").replaceAll("-*", "-(.+)")}$`
      );
    } else {
      regexp = new RegExp(`^${identifier.replaceAll("*", "(.+)")}$`);
    }
    return regexp;
  }

  /**
   *
   */
  private bindBinders(
    attributes: NamedNodeMap,
    node: BindableElement,
    attributeBinders = this.options.attributeBinders
  ) {
    let block = false;
    if (!this.options.binders) {
      return block;
    }
    const bindInfos = [];
    for (let i = 0, len = attributes.length; i < len; i++) {
      let nodeName = "";
      let Binder: ClassOfBinder | null = null;
      const attribute = attributes[i];
      // if attribute starts with the binding prefix. E.g. rv-
      const startingPrefix = this.startsWithPrefix(attribute.name);
      if (startingPrefix) {
        let identifier = "";
        nodeName = attribute.name.slice(startingPrefix.length);

        // if binder is not a attributeBinder binder should be set
        if (this.options.binders[nodeName]) {
          Binder = this.options.binders[nodeName];
        }

        if (Binder === null) {
          // seems to be a star binder
          // Check if any attributeBinder match's
          for (let k = 0; k < attributeBinders.length; k++) {
            identifier = attributeBinders[k];
            const regexp = this.binderRegex(identifier);
            if (regexp.test(nodeName)) {
              Binder = this.options.binders[identifier];
              break;
            }
          }
        }

        if (Binder === null) {
          if (this.options.binders["*"]) {
            Binder = this.options.binders["*"];
            identifier = "*";
          } else {
            Binder = AttributeBinder;
          }
        }
        // if block is set, do not bind its child's (this means the binder bound it by itself)
        // and build binding directly (do not push it to bindInfos array)
        if (Binder.block) {
          this.buildBinding(
            node,
            nodeName,
            attribute.value,
            Binder,
            identifier
          );
          if (node.removeAttribute && this.options.removeBinderAttributes) {
            node.removeAttribute(attribute.name);
          }
          block = true;
          return block;
        }

        bindInfos.push({ attr: attribute, Binder, nodeName, identifier });
      }
    }

    for (let i = 0; i < bindInfos.length; i++) {
      const bindInfo = bindInfos[i];
      this.buildBinding(
        node,
        bindInfo.nodeName,
        bindInfo.attr.value,
        bindInfo.Binder,
        bindInfo.identifier
      );
      if (node.removeAttribute && this.options.removeBinderAttributes) {
        node.removeAttribute(bindInfo.attr.name);
      }
    }
    return block;
  }

  private bindComponent(node: BindableElement) {
    let block = false;
    if (!this.options.components) {
      return block;
    }

    const nodeName = node.nodeName.toLowerCase();
    const COMPONENT = this.options.components[nodeName];
    if (COMPONENT) {
      // this.registComponentWithFallback(node, COMPONENT, nodeName);
      this.registComponent(COMPONENT, nodeName);
      block = true;
    }
    // Also block unknown custom elements except page components
    else if (
      this.options.blockUnknownCustomElements &&
      isCustomElement(node) &&
      !nodeName.endsWith("-page")
    ) {
      block = true;
    }
    return block;
  }

  public traverse(node: BindableElement): boolean {
    /** If true stop / block the parseNode recursion */
    let block = this.options.blockNodeNames.includes(node.nodeName);
    if (block) {
      return block;
    }
    const attributes = node.attributes;

    // bind attribute binders if available
    if (attributes && this.options.binders) {
      block = this.bindBinders(attributes, node);
      if (block) {
        return block;
      }
    }

    // bind components
    if (!block && !node._bound && this.options.components) {
      block = this.bindComponent(node);
    }
    return block;
  }

  public buildBinding(
    node: HTMLUnknownElement | Text,
    type: string | null,
    declaration: string,
    Binder: ClassOfBinder,
    identifier: string | null
  ) {
    const parsedDeclaration = parseDeclaration(declaration);
    const keypath = parsedDeclaration.keypath;
    const pipes = parsedDeclaration.pipes;
    this.bindings.push(
      new Binder(this, node, type, Binder.key, keypath, pipes, identifier)
    );
  }

  /**
   * Register a custom element using the native customElements feature.
   * @param COMPONENT
   * @param nodeName
   */
  protected registComponent(COMPONENT: ClassOfComponent, nodeName?: string) {
    if (!customElements) {
      console.error("customElements not supported by your browser!");
      throw new Error("customElements not supported by your browser!");
    }

    const resolveNodeName = nodeName || COMPONENT.tagName;
    if (!customElements.get(resolveNodeName)) {
      customElements.define(COMPONENT.tagName, COMPONENT);
    }
  }
}
