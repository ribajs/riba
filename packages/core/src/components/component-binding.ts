import { IOptionsParam, IViewOptions } from '../riba';
import { PRIMITIVE, KEYPATH, parseType, parseDeclaration } from '../parsers';
import { IFormatterObservers, IBindable } from '../binding';
import { IBinders } from '../binder.service';
import { IFormatters } from '../formatter.service';
import { View } from '../view';
import { IClassicComponent, IComponents } from './component.service';
import { Observer, IObservers, IObserverSyncCallback } from '../observer';
import { IAdapters } from '../adapter';
import { Utils, camelCase } from '../utils';

export interface IBoundElement extends HTMLElement {
  _bound?: boolean;
}

export interface IFormattersObservers {
  [propertyName: string]: IFormatterObservers;
}

export interface IKeypaths {
  [propertyName: string]: string;
}

/**
 * component view encapsulated as a binding within it's parent view.
 */
export class ComponentBinding implements IBindable {
  public view: View;
  public el: IBoundElement;
  public type: string;
  public component: IClassicComponent<any>;
  /**
   * static values (PRIMITIVE Attributes)
   */
  public static: {[key: string]: any} = {};
  /**
   * keypath values (KEYPATH Attributes)
   */
  public keypaths: IKeypaths = {};
  public formattersObservers: IFormattersObservers = {};
  public observers: IObservers;
  public bindingPrefix: string; // = riba.fullPrefix;
  public pipes: any = {};

  /**
   * Initializes a component binding for the specified view. The raw component
   * element is passed in along with the component type. Attributes and scope
   * inflections are determined based on the components defined attributes.
   *
   * @param view
   * @param el
   * @param type
   */
  constructor(view: View, el: HTMLElement, type: string) {
    if (!view.options.components) {
      throw new Error('No components found!');
    }
    this.view = view;
    this.el = el;
    this.type = type;
    this.component = (view.options.components[this.type] as IClassicComponent<any>);
    this.static = {};
    this.observers = {};
    this.bindingPrefix = view.options.prefix + '-'; // TODO
    this.parseTarget();
    this.sync();
  }

  /**
   * Observes the object keypath
   * @param obj
   * @param keypath
   */
  public observe(obj: any, keypath: string, callback: IObserverSyncCallback): Observer {
    return new Observer(obj, keypath, callback);
  }

  /**
   * Updates the values in model when the observer calls this function
   * Only sync value if it is marked as bind
   */
  public sync() {
    Object.keys(this.static).forEach((propertyName) => {
      if (this.component.bind && this.component.bind.indexOf(propertyName) !== -1) {
        (this as any)[propertyName] = this.static[propertyName];
        // (this as any)[key] = this.formattedValues(this.static[key], key);
      }
    });

    Object.keys(this.observers).forEach((propertyName) => {
      if (this.component.bind && this.component.bind.indexOf(propertyName) !== -1) {
        (this as any)[propertyName] = this.observers[propertyName].value();
        // (this as any)[propertyName] = this.formattedValues(this.observers[propertyName].value(), propertyName);
      }
    });
  }

  /**
   * Publishes the value currently set on the model back to the parent model.
   * You need to call this method manually in your component
   */
  public publish(propertyName?: string, value?: any) {
    if (propertyName) {
      if (this.observers[propertyName]) {
        this.observers[propertyName].setValue(value);
      }
    }
  }

  /**
   * Returns an object map using the component's scope inflections.
   */
  public locals() {
    const result: any = {};
    Object.keys(this.static).forEach((key) => {
      result[key] = this.static[key];
    });

    Object.keys(this.observers).forEach((key) => {
      result[key] = this.observers[key].value();
    });
    return result;
  }

  public getMergedOptions() {
    const options: IOptionsParam = {
      // EXTENSIONS
      adapters: <IAdapters> Object.create(null),
      binders: <IBinders<any>> Object.create(null),
      components: <IComponents> Object.create(null),
      formatters: <IFormatters> Object.create(null),

      // other
      starBinders: Object.create(null),

      // sightglass
      rootInterface: Object.create(null),
    };

    if (this.component.binders) {
      options.binders = Utils.concat(false, options.binders, this.component.binders);
    }
    if (this.component.formatters) {
      options.formatters = Utils.concat(false, options.formatters, this.component.formatters);
    }
    if (this.component.components) {
      options.components = Utils.concat(false, options.components, this.component.components);
    }
    if (this.component.adapters) {
      options.adapters = Utils.concat(false, options.adapters, this.component.adapters);
    }

    options.binders = Utils.concat(false, options.binders, this.view.options.binders);
    options.formatters = Utils.concat(false, options.formatters, this.view.options.formatters);
    options.components = Utils.concat(false, options.components, this.view.options.components);
    options.adapters = Utils.concat(false, options.adapters, this.view.options.adapters);

    options.prefix = this.component.prefix ? this.component.prefix : this.view.options.prefix;
    options.templateDelimiters = this.component.templateDelimiters ? this.component.templateDelimiters : this.view.options.templateDelimiters;
    options.rootInterface = this.component.rootInterface ? this.component.rootInterface : this.view.options.rootInterface;
    options.preloadData = this.component.preloadData ? this.component.preloadData : this.view.options.preloadData;
    options.handler = this.component.handler ? this.component.handler : this.view.options.handler;

    // get all starBinders from available binders
    if (options.binders) {
      options.starBinders = Object.keys(options.binders).filter((key) => {
        return key.indexOf('*') > 0;
      });
    }
    return (options as IViewOptions );
  }

