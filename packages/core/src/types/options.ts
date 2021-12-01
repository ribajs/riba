import { Extensions } from "./extensions";
import { EventHandler } from "./event-handler";

export interface Options extends Extensions {
  /** Attribute / web-component prefix in templates */
  prefix?: string[];

  /** Attribute/ web-component  prefix + '-' */
  fullPrefix?: string[];

  /** Preload templates with initial data on bind */
  preloadData?: boolean;

  /** Root sightglass interface for keypath's */
  rootInterface?: string;

  /** Template delimiters for text bindings */
  templateDelimiters?: Array<string>;

  /** Augment the event handler of the on-* binder */
  handler?: EventHandler;

  attributeBinders: string[];

  /** Removes binder attribute after the binder was bound */
  removeBinderAttributes?: boolean;

  /** Stop binding on this node types */
  blockNodeNames: Array<string>;

  /** Block unknown custom elements which are not registered in Riba */
  blockUnknownCustomElements: boolean;
}
