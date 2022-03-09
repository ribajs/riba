import { parseType } from "./parse-type.js";
import { PRIMITIVE, KEYPATH } from "./constants/parser.js";
import { Observer } from "./observer.js";
import type {
  FormatterObservers,
  eventHandlerFunction,
  ObserverSyncCallback,
  Bindable,
} from "./types/index.js";
import { FORMATTER_ARGS, FORMATTER_SPLIT } from "./constants/formatter.js";
import type { View } from "./view.js";
import { getInputValue } from "@ribajs/utils/src/dom.js";

/**
 * A single binding between a model attribute and a DOM element.
 */
export abstract class Binder<T = any, E = HTMLUnknownElement>
  implements Bindable<E>
{
  /**
   * The name of the binder to access the binder by
   */
  static key = "";

  /**
   * Blocks the current node and child nodes from being parsed (used for iteration binding as well as the if/unless binders).
   */
  static block = false;

  /**
   * Key of the Binder
   */
  name: string;

  /**
   * Set this to true if you want view.publish() to call publish on these bindings.
   */
  publishes = false;
  /**
   * Priority of the binder, binders with higher priority are applied first
   */
  priority = 0;

  /**
   * The routine function is called when an observed attribute on the model changes and is used to update the DOM. When defining a one-way binder as a single function, it is actually the routine function that you're defining.
   */
  abstract routine(element: E, value: T): void;

  /**
   * This function will get called for this binding on the initial `view.bind()`. Use it to store some initial state on the binding, or to set up any event listeners on the element.
   */
  bind?(element: E): void;

  /**
   * This function will get called for this binding on `view.unbind()`. Use it to reset any state on the element that would have been changed from the routine getting called, or to unbind any event listeners on the element that you've set up in the `binder.bind` function.
   */
  unbind?(element: E): void;

  /**
   * Updates the binding's model from what is currently set on the view.
   * Unbinds the old model first and then re-binds with the new model.
   */
  update?(model: any): void;

  /**
   * The getValue function is called when the binder wants to set the value on the model. This function takes the HTML element as only parameter
   */
  getValue?(element: E): void;

  public value?: any;
  public observer?: Observer;
  public view: View;
  public el: E;

  /**
   * Name of the binder without the prefix
   */
  public type: string | null;
  public formatters: string[] | null;
  public formatterObservers: FormatterObservers = {};
  public keypath?: string;

  /**
   * Arguments parsed from star binders, e.g. on foo-*-* args[0] is the first star, args[1] the second-
   */
  public args: Array<string | number>;

  /**
   *
   */
  public model?: any;

  /**
   * HTML Comment to mark a binding in the DOM
   */
  public marker?: Comment;

  /**
   * All information about the binding is passed into the constructor; the
   * containing view, the DOM node, the type of binding, the model object and the
   * keypath at which to listen for changes.
   * @param {*} view
   * @param {*} el
   * @param {*} type
   * @param {*} keypath
   * @param {*} binder
   * @param {*} args The start binders, on `class-*` args[0] wil be the classname.
   * @param {*} formatters
   */
  constructor(
    view: View,
    el: E,
    type: string | null,
    name: string,
    keypath: string | undefined,
    formatters: string[] | null,
    identifier: string | null
  ) {
    this.view = view;
    this.el = el;
    this.type = type;
    this.name = name;
    this.keypath = keypath;
    this.formatters = formatters;
    this.model = undefined;

    if (identifier && type) {
      this.args = this.getStarArguments(identifier, type);
    } else {
      this.args = new Array<string | number>();
    }
  }

  /**
   * Observes the object keypath
   * @param obj
   * @param keypath
   */
  public observe(
    obj: any,
    keypath: string,
    callback: ObserverSyncCallback
  ): Observer {
    return new Observer(obj, keypath, callback);
  }

  public parseTarget() {
    if (this.keypath) {
      const token = parseType(this.keypath);
      if (token.type === PRIMITIVE) {
        this.value = token.value;
      } else if (token.type === KEYPATH) {
        this.observer = this.observe(this.view.models, this.keypath, this);
        this.model = this.observer.target;
      } else {
        throw new Error(`[${this.name}] Unknown type in token`);
      }
    } else {
      this.value = undefined;
    }
  }

  /**
   * Get the iteration alias, used in the interation binders like `each-*`
   * @param {*} modelName
   * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L26
   * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L1175
   */
  public getIterationAlias(modelName: string) {
    return "%" + modelName + "%";
  }

  public parseFormatterArguments(
    args: string[],
    formatterIndex: number
  ): string[] {
    return args.map(parseType).map(({ type, value }, ai) => {
      if (type === PRIMITIVE) {
        const primitiveValue = value;
        return primitiveValue;
      } else if (type === KEYPATH) {
        // keypath is string
        const keypath = value as string;
        if (!this.formatterObservers[formatterIndex]) {
          this.formatterObservers[formatterIndex] = {};
        }

        let observer = this.formatterObservers[formatterIndex][ai];

        if (!observer) {
          observer = this.observe(this.view.models, keypath, this);
          this.formatterObservers[formatterIndex][ai] = observer;
        }
        return observer.value();
      } else {
        throw new Error(`[${this.name}] Unknown argument type`);
      }
    });
  }

  /**
   * Applies all the current formatters to the supplied value and returns the
   * formatted value.
   */
  public formattedValue(value: any, startIndex = 0): any {
    if (this.formatters === null) {
      throw new Error(`[${this.name} formatters is null`);
    }

    // If any intermediate result is a promise continue the chain (with startIndex set) after it is resolved.
    let promised = false;
    const formatters = startIndex
      ? this.formatters.slice(startIndex)
      : this.formatters;

    return formatters.reduce(
      (result: any, declaration: string, index: number) => {
        if (promised) {
          return result;
        }

        const args = declaration.match(FORMATTER_ARGS);
        if (args === null) {
          console.warn(
            new Error(
              `[${
                this.name
              }] No args matched with regex "FORMATTER_ARGS"!\nvalue: ${JSON.stringify(
                value
              )}\nresult: ${JSON.stringify(
                result
              )}\ndeclaration: ${JSON.stringify(
                declaration
              )}\nindex: ${index}\n`
            )
          );
          return result;
        }
        const id = args.shift();

        if (!id) {
          throw new Error(`[${this.name}] No formatter id found in args!`);
        }

        if (!this.view.options.formatters) {
          throw new Error(`[${this.name}] No formatters are defined!`);
        }

        const formatter = this.view.options.formatters[id];

        if (!formatter) {
          throw new Error(
            `[${this.name}] No formatters with id "${id}" found!`
          );
        }

        const processedArgs = this.parseFormatterArguments(args, index);

        // get formatter read funcion
        if (formatter && typeof formatter.read === "function") {
          result = formatter.read.apply(this.model, [result, ...processedArgs]);
        }

        // If result is a promise, and this is not the last formatter in the chain
        if (
          index < formatters.length - 1 &&
          result &&
          typeof result.then === "function" &&
          typeof result.catch === "function"
        ) {
          promised = true;
          return result.then((value: any) =>
            this.formattedValue(value, index + 1)
          );
        }
        return result;
      },
      value
    );
  }

  /**
   * Returns an event handler for the binding around the supplied function.
   * This event Handler is mainly used by the on-* binder
   * @param fn The function to call by the handler
   * @param el The element the event was triggered from
   */
  public eventHandler(
    fn: eventHandlerFunction,
    el: HTMLElement
  ): (ev: Event) => any {
    const handler = this.view.options.handler;
    return (ev) => {
      if (!handler) {
        throw new Error("No handler defined in binding.view.options.handler");
      }
      handler.call(fn, this, ev, this, el);
    };
  }

  /**
   * Sets the value for the binding. This Basically just runs the binding routine
   * with the supplied value formatted.
   */
  public set(value: any) {
    try {
      value = this.formattedValue(value);
    } catch (error) {
      console.error(error);
      return value;
    }

    if (typeof this.routine === "function") {
      // If value is a promise
      if (
        value &&
        typeof value.then === "function" &&
        typeof value.catch === "function"
      ) {
        value
          .then((realValue: any) => {
            this.routine(this.el, realValue);
          })
          .catch((error: Error) => {
            console.error(error);
          });
      } else {
        this.routine(this.el, value);
      }
    }
  }

  /**
   * Syncs up the view binding with the model.
   */
  public sync() {
    if (this.observer) {
      this.model = this.observer.target;
      this.set(this.observer.value());
    } else {
      this.set(this.value);
    }
  }

  /**
   * Publishes the value currently set on the input element (or any other which implements getValue) back to the model.
   * An example of the use of this method are the following binders:
   * - ElementBinder
   * - ValueBinder
   * - (Un)CheckedBinder
   */
  public publish() {
    if (this.observer) {
      if (this.formatters === null) {
        throw new Error("formatters is null");
      }

      const value = this.formatters.reduceRight(
        (
          result: any /*check type*/,
          declaration: string /*check type*/,
          index: number
        ) => {
          const args = declaration.split(FORMATTER_SPLIT);
          const id = args.shift();
          if (!id) {
            throw new Error("id not defined");
          }

          if (!this.view.options.formatters) {
            return undefined;
          }

          const formatter = this.view.options.formatters[id];
          const processedArgs = this.parseFormatterArguments(args, index);

          if (formatter && typeof formatter.publish === "function") {
            result = formatter.publish(result, ...processedArgs);
          }
          return result;
        },
        this._getValue(this.el)
      );

      this.observer.setValue(value);
    }
  }

  /**
   * Subscribes to the model for changes at the specified keypath. Bi-directional
   * routines will also listen for changes on the element to propagate them back
   * to the model.
   */
  public _bind() {
    this.parseTarget();

    if (this.bind) {
      if (typeof this.bind !== "function") {
        throw new Error("the method bind is not a function");
      }
      this.bind(this.el);
    }

    if (this.view.options.preloadData) {
      this.sync();
    }
  }

  /**
   * Unsubscribes from the model and the element.
   */
  public _unbind() {
    if (this.unbind) {
      this.unbind(this.el);
    }

    if (this.observer) {
      this.observer.unobserve();
    }

    Object.keys(this.formatterObservers).forEach((fi) => {
      const args = this.formatterObservers[fi];

      Object.keys(args).forEach((ai) => {
        args[ai].unobserve();
      });
    });

    this.formatterObservers = {};
  }

  /**
   * Updates the binding's model from what is currently set on the view. Unbinds
   * the old model first and then re-binds with the new model.
   * @param {any} models
   */
  public _update(models: any = {}) {
    if (this.observer) {
      this.model = this.observer.target;
    }
    if (typeof this.update === "function") {
      this.update(models);
    }
  }

  /**
   * Returns elements value
   * @param el
   */
  public _getValue(el: E) {
    if (typeof this.getValue === "function") {
      return this.getValue(el);
    } else {
      return getInputValue(el as any);
    }
  }

  protected getStarArguments(identifier: string, type: string): string[] {
    const regexp = this.view.binderRegex(identifier);
    const match = type.match(regexp)?.slice(1) || [];
    return match;
  }
}
