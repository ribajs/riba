import { IBinders } from './binders';
import { IFormatters } from './formatters';
import { IComponent, IComponents } from './components';
import { IAdapters } from './adapter';

export type Scope = any;

export interface IComponent<ValueType> {
  template: (() => string) | (() => HTMLElement);
  initialize: (el: HTMLElement, data: ValueType) => Scope;

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
  [name: string]: IComponent<any>;
}