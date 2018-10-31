import { IViewOptions, Riba } from './riba';
import { Binder, ITwoWayBinder } from './services/binder.service';
import { Binding, IBindable } from './binding';
import { ComponentService} from './services/component.service';
import { ComponentBinding, IBoundElement } from './components/component-binding';
import { parseNode, parseDeclaration } from './parsers';
import Debug from 'debug';
import { RibaComponentClass } from './components/riba-component-class';

export type TBlock = boolean;

export interface IDataElement extends HTMLElement {
  data?: string;
}

/**
 * A collection of bindings built from a set of parent nodes.
 */
export class View {
  public static debug = Debug('riba:view');

  public static DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

  public static textBinder: ITwoWayBinder<string> = {
    routine: (node: IDataElement, value: string) => {
      node.data = (value != null) ? value : '';
    },
  };

  public static bindingComparator = (a: IBindable, b: IBindable) => {
    const aPriority = a.binder ? ((a.binder as ITwoWayBinder<any>).priority || 0) : 0;
    const bPriority = b.binder ? ((b.binder as ITwoWayBinder<any>).priority || 0) : 0;
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
      this.debug('[View] Warn: No parent node for binding!');
    } else {
      binding.marker.parentNode.insertBefore(template, anchorEl);
    }
    return view;
  }

  public els: HTMLCollection | HTMLElement[] | Node[];
  public models: any;
  public options: IViewOptions;
  public bindings: IBindable[] = [];
  // public componentView: View | null = null;

  /**
   * The DOM elements and the model objects for binding are passed into the
   * constructor along with any local options that should be used throughout the
   * context of the view and it's bindings.
   * @param els
   * @param models
   * @param options
   */
  constructor(els: HTMLCollection | HTMLElement | Node, models: any, options: IViewOptions) {
    if (els instanceof Array) {
      this.els = els;
    } else {
      this.els = ([els] as HTMLElement[] | Node[] );
    }
    this.models = models;
    this.options = options;

    this.build();
  }

  public buildBinding(node: HTMLElement | Text, type: string | null, declaration: string, binder: Binder<any>, identifier: string | null) {
    const parsedDeclaration = parseDeclaration(declaration);
    const keypath = parsedDeclaration.keypath;
    const pipes = parsedDeclaration.pipes;
    this.bindings.push(new Binding((this as View), (node as HTMLElement), type, keypath, binder, pipes, identifier));
  }

  /**
   * Parses the DOM tree and builds `Binding` instances for every matched
   * binding declaration.
   */
  public build() {
    this.bindings = [];

    const elements = this.els;
    let i: number;
    let len: number;
    for (i = 0, len = elements.length; i < len; i++) {
      if (! this.options.templateDelimiters) {
        throw new Error('templateDelimiters required');
      }
      parseNode(this, (elements[i] as IDataElement), this.options.templateDelimiters);
    }

    this.bindings.sort(View.bindingComparator);
  }

  public traverse(node: IBoundElement): TBlock {

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

    /** If true stop / block the parseNode  recursion */
    let block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || node.nodeName === 'TEMPLATE';
    const attributes = node.attributes;
    const bindInfos = [];
    const starBinders = this.options.starBinders;

    // bind attribute binders if available
    if (this.options.binders) {
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
          if ((binder as ITwoWayBinder<any>).block) {
            this.buildBinding(node, nodeName, attribute.value, binder, identifier);
            if (this.options.removeBinderAttributes) {
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
        if (this.options.removeBinderAttributes) {
          node.removeAttribute(bindInfo.attr.name);
        }
      }
    }

    // bind components
    if (!block) {
      const nodeName = node.nodeName.toLowerCase();
      if (this.options.components && this.options.components[nodeName] && !node._bound) {

        const type = ComponentService.type(this.options.components[nodeName]);

        // bind (deprecated) components and stop / block the parsing of the childs
        if (type === 'classic') {
          this.bindings.push(new ComponentBinding((this as View), node, nodeName));
          View.debug(`Stop parsing on (deprecated) component ${nodeName}`);
        }

        if (type === 'webcomponent') {
          const COMPONENT = (this.options.components[nodeName] as typeof RibaComponentClass);
          // Fallback
          if (!window.customElements) {
            View.debug(`Fallback for Webcomponent ${nodeName}`);
            const component = new COMPONENT(node);
          } else {
            View.debug(`Define Webcomponent ${nodeName} with customElements.define`);
            if (customElements.get(nodeName)) {
              View.debug(`Web component already defined`);
            } else {
              try {
                customElements.define(nodeName, COMPONENT);
              } catch (error) {
                console.error(error);
                // Fallback
                const component = new COMPONENT(node);
              }
            }
          }
        }

        block = true;
      }
    }

    return block;
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
      if (binding.binder && binding.publish && (binding.binder as ITwoWayBinder<any>).publishes) {
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
      if (binding.update) {
        binding.update(models);
      }
    });
  }
}
