import { Binder } from "../interfaces";
import { Utils } from "../services/utils";

export interface Assign {
  key: string;
  value: any;
}

/**
 * assign
 * Assign a value in your model.
 * The value you want to assign must be an object and will be concatenate with your model.
 * @example
 * <div rv-assign='{"newValue": "hello", "anotherNewValue": "world"}'>{newValue} {anotherNewValue}!</div>
 */
export const assignBinder: Binder<Assign> = {
  name: "assign",
  routine(el: HTMLElement, value: object) {
    if (typeof value === "object") {
      return Utils.extend(false, this.view.models, value);
    }
    console.warn("Value must be an object or propertyName is required");
  },
};
