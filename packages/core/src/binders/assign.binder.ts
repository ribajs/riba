import { Binder } from "../binder";
import type { Assign } from "../types/assign";
import { extend } from "@ribajs/utils/src/type";

/**
 * assign
 * Assign a value in your model.
 * The value you want to assign must be an object and will be concatenate with your model.
 * @example
 * <div rv-assign='{"newValue": "hello", "anotherNewValue": "world"}'>{newValue} {anotherNewValue}!</div>
 */
export class AssignBinder extends Binder<Assign, HTMLUnknownElement> {
  static key = "assign";
  routine(el: HTMLUnknownElement, value: any) {
    if (typeof value === "object") {
      return extend({ deep: false }, this.view.models, value);
    }
    console.warn("Value must be an object or propertyName is required");
  }
};
