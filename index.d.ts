/// <reference types="jquery" />
import { IBinders, Binder } from './src/binders';
import { IOptions } from './src/export';
import { View } from './src/view';

// export interface Observer {
//   unobserve: () => any
//   value: () => any
// }

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
  binders: IBinders<any>;

  // Global components.
  components: IComponents;

  // Global formatters.
  formatters: IFormatters;

  // Global sightglass adapters.
  adapters: any;

  handler(context: any, ev: Event, biding: any): void;

  configure(options?: IOptions): void;

  bind(element: HTMLElement | Array<HTMLElement> | JQuery<HTMLElement>, models: any, options?: any): View;

  _: {
    sightglass: any;
  }
}