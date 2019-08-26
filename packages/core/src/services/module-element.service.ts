import { Debug } from '../vendors';
import { Utils } from './utils';

export type Element = any;

export interface IElements {
  [key: string]: Element;
}

export abstract class ModuleElementService {
  protected elements: IElements;

  protected abstract type: 'binder' | 'formatter' | 'components' | 'services';

  protected debug = Debug('services:ModuleElementService');

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
        this.debug(`Regist ${this.type} with key "${key}"`, element);
        this.regist(element);
      }
    }
    return this.elements;
  }
}
