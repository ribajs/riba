import { Binding } from '../binding';

export interface IBindableElement extends HTMLUnknownElement {
  _bound?: boolean;
}
/**
 * A one way or to way binder interface
 */
export interface IBinder<ValueType> {
  routine: (this: Binding, element: HTMLUnknownElement, value: ValueType) => void;
  bind?: (this: Binding, element: HTMLUnknownElement) => void;
  unbind?: (this: Binding, element: HTMLUnknownElement) => void;
  update?: (this: Binding, model: any) => void;
  getValue?: (this: Binding, element: HTMLUnknownElement) => void;
  /**
   * The name of the binder to access the binder by
   */
  name: string;
  block?: boolean;
  function?: boolean;
  publishes?: boolean;
  priority?: number;
}

/**
 * A list of binders with any key name
 */
export interface IModuleBinders<ValueType> {
  [name: string]: IBinder<ValueType>;
}

/**
 * This wrapper is used if you need to pass over some dependencies for your binder
 */
export type BinderWrapper<ValueType> = (...deps: any[]) => IBinder<ValueType>;