  /**
   * Intercepts `riba.Binding::bind` to build `this.view` with a localized
   * map of models from the root view. Bind `this.view` on subsequent calls.
   */
  public bind() {
    if (!this.el._bound) {

      const innerHTML = this.component.template.call(this);
      // if innerHTML is null this component uses the innerHTML which he already has!
      if (innerHTML !== null) {
        this.el.innerHTML = innerHTML;
      }

      /**
       * there's a cyclic dependency that makes imported View a dummy object. Use riba.bind
       */
      const scope = this.component.initialize.call(this, this.el, this.locals());
      this.view = new View(Array.prototype.slice.call(this.el.childNodes), scope, this.getMergedOptions());
      this.view.bind();

      this.el._bound = true;
    } else {
      this.view.bind();
    }
  }

  public parseTarget() {

    // parse component attributes
    for (let i = 0, len = this.el.attributes.length; i < len; i++) {
      const attribute = this.el.attributes[i];

      // if attribute starts not with binding prefix. E.g. rv-
      if (attribute.name.indexOf(this.bindingPrefix) !== 0) {
        const propertyName = camelCase(attribute.name);
        const declaration = attribute.value;
        const parsedDeclaration = parseDeclaration(declaration);

        if (parsedDeclaration.pipes.length > 0) {
          console.warn('Formatters on component arguments not supported for the moment', parsedDeclaration.pipes);
        }

        this.pipes[propertyName] = parsedDeclaration.pipes;

        const token = parseType(parsedDeclaration.keypath);

        // if component force this propertyName as static
        if (typeof(this.component.static) !== 'undefined' && this.component.static.indexOf(propertyName) !== -1) {
          this.static[propertyName] = attribute.value;
        } else if (token.type === PRIMITIVE) {
          this.static[propertyName] = token.value;
        } else if (token.type === KEYPATH) {
          this.keypaths[propertyName] = attribute.value;
          this.observers[propertyName] = this.observe(this.view.models, this.keypaths[propertyName], this);
          // model biding is called in this.sync!!
        } else {
          throw new Error('can\'t parse component attribute');
        }
      }
    }
  }

  // FORMATTERS TODO

  /**
   *
   * @param args parses the formatters in arguments
   * @param formatterIndex
   */
  // parseFormatterArgumentsProperty(args: string[], formatterIndex: number, propertyName: string): string[] {
  //   return args
  //   .map(parseType)
  //   .map(({type, value}, ai) => {
  //     if (type === PRIMITIVE) {
  //       const primitiveValue = value;
  //       return primitiveValue;
  //     } else if (type === KEYPATH) {
  //       console.log('TODO', propertyName);
  //       // keypath is string
  //       const keypath = (value as string );
  //       if (!this.formattersObservers[propertyName]) {
  //         this.formattersObservers[propertyName] = {};
  //       }
  //       if (!this.formattersObservers[propertyName][formatterIndex]) {
  //         this.formattersObservers[propertyName][formatterIndex] = {};
  //       }

  //       let observer = this.formattersObservers[propertyName][formatterIndex][ai];

  //       if (!observer) {
  //         observer = this.observe(this.view.models, keypath, this);
  //         this.formattersObservers[propertyName][formatterIndex][ai] = observer;
  //       }
  //       return observer.value();
  //     } else {
  //       throw new Error('Unknown argument type');
  //     }
  //   });
  // }

  /**
   * Applies all the current formatters to the supplied value and returns the
   * formatted value.
   */
  // formattedValues(value: any, propertyName: string) {
  //   if(this.pipes[propertyName] === null) {
  //     throw new Error('formatters is null');
  //   }
  //   return this.pipes[propertyName].reduce((result: any/*check type*/, declaration: string /*check type*/, index: number) => {
  //     let args = declaration.match(Binding.FORMATTER_ARGS);
  //     if(args === null) {
  //       throw new Error('No args matched from FORMATTER_ARGS');
  //     }
  //     let id = args.shift();
  //     if(!id) {
  //       throw new Error('No id found in args');
  //     }
  //     let formatter = this.view.options.formatters[id];

  //     const processedArgs = this.parseFormatterArgumentsProperty(args, index, propertyName);

  //     if (formatter && (formatter.read instanceof Function)) {
  //       result = formatter.read(result, ...processedArgs);
  //     } else if (formatter instanceof Function) {
  //       result = formatter(result, ...processedArgs);
  //     }
  //     return result;
  //   }, value);
  // }

  /**
   * Intercept `riba.Binding::unbind` to be called on `this.view`.
   */
  public unbind() {
    Object.keys(this.observers).forEach((propertyName) => {
      this.observers[propertyName].unobserve();
    });

    Object.keys(this.formattersObservers).forEach((propertyName) => {
      Object.keys(this.formattersObservers[propertyName]).forEach((formatterIndex) => {
        Object.keys(this.formattersObservers[propertyName][formatterIndex]).forEach((ai) => {
          this.formattersObservers[propertyName][formatterIndex][ai].unobserve();
        });
      });
    });

    if (this.view) {
      this.view.unbind.call(this);
    }
  }
}
