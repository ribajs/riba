import { Riba } from './riba';
import {
  Binder,
  Options,
  BindableElement,
  TypeOfComponent,
} from './interfaces';
import { Binding } from './binding';
import { parseNode, parseDeclaration } from './parsers';
import { Component } from './component';

export type TBlock = boolean;

/**
 * TODO Check if there is an official interface which fits better here
 */
export interface DataElement extends HTMLUnknownElement {
  data?: string;
}

/**
 * A collection of bindings built from a set of parent nodes.
 */
export class View {
  public static DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

  /**
   * Binder for mustache style `{model.property}` text Binders
   */
  public static mustacheTextBinder: Binder<string> = {
    name: 'mustache-text',
    routine: (node: DataElement, value: string) => {
      node.data = (value != null) ? value : '';
    },
  };

  public static bindingComparator = (a: Binding, b: Binding) => {
    const aPriority = (a as Binding).binder ? (((a as Binding).binder as Binder<any>).priority || 0) : 0;
    const bPriority = (b as Binding).binder ? (((b as Binding).binder as Binder<any>).priority || 0) : 0;
    return bPriority - aPriority;
  }

  /**
   * Helper function to Create a new view insite of a binding
   * @param bindin
   * @param models
   * @param anchorEl
   */
  public static create(binding: Binding, models: any, anchorEl: HTMLElement | Node | null) {
    const template = binding.el.cloneNode(true);
    const view = new View((template as Node), models, binding.view.options);
    view.bind();
    if (!binding || !binding.marker || binding.marker.parentNode === null) {
      console.warn('[View]: No parent node for binding!');
    } else {
      binding.marker.parentNode.insertBefore(template, anchorEl);
    }
    return view;
  }

  public els: HTMLCollection | HTMLElement[] | Node[];
  public models: any;
  public options: Options;
  public bindings: Array<Binding> = [];
  public webComponents: Array<Component> = [];
  // public componentView: View | null = null;

