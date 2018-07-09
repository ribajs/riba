import { IViewOptions, Tinybind } from './tinybind';
import { Binder, ITwoWayBinder } from './binder.service';
import { Binding, IBindable } from './binding';
import { ComponentBinding, IBoundElement } from './component-binding';
import { parseNode, parseDeclaration } from './parsers';

export type TBlock = boolean;

export interface IDataElement extends HTMLElement {
  data?: string;
}

/**
 * A collection of bindings built from a set of parent nodes.
 */
export class View {
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

  public static create(binding: Binding, models: any, anchorEl: HTMLElement | Node | null) {
    const template = binding.el.cloneNode(true);
    const view = new View((template as Node), models, binding.view.options);
    view.bind();
    if (!binding || !binding.marker || binding.marker.parentNode === null) {
      throw new Error('[View] No parent node for binding!');
    }
    binding.marker.parentNode.insertBefore(template, anchorEl);
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

  public buildBinding(node: HTMLElement | Text, type: string | null, declaration: string, binder: Binder<any>, args: string[] | null) {
    const parsedDeclaration = parseDeclaration(declaration);
    const keypath = parsedDeclaration.keypath;
    const pipes = parsedDeclaration.pipes;
    this.bindings.push(new Binding((this as View), (node as HTMLElement), type, keypath, binder, args, pipes));
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

    // TODO
    let bindingPrefix = this.options.prefix;
    if (!bindingPrefix) {
      throw new Error('prefix is required');
    }
    bindingPrefix = bindingPrefix + '-';

    let block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
    const attributes = node.attributes;
    const bindInfos = [];
    const starBinders = this.options.starBinders;
    let type;
    let binder;
    let identifier;
    let args;

    for (let i = 0, len = attributes.length; i < len; i++) {
      const attribute = attributes[i];
      // if attribute starts with the binding prefix. E.g. rv
      if (attribute.name.indexOf(bindingPrefix) === 0) {
        type = attribute.name.slice(bindingPrefix.length);
        binder = this.options.binders[type];
        args = [];

        if (!binder) {
          for (let k = 0; k < starBinders.length; k++) {
            identifier = starBinders[k];
            if (type.slice(0, identifier.length - 1) === identifier.slice(0, -1)) {
              binder = this.options.binders[identifier];
              args.push(type.slice(identifier.length - 1));
              break;
            }
          }
        }

        if (!binder) {
          binder = Tinybind.fallbackBinder;
        }

        if ((binder as ITwoWayBinder<any>).block) {
          this.buildBinding(node, type, attribute.value, binder, args);
          node.removeAttribute(attribute.name);
          return true;
        }

        bindInfos.push({attr: attribute, binder, type, args});
      }
    }

    for (let i = 0; i < bindInfos.length; i++) {
      const bindInfo = bindInfos[i];
      this.buildBinding(node, bindInfo.type, bindInfo.attr.value, bindInfo.binder, bindInfo.args);
      node.removeAttribute(bindInfo.attr.name);
    }

    // bind components
    if (!block) {
      type = node.nodeName.toLowerCase();

      if (this.options.components[type] && !node._bound) {
        this.bindings.push(new ComponentBinding((this as View), node, type));
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
    // if(this.componentView) {
    //   this.componentView.unbind();
    // }
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
