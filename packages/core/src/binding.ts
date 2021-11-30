import { PRIMITIVE, KEYPATH, parseType } from "./parsers";
import { Observer } from "./observer";
import {
  BinderDeprecated,
  FormatterObservers,
  eventHandlerFunction,
  ObserverSyncCallback,
  Bindable,
} from "./types";
import { FORMATTER_ARGS, FORMATTER_SPLIT } from "./constants/formatter";
import { View } from "./view";
import { getInputValue } from "@ribajs/utils/src/dom";

/**
 * A single binding between a model attribute and a DOM element.
 * @deprecated
 */
export class Binding implements Bindable {
  public value?: any;
  public observer?: Observer;
  public view: View;
  public el: HTMLUnknownElement;
  /**
   * Name of the binder without the prefix
   */
  public type: string | null;
  public binder: BinderDeprecated<any>;
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
   * just to have a value where we could store custom data
   */
  public customData?: any;

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
    el: HTMLUnknownElement,
    type: string | null,
    keypath: string | undefined,
    binder: BinderDeprecated<any>,
    formatters: string[] | null,
    identifier: string | null
  ) {
    console.warn(
      `[Binding][${type}] Binding objects are deprecated, Binding objects are deprecated, please use a binding class instead`
    );
    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.binder = binder;
    this.formatters = formatters;
    this.model = undefined;
    this.customData = {};

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
        throw new Error(`[${this.binder.name}] Unknown type in token`);
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
        throw new Error(`[${this.binder.name}] Unknown argument type`);
      }
    });
  }

  /**
   * Applies all the current formatters to the supplied value and returns the
   * formatted value.
   */
  public formattedValue(value: any, startIndex = 0): any {
    if (this.formatters === null) {
      throw new Error(`[${this.binder.name} formatters is null`);
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
                this.binder.name
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
          throw new Error(
            `[${this.binder.name}] No formatter id found in args!`
          );
        }

        if (!this.view.options.formatters) {
          throw new Error(`[${this.binder.name}] No formatters are defined!`);
        }

        const formatter = this.view.options.formatters[id];

        if (!formatter) {
          throw new Error(
            `[${this.binder.name}] No formatters with id "${id}" found!`
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const binding = this;
    const handler = binding.view.options.handler;
    return (ev) => {
      if (!handler) {
        throw new Error("No handler defined in binding.view.options.handler");
      }
      handler.call(fn, this, ev, binding, el);
    };
  }

  /**
   * Sets the value for the binding. This Basically just runs the binding routine
   * with the supplied value formatted.
   */
  public set(value: any) {
    if (this.binder === null) {
      console.warn(new Error("Binder is null"), this);
      return;
    }

    try {
      value = this.formattedValue(value);
    } catch (error) {
      console.error(error);
      return value;
    }

    if (this.binder && typeof this.binder.routine === "function") {
      // If value is a promise
      if (
        value &&
        typeof value.then === "function" &&
        typeof value.catch === "function"
      ) {
        value
          .then((realValue: any) => {
            this.binder.routine.call(this, this.el, realValue);
          })
          .catch((error: Error) => {
            console.error(error);
          });
      } else {
        this.binder.routine.call(this, this.el, value);
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
   * Publishes the value currently set on the input element (or any other wich implements getValue) back to the model.
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

    if (this.binder && this.binder.bind) {
      if (typeof this.binder.bind !== "function") {
        throw new Error("the method bind is not a function");
      }
      this.binder.bind.call(this, this.el);
    }

    if (this.view.options.preloadData) {
      this.sync();
    }
  }

  /**
   * Unsubscribes from the model and the element.
   */
  public _unbind() {
    if (!this.binder) {
      console.warn(new Error("Binder is not defined"), this);
      return;
    }

    if (this.binder.unbind) {
      this.binder.unbind.call(this, this.el);
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
    if (this.binder === null) {
      throw new Error("binder is null");
    }
    if (typeof this.binder.update === "function") {
      this.binder.update.call(this, models);
    }
  }

  /**
   * Returns elements value
   * @param el
   */
  public _getValue(el: HTMLElement) {
    if (this.binder === null) {
      throw new Error("binder is null");
    }
    if (typeof this.binder.getValue === "function") {
      return this.binder.getValue.call(this, el);
    } else {
      return getInputValue(el);
    }
  }

  private getStarArguments(identifier: string, type: string): string[] {
    const regexp = new RegExp(`^${identifier.replace(/\*/g, "(.+)")}$`);
    const match = type.match(regexp);
    return (match && match.slice(1)) || [];
  }
}
