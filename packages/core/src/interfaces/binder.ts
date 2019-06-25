import { Binding } from '../binding';

export interface IBindableElement extends HTMLElement {
  _bound?: boolean;
}

/**
 * One way binder interface
 */
export type IOneWayBinder<ValueType> = (this: Binding, element: HTMLElement, value: ValueType) => void;

/**
 * To way binder interface
 */
export interface ITwoWayBinder<ValueType> {
  routine: (this: Binding, element: HTMLElement, value: ValueType) => void;
  bind?: (this: Binding, element: HTMLElement) => void;
  unbind?: (this: Binding, element: HTMLElement) => void;
  update?: (this: Binding, model: any) => void;
  getValue?: (this: Binding, element: HTMLElement) => void;
  block?: boolean;
  function?: boolean;
  publishes?: boolean;
  priority?: number;
}

/**
 * A binder can be a one way binder or a two way binder
 */
export type Binder<ValueType> = IOneWayBinder<ValueType> | ITwoWayBinder<ValueType>;

/**
 * A list of binders with any key name
 */
export interface IModuleBinders<ValueType> {
  [name: string]: Binder<ValueType>;
}

/**
 * This wrapper i used to store the binder name in the name property
 */
export interface IModuleBinderWrapper {
  name: string;
  binder: Binder<any>;
}
