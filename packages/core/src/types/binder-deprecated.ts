import { Binding } from "../binding";

/**
 * A one way or to way binder interface
 * @deprecated
 */
export interface BinderDeprecated<T = any, E = HTMLUnknownElement> {
  /**
   * The name of the binder to access the binder by
   */
  name: string;
  /**
   * Blocks the current node and child nodes from being parsed (used for iteration binding as well as the if/unless binders).
   */
  block?: boolean;
  /**
   * Set this to true if you want view.publish() to call publish on these bindings.
   */
  publishes?: boolean;
  /**
   * Priority of the binder, binders with higher priority are applied first
   */
  priority?: number;

  /**
   * The routine function is called when an observed attribute on the model changes and is used to update the DOM. When defining a one-way binder as a single function, it is actually the routine function that you're defining.
   */
  routine(this: Binding, element: E, value: T): void;
  /**
   * This function will get called for this binding on the initial `view.bind()`. Use it to store some initial state on the binding, or to set up any event listeners on the element.
   */
  bind?(this: Binding, element: E): void;
  /**
   * This function will get called for this binding on `view.unbind()`. Use it to reset any state on the element that would have been changed from the routine getting called, or to unbind any event listeners on the element that you've set up in the `binder.bind` function.
   */
  unbind?(this: Binding, element: E): void;
  /**
   * Updates the binding's model from what is currently set on the view.
   * Unbinds the old model first and then re-binds with the new model.
   */
  update?(this: Binding, model: any): void;
  /**
   * The getValue function is called when the binder wants to set the value on the model. This function takes the HTML element as only parameter
   */
  getValue?(this: Binding, element: E): void;

  /**
   * A binder can have any other private properties or methods like a Class
   */
  [propertyOrFunction: string]: any;
}
