import type { Formatter } from "../../types/index.js";
import { FormatterFuntionParam } from "./call.formatter.js";
import { Binder } from "../../binder";

/**
 * Sets arguments to a function without directly call them
 * ```html
 * <button rv-on-click="sum | args 1 2"></button>
 * ```
 * @param fn The function the event handler should call
 * @param fnArgs the parameters you wish to get called the function with
 */
export const argsFormatter: Formatter = {
  name: "args",
  read(fn: FormatterFuntionParam, ...fnArgs: any[]) {
    return (event: Event, scope: any, el: HTMLElement, binder: Binder) => {
      // append the event handler args to passed args
      fnArgs.push(event);
      fnArgs.push(scope);
      fnArgs.push(el);
      fnArgs.push(binder);
      return fn.apply(this, fnArgs);
    };
  }
};
