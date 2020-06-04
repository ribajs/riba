import { Binder } from "../interfaces";
import { camelCase } from "@ribajs/utils/src/type";

/**
 * assign-*
 * Assign a value in your model.
 * Sets or overwrites a value by his property name (named whatever value is in place of [property]) in your model.
 * @example
 * <div rv-assign-new='"hello"'>{new}</div>
 */
export const assignPropertyBinder: Binder<any> = {
  name: "assign-*",
  routine(el: HTMLElement, value: any) {
    const propertyName = camelCase((this.args[0] as string).trim());
    const obj: any = {};
    obj[propertyName] = value;
    this.view.models[propertyName] = value;
  },
};
