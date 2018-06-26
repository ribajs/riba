/// <reference types="jquery" />

import { IBinders, Binder, IBinding } from './src/binders';

export interface IOptions {
  // Attribute prefix in templates
  prefix?: string;

  //Preload templates with initial data on bind
  preloadData?: boolean;

  //Root sightglass interface for keypaths
  rootInterface?: string;

  // Template delimiters for text bindings
  templateDelimiters?: Array<string>

  // Augment the event handler of the on-* binder
  handler?: Function;
}

export interface Observer {
  unobserve: () => any
  value: () => any
}

export type TBlock = boolean;

export interface IView extends IOptions {
  models: Object;
  bindings: any[];
  options: () => IOptions;
  build(): void;
  bind(): void;
  unbind(): void;
  sync(): void;
  publish(): void;
  update(models: any): void;
  buildBinding(node: HTMLElement, type: string, declaration: string, binder: Binder<any>, arg: any): IBinding;
  traverse(node: HTMLElement): TBlock;
}

export type Scope = any;

export interface IComponent {
  template: string | (() => string) | (() => HTMLElement);
  initialize: (el: HTMLElement, data: any) => Scope;
}

export interface IComponents {
  [name: string]: IComponent;
}

export interface IFormatter {
  (val: any, ...args: any[]): any;
}

export interface IFormatters {
  [name: string]: IFormatter;
}

export interface Tinybind extends IOptions {
  // Global binders.
  binders: IBinders;

  // Global components.
  components: IComponents;

  // Global formatters.
  formatters: IFormatters;

  // Global sightglass adapters.
  adapters: any;

  handler(context: any, ev: Event, biding: any): void;

  configure(options?: IOptions): void;

  bind(element: HTMLElement | Array<HTMLElement> | JQuery<HTMLElement>, models: any, options?: any): IView;

  _: {
    sightglass: any;
  }
}