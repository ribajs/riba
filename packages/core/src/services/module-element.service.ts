import { Utils } from './utils';

export type Element = any;

export interface IElements {
  [key: string]: Element;
}

export abstract class ModuleElementService {
  protected elements: IElements;

  protected abstract type: 'binder' | 'formatter' | 'components' | 'services';

  /**
   *
   * @param elements;
   */
  constructor(elements: IElements) {
    this.elements = elements;
  }

  /**
   * Regist a element
   * @param element
   * @param name  Overwrites the name to access the element over
   */
  public abstract regist(element: Element, name?: string): IElements;

  /**
   * Regist a set / array of elements
   * @param elements
   */
  public regists(elements: IElements): IElements {
    if (!Utils.isObject(elements)) {
      throw new Error('Elements to register must be an object of elements');
    }
    for (const key in elements) {
      if (elements.hasOwnProperty(key) && key !== '__esModule') {
        const element = elements[key];
        this.regist(element, key);
      }
    }
    return this.elements;
  }
}
