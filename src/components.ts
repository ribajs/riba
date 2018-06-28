import { IBinders } from './binders';
import { IFormatters } from './formatters';
import { IComponent, IComponents } from './components';
import { IAdapters } from './adapter';

export type Scope = any;

export interface IComponent {
  template: (() => string) | (() => HTMLElement);
  initialize: (el: HTMLElement, data: any) => Scope;
  static?: any;

  // extension options
  binders?: IBinders<any>;
  formatters?: IFormatters;
  components?: IComponents;
  adapters?: IAdapters;

  // other options
  prefix?: string;
  preloadData?: boolean;
  rootInterface?: string;
  templateDelimiters?: Array<string>
  handler?: Function;
}

export interface IComponents {
  [name: string]: IComponent;
}