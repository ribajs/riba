import { BinderDeprecated } from "./binder-deprecated";
import { ObserverSyncCallback } from "./observer";
import { Observer } from "../observer";

export interface Bindable<T = any, E = HTMLElement> {
  binder?: BinderDeprecated<T, E>;

  /**
   * Name of the binder without the prefix
   */
  type: string | null;

  el: E;

  /**
   * Observes the object keypath
   * @param obj
   * @param keypath
   */
  observe(obj: any, keypath: string, callback: ObserverSyncCallback): Observer;

  /**
   * Subscribes to the model for changes at the specified keypath. Bi-directional
   * routines will also listen for changes on the element to propagate them back
   * to the model.
   */
  _bind(): void;

  /**
   * Unsubscribes from the model and the element.
   */
  _unbind(): void;

  /**
   * Updates the binding's model from what is currently set on the view. Unbinds
   * the old model first and then re-binds with the new model.
   * @param {any} models
   */
  _update?(models: any): void;

  publish?(): void;

  sync?(): void;
}

export interface FormatterObservers {
  [key: string]: {
    [key: string]: Observer;
  };
}

export type eventHandlerFunction = (event: Event) => void;
