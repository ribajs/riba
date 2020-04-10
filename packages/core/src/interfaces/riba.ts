import { Formatters, Binders, Adapters, Components } from "../interfaces";
import { Binding } from "../binding";

export interface Extensions {
  binders?: Binders<any>;
  formatters?: Formatters;
  components?: Components;
  adapters?: Adapters;
}

/** Interface for the event handler, augment the event handler of the on-* binder */
export type EventHandler = (
  this: any,
  context: Binding,
  ev: Event,
  binding: Binding,
  el: HTMLElement
) => void;

export interface Options extends Extensions {
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

  attributeBinders?: any;

  /** Removes binder attribute after the binder was bound */
  removeBinderAttributes?: boolean;

  /** Stop binding on this node types */
  blockNodeNames: Array<string>;
}
