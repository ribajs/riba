import { IModuleFormatters, IModuleBinders, IAdapters, IComponents } from '../interfaces';
import { Binding } from '../binding';

export interface IExtensions {
  binders?: IModuleBinders<any>;
  formatters?: IModuleFormatters;
  components?: IComponents;
  adapters?: IAdapters;
}

/** Interface for the event handler, augment the event handler of the on-* binder */
export type EventHandler = (this: any, context: Binding, ev: Event, binding: Binding, el: HTMLElement) => void;

export interface IOptions {
  /** Attribute / web-component prefix in templates */
  prefix?: string;

  /** Attribute/ web-component  prefix + '-' */
  fullPrefix?: string;

  /** Preload templates with initial data on bind */
  preloadData?: boolean;

  /** Root sightglass interface for keypaths */
  rootInterface?: string;

  /** Template delimiters for text bindings */
  templateDelimiters?: Array<string>;

  /** Augment the event handler of the on-* binder */
  handler?: EventHandler;

  starBinders?: any;

  removeBinderAttributes?: boolean;
}

export declare interface IOptionsParam extends IExtensions, IOptions {}

export declare interface IViewOptions extends IOptionsParam {
  binders: IModuleBinders<any>;
  formatters: IModuleFormatters;
  components: IComponents;
  adapters: IAdapters;

  /** Attribute / web-component prefix in templates */
  prefix: string;

  /** Attribute/ web-component  prefix + '-' */
  fullPrefix: string;

  /** Preload templates with initial data on bind */
  preloadData: boolean;

  /** Root sightglass interface for keypaths */
  rootInterface: string;

  /** Template delimiters for text bindings */
  templateDelimiters?: Array<string>;

  /** Augment the event handler of the on-* binder */
  handler?: EventHandler;
  starBinders: any;

  removeBinderAttributes: boolean;
}
