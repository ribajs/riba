import { Debug } from '../modules';
import { IComponents } from '../interfaces';
import { AbstractRibaComponent } from '../components';

export class ComponentService {

  private components: IComponents;
  private debug = Debug('components:ComponentService');

  /**
   *
   * @param components
   */
  constructor(components: IComponents) {
    this.components = components;
  }

  /**
   * Regist a component wrapper
   * @param ComponentWrapper
   * @param name
   */
  public registWrapper(componentWrapper: typeof AbstractRibaComponent): IComponents {
    this.components[componentWrapper.tagName] = componentWrapper;
    return this.components;
  }

  /**
   * Regist a component with his name
   * @param component
   * @param name
   */
  public regist(component: typeof AbstractRibaComponent): IComponents {
    this.debug('name', name, component);
    this.components[component.tagName] = component;
    return this.components;
  }

  /**
   * Regist a set of components
   * @param components
   */
  public regists(components: IComponents): IComponents {
    for (const tagName in components) {
      if (components.hasOwnProperty(tagName)) {
        const component = components[tagName];
        this.regist(component);
      }
    }

    return this.components;
  }
}
