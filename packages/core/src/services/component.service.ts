import { Debug } from '../modules';
import { IClassicComponent, IComponentWrapperResult, IComponents } from '../interfaces';
import { RibaComponent } from '../components/riba-component';

export class ComponentService {

  public static type(component: IClassicComponent<any> | typeof RibaComponent): 'classic' | 'webcomponent' | undefined {
    if (component.hasOwnProperty('initialize') && component.hasOwnProperty('template')) {
      return 'classic';
    }

    if ((component as typeof RibaComponent).tagName) {
      return 'webcomponent';
    }

    return undefined;
  }

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
  public registWrapper(componentWrapper: IComponentWrapperResult<any>, name?: string): IComponents {
    if (!name) {
      name = componentWrapper.name;
    }
    const component = (componentWrapper as IComponentWrapperResult<any>);
    this.components[name] = component;
    return this.components;
  }

  /**
   * Regist a component with his name
   * @param component
   * @param name
   */
  public regist(component: IClassicComponent<any> | typeof RibaComponent, name?: string): IComponents {
    if (!name) {
      if (component.hasOwnProperty('name')) {
        name = (component as IClassicComponent<any>).name;
      }

      if (typeof((component as typeof RibaComponent).tagName) === 'string') {
        name = (component as typeof RibaComponent).tagName;
      }
    }

    this.debug('name', name, component);

    if (!name) {
      console.error(component);
      throw new Error('[ComponentService] name is required');
    }

    this.components[name] = component;
    return this.components;
  }

  /**
   * Regist a set of components
   * @param components
   */
  public regists(components: IComponents): IComponents {
    for (let name in components) {
      if (components.hasOwnProperty(name)) {
        const component = components[name];
        if (typeof((component as typeof RibaComponent).tagName) === 'string') {
          name = (component as typeof RibaComponent).tagName;
        }

        this.regist(component, name);
      }
    }

    return this.components;
  }
}
