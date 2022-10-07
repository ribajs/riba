import { isObject } from "@ribajs/utils/src/type.js";
import { ModuleElementType, Elements } from "../types/index.js";

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
  public abstract register(element: T, name?: string): Elements;

  /**
   * Regist a set / array of elements
   * @param elements
   */
  public registerAll(elements: Elements): Elements {
    if (!isObject(elements)) {
      throw new Error("Elements to register must be an object of elements");
    }
    for (const key in elements) {
      if (elements[key] && key !== "__esModule") {
        const element = elements[key];
        this.register(element, key);
      }
    }
    return this.elements;
  }
}
