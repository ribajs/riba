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
  public regist(component: typeof Component): IComponents {
    this.elements[component.tagName] = component;
    return this.elements;
  }

}
