import { RibaComponent } from '../components/riba-component';
import { IModuleBinders, IModuleFormatters, IAdapters, IBindable } from './';

export type Scope = any;

export interface IModuleComponents {
  [name: string]: typeof RibaComponent;
}

export interface IClassicComponent<ValueType> {
  /** If the template function returns null no template is injected */
  template: ((el: HTMLElement) => string | null);
  initialize: (el: HTMLElement, data: ValueType) => Scope;

  /** array of attribiute names to force parse attributes as static (primitive) values */
  static?: string[];

  /** array of attribiute names to auto bind attributes to the scope */
  bind?: string[];

  // extension options
  binders?: IModuleBinders<any>;
  formatters?: IModuleFormatters;
  components?: IComponents;
  adapters?: IAdapters;

  // other options
  prefix?: string;
  preloadData?: boolean;
  rootInterface?: string;
  templateDelimiters?: Array<string>;

  /**
   * If you want to save custom data in your binder logic
   */
  [key: string]: any;

  handler?: (this: any, context: any, ev: Event, binding: IBindable) => void;
}

export interface IComponents {
  [name: string]: IClassicComponent<any> | typeof RibaComponent;
}

export interface IComponentWrapperResult<ValueType> extends IClassicComponent<ValueType> {
  name: string;
}

export type ComponentWrapper<ValueType> = (...deps: any[]) => IComponentWrapperResult<ValueType>;
