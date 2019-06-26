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
  block?: boolean;
  function?: boolean;
  publishes?: boolean;
  priority?: number;
}

/**
 * A list of binders with any key name
 */
export interface IModuleBinders<ValueType> {
  [name: string]: IBinder<any>;
}

/**
 * This wrapper i used to store the binder name in the name property
 */
export interface IModuleBinderWrapper {
  name: string;
  binder: IBinder<any>;
}
