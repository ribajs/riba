import { PRIMITIVE, KEYPATH, parseType } from './parsers';
import { Observer, IObserverSyncCallback } from './observer';
import { Binder, IOneWayBinder, ITwoWayBinder } from './binder.service';
import { View } from './view';
import { getInputValue } from './utils';
import { IOneTwoFormatter } from './formatter.service';

export interface IBindable {

  binder?: Binder<any>;

  /**
   * Name of the binder without the prefix
   */
  type: string | null;

  el: HTMLElement;

  /**
   * Observes the object keypath
   * @param obj
   * @param keypath
   */
  observe(obj: any, keypath: string, callback: IObserverSyncCallback): Observer;

  /**
   * Subscribes to the model for changes at the specified keypath. Bi-directional
   * routines will also listen for changes on the element to propagate them back
   * to the model.
   */
  bind(): void;

  /**
   * Unsubscribes from the model and the element.
   */
  unbind(): void;

  /**
   * Updates the binding's model from what is currently set on the view. Unbinds
   * the old model first and then re-binds with the new model.
   * @param {any} models
   */
  update?(models: any): void;

  publish?(): void;

  sync?(): void;
}

export interface IFormatterObservers {
  [key: string]: {
    [key: string]: Observer,
  };
}

export type eventHandlerFunction = (event: Event) => void;

/**
 *  A single binding between a model attribute and a DOM element.
 */
export class Binding implements IBindable {

  public static FORMATTER_ARGS =  /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
  public static FORMATTER_SPLIT = /\s+/;

  public value?: any;
  public observer?: Observer;
  public view: View;
  public el: HTMLElement;
  /**
   * Name of the binder without the prefix
   */
  public type: string | null;
  public binder: Binder<any>;
  public formatters: string[] | null;
  public formatterObservers: IFormatterObservers = {};
  public keypath?: string;
  /**
   * Arguments parsed from star binders, e.g. on foo-*-* args[0] is the first star, args[1] the second-
   */
  public args: string[] | null;
  /**
   *
   */
  public model?: any;
  /**
   * HTML Comment to mark a binding in the DOM
   */
  public marker?: Comment;
  /**
   * Used in component bindings. TODO e.g. move to ComponentBinding or binders?
   */
  public _bound?: boolean;
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
  constructor(view: View, el: HTMLElement, type: string | null, keypath: string | undefined, binder: Binder<any>, args: string[] | null, formatters: string[] | null) {
    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.binder = binder;
    this.args = args;
    this.formatters = formatters;
    this.model = undefined;
    this.customData = {};

  }

  /**
   * Observes the object keypath
   * @param obj
   * @param keypath
   */
  public observe(obj: any, keypath: string, callback: IObserverSyncCallback): Observer {
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
        throw new Error('Unknown type in token');
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
    return '%' + modelName + '%';
  }

  public parseFormatterArguments(args: string[], formatterIndex: number): string[] {
    return args
    .map(parseType)
    .map(({type, value}, ai) => {
      if (type === PRIMITIVE) {
        const primitiveValue = value;
        return primitiveValue;
      } else if (type === KEYPATH) {
        // keypath is string
        const keypath = (value as string );
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
        throw new Error('Unknown argument type');
      }
    });
  }

  /**
   * Applies all the current formatters to the supplied value and returns the
   * formatted value.
   */
  public formattedValue(value: any) {
    if (this.formatters === null) {
      throw new Error('formatters is null');
    }

    return this.formatters.reduce((result: any/*check type*/, declaration: string /*check type*/, index: number) => {
      const args = declaration.match(Binding.FORMATTER_ARGS);
      if (args === null) {
        throw new Error('No args matched from FORMATTER_ARGS');
      }
      const id = args.shift();
      if (!id) {
        throw new Error('No id found in args');
      }

      if (!this.view.options.formatters) {
        throw new Error('No formatters are defined');
      }

      const formatter = this.view.options.formatters[id];

      const processedArgs = this.parseFormatterArguments(args, index);

      let formatterReadFunction;

      // get formatter read funcion
      if (formatter && (formatter.read instanceof Function)) {
        formatterReadFunction = formatter.read;
      } else if (formatter instanceof Function) {
        formatterReadFunction = formatter;
      }

      if (formatterReadFunction instanceof Function) {
        result = formatterReadFunction.apply(this.model, [result, ...processedArgs]);
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
  public eventHandler(fn: eventHandlerFunction, el: HTMLElement): (ev: Event) => any {
    const binding = this;
    const handler = binding.view.options.handler;
    return (ev) => {
      if (!handler) {
        throw new Error('No handler defined in binding.view.options.handler');
      }
      handler.call(fn, this, ev, binding, el);
    };
  }

  /**
   * Sets the value for the binding. This Basically just runs the binding routine
   * with the supplied value formatted.
   */
  public set(value: any) {
    /*
     * Since 0.9 : doesn't execute functions unless backward compatibility is active
     * @see https://github.com/mikeric/rivets/blob/master/src/bindings.coffee#L87
     */
    if ((value instanceof Function) && !(this.binder as ITwoWayBinder<any> ).function && this.view.options.executeFunctions) {
      // formatter is a function
      value = this.formattedValue(value.call(this.model));
    } else {
      value = this.formattedValue(value);
    }

    let routineFn;
    if (this.binder === null) {
      throw new Error('binder is null');
    }
    if (this.binder.hasOwnProperty('routine')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      routineFn = this.binder.routine;
    } else {
      this.binder = ( this.binder as IOneWayBinder<any>);
      routineFn = this.binder;
    }

    if (routineFn instanceof Function) {
      routineFn.call(this, this.el, value);
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
  public publish(forceValue?: any) {
    if (this.observer) {
      if (this.formatters === null) {
        throw new Error('formatters is null');
      }

      const value = this.formatters.reduceRight((result: any/*check type*/, declaration: string /*check type*/, index: number) => {
        const args = declaration.split(Binding.FORMATTER_SPLIT);
        const id = args.shift();
        if (!id) {
          throw new Error('id not defined');
        }

        if (!this.view.options.formatters) {
          return undefined;
        }

        const formatter = this.view.options.formatters[id];
        const processedArgs = this.parseFormatterArguments(args, index);

        if (formatter && (formatter as IOneTwoFormatter).publish) {
          result = (formatter as IOneTwoFormatter).publish(result, ...processedArgs);
        }
        return result;
      }, this.getValue((this.el as HTMLInputElement)));

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

    if (this.binder && this.binder.hasOwnProperty('bind')) {
      this.binder = (this.binder as ITwoWayBinder<any>);
      if (!this.binder.bind && typeof(this.binder.bind) !== 'function') {
        throw new Error('the method bind is not a function');
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
    if (this.binder === null) {
      throw new Error('binder is null');
    }
    if (this.binder.hasOwnProperty('bind')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      if (this.binder.unbind) {
        this.binder.unbind.call(this, this.el);
      }
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
      throw new Error('binder is null');
    }
    if (this.binder.hasOwnProperty('update')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      if (this.binder.update) {
        this.binder.update.call(this, models);
      }
    }
  }

  /**
   * Returns elements value
   * @param el
   */
  public getValue(el: HTMLSelectElement | HTMLInputElement) {
    if (this.binder === null) {
      throw new Error('binder is null');
    }
    if (this.binder.hasOwnProperty('getValue')) {
      this.binder = ( this.binder as ITwoWayBinder<any>);
      if (typeof(this.binder.getValue) !== 'function') {
        throw new Error('getValue is not a function');
      }
      return this.binder.getValue.call(this, el);
    } else {
      return getInputValue(el);
    }
  }
}
