import { IComponents } from '../interfaces';
import { Component } from '../components';
import { ModuleElementService } from './module-element.service';

export class ComponentService extends ModuleElementService {

  protected type: 'binder' | 'formatter' | 'components' | 'services' = 'components';

  /**
   *
   * @param components
   */
  constructor(components: IComponents) {
    super(components);
  }

  /**
   * Regist a component with his name
   * @param component
   * @param name
   */
  public regist(component: typeof Component, fallbackName?: string, forceFallback: boolean = false): IComponents {
    const name = forceFallback ? fallbackName || component.tagName : component.tagName || fallbackName;

    if (!name) {
      console.warn(new Error('Component name not found!'), component);
      return this.elements;
    }

    this.elements[name] = component;
    return this.elements;
  }

}
