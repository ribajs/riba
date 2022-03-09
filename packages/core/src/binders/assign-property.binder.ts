import { Binder } from "../binder.js";
import { camelCase } from "@ribajs/utils/src/type.js";

/**
 * assign-*
 * Assign a value in your model.
 * Sets or overwrites a value by his property name (named whatever value is in place of [property]) in your model.
 * @example
 * <div rv-assign-new='"hello"'>{new}</div>
 */
export class AssignPropertyBinder extends Binder<any, HTMLUnknownElement> {
  static key = "assign-*";
  routine(el: HTMLUnknownElement, value: any) {
    const propertyName = camelCase((this.args[0] as string).trim());
    const obj: any = {};
    obj[propertyName] = value;
    this.view.models[propertyName] = value;
  }
}
