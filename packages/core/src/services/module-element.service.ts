import { isObject } from "@ribajs/utils/src/type";
import { ModuleElementType, Elements } from "../types";

export abstract class ModuleElementService<T = any> {
  protected elements: Elements<T>;

  protected abstract type: ModuleElementType;

  /**
   *
   * @param elements;
   */
  constructor(elements: Elements) {
    this.elements = elements;
  }

  /**
   * Regist a element
   * @param element
   * @param name  Overwrites the name to access the element over
   */
  public abstract regist(element: T, name?: string): Elements;

  /**
   * Regist a set / array of elements
   * @param elements
   */
  public regists(elements: Elements): Elements {
    if (!isObject(elements)) {
      throw new Error("Elements to register must be an object of elements");
    }
    for (const key in elements) {
      if (elements[key] && key !== "__esModule") {
        const element = elements[key];
        this.regist(element, key);
      }
    }
    return this.elements;
  }
}
