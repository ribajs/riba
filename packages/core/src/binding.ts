import { PRIMITIVE, KEYPATH, parseType } from "./parsers";
import { Observer } from "./observer";
import {
  Binder,
  FormatterObservers,
  eventHandlerFunction,
  ObserverSyncCallback,
} from "./interfaces";
import { View } from "./view";
import { Utils } from "./services/utils";

/**
 *  A single binding between a model attribute and a DOM element.
 */
export class Binding {
  public static FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
  public static FORMATTER_SPLIT = /\s+/;

  public value?: any;
  public observer?: Observer;
  public view: View;
  public el: HTMLUnknownElement;
  /**
   * Name of the binder without the prefix
   */
  public type: string | null;
  public binder: Binder<any>;
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
    binder: Binder<any>,
    formatters: string[] | null,
    identifier: string | null
  ) {
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
  public formattedValue(value: any) {
    if (this.formatters === null) {
      throw new Error(`[${this.binder.name} formatters is null`);
    }

    return this.formatters.reduce((
      result: any /*check type*/,
      declaration: string,
      index: number
    ) => {
      const args = declaration.match(Binding.FORMATTER_ARGS);
      if (args === null) {
        console.warn(
          new Error(
            `[${this.binder.name}] No args matched with regex "FORMATTER_ARGS"!\nvalue: ${value}\nresult: ${result}\ndeclaration: ${declaration}\nindex: ${index}\n`
          )
        );
        return result;
      }
      const id = args.shift();

      if (!id) {
        throw new Error(`[${this.binder.name}] No formatter id found in args!`);
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

      return result;
    }, value);
  }

  /**
   * Returns an event handler for the binding around the supplied function.
   * Tihs event Handler is mainly used by the on-* binder
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
   * Publishes the value currently set on the input element back to the model.
   */
  public publish() {
    if (this.observer) {
      if (this.formatters === null) {
        throw new Error("formatters is null");
      }

      const value = this.formatters.reduceRight((
        result: any /*check type*/,
        declaration: string /*check type*/,
        index: number
      ) => {
        const args = declaration.split(Binding.FORMATTER_SPLIT);
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
      }, this.getValue(this.el));

      this.observer.setValue(value);
    }
  }

  /**
   * Subscribes to the model for changes at the specified keypath. Bi-directional
   * routines will also listen for changes on the element to propagate them back
   * to the model.
   */
  public bind() {
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
  public unbind() {
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
  public update(models: any = {}) {
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
  public getValue(el: HTMLElement) {
    if (this.binder === null) {
      throw new Error("binder is null");
    }
    if (typeof this.binder.getValue === "function") {
      return this.binder.getValue.call(this, el);
    } else {
      return Utils.getInputValue(el);
    }
  }

  private getStarArguments(identifier: string, type: string) {
    const args = new Array<string | number>();
    const regexp = new RegExp(`^${identifier.replace(/\*/g, ".+")}$`);
    if (
      !(regexp.test(type) && type.split("-")[0] === identifier.split("-")[0])
    ) {
      if (identifier !== "*") {
        console.error("Nodename not matchs the identifier,", identifier, type);
      }
    }

    const splittedIdentifier = identifier.split("*");
    // splittedIdentifier.pop();
    if (splittedIdentifier.length > 0) {
      // how many stars has the identifier?
      const starCount = splittedIdentifier.length - 1;
      if (starCount <= 1) {
        args.push(type.slice(identifier.length - 1));
      } else {
        /**
         * On more than one star this is a multi star binder
         * We split the identifier on each star and use the identifier pieces as a serperator
         */
        const subIdentifier = splittedIdentifier[0];
        let argsString = type.slice(subIdentifier.length);
        splittedIdentifier.forEach((separator, index) => {
          if (index > 0) {
            let arg: string | number = argsString.split(separator)[0];
            // the rest of the string
            if (index === splittedIdentifier.length - 1) {
              arg = argsString;
            }
            if (Utils.isNumber(arg)) {
              arg = Number(arg);
            }
            argsString = argsString.substring(
              argsString.indexOf(separator) + 1
            );
            args.push(arg);
          }
        });
      }
    }
    return args;
  }
}
