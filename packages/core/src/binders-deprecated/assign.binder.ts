import { BinderDeprecated } from "../types";
import { extend } from "@ribajs/utils/src/type";

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
export const assignBinder: BinderDeprecated<Assign> = {
  name: "assign",
  routine(el: HTMLElement, value: any) {
    if (typeof value === "object") {
      return extend({ deep: false }, this.view.models, value);
    }
    console.warn("Value must be an object or propertyName is required");
  },
};