  /**
   * The DOM elements and the model objects for binding are passed into the
   * constructor along with any local options that should be used throughout the
   * context of the view and it's bindings.
   * @param els
   * @param models
   * @param options
   */
  constructor(els: HTMLCollection | HTMLElement | Node | NodeListOf<ChildNode> | HTMLUnknownElement[] , models: any, options: Options) {
    if (Array.isArray(els)) {
      this.els = els;
    } else {
      this.els = ([els] as HTMLElement[] | Node[] );
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
        // Not already registred?
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
      binding.bind();
    });
  }

  /**
   * Unbinds all of the current bindings for this view.
   */
  public unbind() {
    if (Array.isArray(this.bindings)) {
      this.bindings.forEach((binding) => {
        binding.unbind();
      });
      this.webComponents.forEach((webcomponent) => {
        webcomponent.disconnectedFallbackCallback();
      });
    }

    // TODO fallback to unbind web components
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
    this.bindings.forEach((binding) => {
      if ((binding as Binding).binder && binding.publish && ((binding as Binding).binder as Binder<any>).publishes) {
        binding.publish();
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

    this.bindings.forEach((binding) => {
      if ((binding as Binding).update) {
        (binding as Binding).update(models);
      }
    });
  }

  /**
   * Parses the DOM tree and builds `Binding` instances for every matched
   * binding declaration.
   */
  public build() {
    this.bindings = [];

    if (!this.options.templateDelimiters) {
      throw new Error('templateDelimiters required');
    }

    const elements = this.els;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element) {
        parseNode(this, (element as DataElement), this.options.templateDelimiters);
      }
    }

    this.bindings.sort(View.bindingComparator);
  }

  public traverse(node: BindableElement): TBlock {

    let bindingPrefix;
    if (this.options.fullPrefix) {
      bindingPrefix = this.options.fullPrefix;
    } else {
      // TODO FIXME
      bindingPrefix = this.options.prefix + '-';
    }

    if (!bindingPrefix) {
      throw new Error('prefix is required');
    }

    /** If true stop / block the parseNode recursion */
    let block = this.options.blockNodeNames.includes(node.nodeName);
    const attributes = node.attributes;
    const bindInfos = [];
    const starBinders = this.options.starBinders;

    // bind attribute binders if available
    if (attributes && this.options.binders) {
      for (let i = 0, len = attributes.length; i < len; i++) {
        let nodeName = null;
        let binder = null;
        let identifier = null;
        const attribute = attributes[i];
        // if attribute starts with the binding prefix. E.g. rv
        if (attribute.name.indexOf(bindingPrefix) === 0) {
          nodeName = attribute.name.slice(bindingPrefix.length);
          // if binder is not a starBinder binder should be setted
          if (this.options.binders.hasOwnProperty(nodeName)) {
            binder = this.options.binders[nodeName];
          }

          if (binder === null) {
            // seems to be a star binder (because binder was not set)
            // Check if any starBinder matchs
            for (let k = 0; k < starBinders.length; k++) {
              identifier = starBinders[k];
              const regexp = new RegExp(`^${identifier.replace(/\*/g, '.+')}$`);
              if (regexp.test(nodeName)) {
                binder = this.options.binders[identifier];
                break;
              }
            }
          }

          if (binder === null) {
            if (this.options.binders.hasOwnProperty('*')) {
              binder = this.options.binders['*'];
              identifier = '*';
            } else {
              binder = Riba.fallbackBinder;
            }
          }

          // if block is set childs not bound (the binder bound it by itself)
          // and build binding directly (do not push it to bindInfos array)
          if (binder.block) {
            this.buildBinding(node, nodeName, attribute.value, binder, identifier);
            if (node.removeAttribute && this.options.removeBinderAttributes) {
              node.removeAttribute(attribute.name);
            }
            return true;
          }

          bindInfos.push({attr: attribute, binder, nodeName, identifier});
        }
      }

      for (let i = 0; i < bindInfos.length; i++) {
        const bindInfo = bindInfos[i];
        this.buildBinding(node, bindInfo.nodeName, bindInfo.attr.value, bindInfo.binder, bindInfo.identifier);
        if (node.removeAttribute && this.options.removeBinderAttributes) {
          node.removeAttribute(bindInfo.attr.name);
        }
      }
    }

    // bind components
    if (!block) {
      const nodeName = node.nodeName.toLowerCase();
      if (this.options.components && this.options.components[nodeName] && !node._bound) {
        const COMPONENT = this.options.components[nodeName];
        this.registComponentWithFallback(node, COMPONENT, nodeName);
        block = true;
      }
    }
    return block;
  }

  public buildBinding(node: HTMLUnknownElement, type: string | null, declaration: string, binder: Binder<any>, identifier: string | null) {
    const parsedDeclaration = parseDeclaration(declaration);
    const keypath = parsedDeclaration.keypath;
    const pipes = parsedDeclaration.pipes;
    this.bindings.push(new Binding((this as View), node, type, keypath, binder, pipes, identifier));
  }

  protected registComponentWithFallback(node: Node, COMPONENT: TypeOfComponent, nodeName?: string) {
    nodeName = nodeName || COMPONENT.tagName;
    // Fallback
    if (!window.customElements) {
      this.registComponentFallback(node, COMPONENT, nodeName);
    } else {
      // if node.constructor is not HTMLElement and not HTMLUnknownElement, it was registed
      // @see https://stackoverflow.com/questions/27334365/how-to-get-list-of-registered-custom-elements
      if (customElements.get(nodeName) || (node.constructor !== HTMLElement && node.constructor !== HTMLUnknownElement)) {
        // console.warn(`Web component already defined`, node.constructor);
      } else {
        try {
          this.registComponent(COMPONENT, nodeName);
        } catch (error) {
          this.registComponentFallback(node, COMPONENT, nodeName);
        }
      }
    }
  }

  /**
   * Regist a custom element using the fallback logic for browsers that cannot native use custom elements.
   * @param node
   * @param COMPONENT
   * @param nodeName
   */
  protected registComponentFallback(node: Node, COMPONENT: TypeOfComponent, nodeName?: string) {
    nodeName = nodeName || COMPONENT.tagName;
    console.warn(`Fallback for Webcomponent ${nodeName}`);
    const component = new COMPONENT(node, {
      fallback: true,
      view: this,
    });
    this.webComponents.push(component);
  }

  /**
   * Regist a custom element using the native customElements feature.
   * @param COMPONENT
   * @param nodeName
   */
  protected registComponent(COMPONENT: TypeOfComponent, nodeName?: string) {
    if (!window.customElements) {
      console.warn('customElements not supported by your browser! Do nothing.');
      return;
    }
    nodeName = nodeName || COMPONENT.tagName;
    window.customElements.define(COMPONENT.tagName, COMPONENT);
    // TODO ?? call unbind (on unbind this view) of this component instance to unbind this view
    // (not disconnectedCallback / disconnectedFallbackCallback, this is automatically called from customElements)
    const component = window.customElements.get(nodeName) as Component;
    component.context = {
      fallback: false,
      view: this,
    };
  }

}
