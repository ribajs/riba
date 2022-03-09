import { Components, ModuleElementType } from "../types/index.js";
import { Component } from "../component/index.js";
import { ModuleElementService } from "./module-element.service.js";

export class ComponentService extends ModuleElementService {
  protected type: ModuleElementType = "components";

  /**
   *
   * @param components
   */
  constructor(components: Components) {
    super(components);
  }

  /**
   * Regist a component with his name
   * @param component
   * @param name
   */
  public regist(
    component: typeof Component,
    fallbackName?: string,
    forceFallback = false
  ): Components {
    const name = forceFallback
      ? fallbackName || component.tagName
      : component.tagName || fallbackName;

    if (!name) {
      console.warn(new Error("Component name not found!"), component);
      return this.elements;
    }

    this.elements[name] = component;
    return this.elements;
  }
}
