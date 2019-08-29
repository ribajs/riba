"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets arguments to a function without directly call them
 * ```html
 * <button rv-on-click="sum | args 1 2"></button>
 * ```
 * @param fn The function the event handler should call
 * @param fnArgs the parameters you wish to get called the function with
 */
exports.args = {
    name: 'args',
    read(fn, ...fnArgs) {
        return (event, scope, el, binding) => {
            // append the event handler args to passed args
            fnArgs.push(event);
            fnArgs.push(scope);
            fnArgs.push(el);
            fnArgs.push(binding);
            return fn.apply(this, fnArgs);
        };
    },
};
