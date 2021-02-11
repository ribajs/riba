import { Formatter } from "../../interfaces";

/**
 * Calls a function by name with arguments
 * @param object The object that contains the function you wish to call
 * @param name The name of the function you wish to call
 * @param args the parameters you wish to call the function with
 */
export const callNameFormatter: Formatter = {
  name: "call-name",
  read: function (object: any, name: string, ...args: any[]) {
    return object[name](...args);
  },
};
