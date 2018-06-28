export type Scope = any;

export interface IComponent {
  template: string | (() => string) | (() => HTMLElement);
  initialize: (el: HTMLElement, data: any) => Scope;
}

export interface IComponents {
  [name: string]: IComponent;
}