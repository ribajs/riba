import Debug from 'debug';
import { IBinders } from './binder.service';
import { IFormatters } from './formatter.service';
import { IComponent, IComponents } from './component.service';
import { IAdapters } from './adapter';
import { IBindable } from './binding';

export type Scope = any;

export interface IComponent<ValueType> {
  /** If the template function returns null no template is injected */
  template: (() => string | null) | (() => HTMLElement);
  initialize: (el: HTMLElement, data: ValueType) => Scope;

  /** array of attribiute names to force parse attributes as static (primitive) values */
  static?: string[];

  /** array of attribiute names to auto bind attributes to the scope */
  bind?: string[];

  // extension options
  binders?: IBinders<any>;
  formatters?: IFormatters;
  components?: IComponents;
  adapters?: IAdapters;

  // other options
  prefix?: string;
  preloadData?: boolean;
  rootInterface?: string;
  templateDelimiters?: Array<string>;
  handler?: (this: any, context: any, ev: Event, binding: IBindable) => void;
}

export interface IComponents {
  [name: string]: IComponent<any>;
}

export interface IComponentWrapperResult<ValueType> extends IComponent<ValueType> {
  name: string;
}

export type ComponentWrapper<ValueType> = (...deps: any[]) => IComponentWrapperResult<ValueType>;

export class ComponentService {
  private components: IComponents;
  private debug = Debug('components:ComponentService');

  /**
   *
   * @param components
   */
  constructor(components: IComponents) {
    this.components = components;
  }

  /**
   * Regist a component wrapper
   * @param ComponentWrapper
   * @param name
   */
  public registWrapper(componentWrapper: IComponentWrapperResult<any>, name?: string): IComponents {
    if (!name) {
      name = componentWrapper.name;
    }
    const component = (componentWrapper as IComponentWrapperResult<any>);
    this.components[name] = component;
    return this.components;
  }

  /**
   * Regist a component with his name
   * @param component
   * @param name
   */
  public regist(component: IComponent<any>, name?: string): IComponents {
    if (!name) {
      if (component.hasOwnProperty('constructor')) {
        name = component.constructor.name;
      }

      if (component.hasOwnProperty('name')) {
        name = (component as any).name;
      }
    }

    this.debug('name', name, component);

    if (!name) {
      throw new Error('[ComponentService] name is required');
    }

    this.components[name] = component;
    return this.components;
  }

  /**
   * Regist a set of components
   * @param components
   */
  public regists(components: IComponents): IComponents {
    for (const name in components) {
      if (components.hasOwnProperty(name)) {
        this.regist(components[name], name);
      }
    }
    return this.components;
  }
}
