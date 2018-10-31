import { Utils } from './utils';
import { parseTemplate, parseType } from './parsers';
import { IFormatters, FormatterService } from './services/formatter.service';
import { Binding } from './binding';
import { adapter } from './adapter';

import { IBinders, BindersService, ITwoWayBinder } from './services/binder.service';
import { View } from './view';
import { IAdapters } from './adapter';
import { Observer, Root } from './observer';
import { IClassicComponent, IComponents, ComponentService } from './services/component.service';

export interface IExtensions {
  binders?: IBinders<any>;
  formatters?: IFormatters;
  components?: IComponents;
  adapters?: IAdapters;
}

/**
 * Event handler to liste for publish binder event for two-way-binding in web components
 */
const publishBinderChangeEventHandler = function(this: any, event: Event) {
  const data = ( event as CustomEvent ).detail;
  const oldValue = this.observer.value();
  if (oldValue !== data.newValue) {
    // TODO this overwrites also the _rv counter
    this.observer.setValue(data.newValue);
  }
};

/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
export const fallbackBinder: ITwoWayBinder<string> = {
  bind(el) {
    // Listen for changes from web component
    el.addEventListener('publish-binder-change:' + this.type, publishBinderChangeEventHandler.bind(this));
  },

  unbind(el: HTMLElement) {
    delete this.customData;
    this.el.removeEventListener('publish-binder-change', publishBinderChangeEventHandler.bind(this));
  },

  routine(el: HTMLElement, newValue: string) {
    if (!this.type) {
      throw new Error('Can\'t set attribute of ' + this.type);
    }

    const oldValue = el.getAttribute(this.type);

    if (newValue != null) {
      if (oldValue !== newValue) {
        el.setAttribute(this.type, newValue);
      }
    } else {
      el.removeAttribute(this.type);
    }

    if (oldValue !== newValue) {
      // Fallback for MutationObserver and attributeChangedCallback: Trigger event to catch them in web components to call the attributeChangedCallback method
      el.dispatchEvent(new CustomEvent('binder-changed', { detail: {
        name: this.type,
        oldValue,
        newValue,
        namespace: null, // TODO
      }}));
    }
  },
};

/** Interface for the event handler, augment the event handler of the on-* binder */
export type EventHandler = (this: any, context: Binding, ev: Event, binding: Binding, el: HTMLElement) => void;

export interface IOptions {
  /** Attribute / web-component prefix in templates */
  prefix?: string;

  /** Attribute/ web-component  prefix + '-' */
  fullPrefix?: string;

  /** Preload templates with initial data on bind */
  preloadData?: boolean;

  /** Root sightglass interface for keypaths */
  rootInterface?: string;

  /** Template delimiters for text bindings */
  templateDelimiters?: Array<string>;

  /** Augment the event handler of the on-* binder */
  handler?: EventHandler;

  starBinders?: any;

  removeBinderAttributes?: boolean;

  executeFunctions?: boolean;
}

export declare interface IOptionsParam extends IExtensions, IOptions {}

export declare interface IViewOptions extends IOptionsParam {
  binders: IBinders<any>;
  formatters: IFormatters;
  components: IComponents;
  adapters: IAdapters;

  /** Attribute / web-component prefix in templates */
  prefix: string;

  /** Attribute/ web-component  prefix + '-' */
  fullPrefix: string;

  /** Preload templates with initial data on bind */
  preloadData: boolean;

  /** Root sightglass interface for keypaths */
  rootInterface: string;

  /** Template delimiters for text bindings */
  templateDelimiters?: Array<string>;

  /** Augment the event handler of the on-* binder */
  handler?: EventHandler;
  starBinders: any;

  removeBinderAttributes: boolean;

  executeFunctions: boolean;
}

export class Riba {

  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
  public static fallbackBinder = fallbackBinder;

  /**
   * Default event handler, calles the function defined in his binder
   * @see Binding.eventHandler
   * @param el The element the event was triggered from
   */
  public static handler(this: any, context: any, ev: Event, binding: Binding, el: HTMLElement) {
    this.call(context, ev, binding.view.models, el);
  }

  /** singleton instance */
  private static instance: Riba;

  public binderService: BindersService;

  public componentService: ComponentService;

  public formatterService: FormatterService;

  /** Global binders */
  public binders: IBinders<any> = {};

  /** Global components. */
  public components: IComponents = {};

  /** Global formatters. */
  public formatters: IFormatters = {};

  /** Global (sightglass) adapters. */
  public  adapters: IAdapters = {
    '.': adapter,
  };

  public parseTemplate = parseTemplate;

  public parseType = parseType;

  /** Default template delimiters. */
  public templateDelimiters = ['{', '}'];

  /** Default sightglass root interface. */
  public rootInterface = '.';

  /** Preload data by default. */
  public preloadData = true;

  /** Default attribute prefix. */
  private _prefix = 'rv';

  /** Default attribute full prefix. */
  private _fullPrefix = 'rv-';

  set prefix(value) {
    this._prefix = value;
    this._fullPrefix = value + '-';
  }

  get prefix() {
    return this._prefix;
  }

  get fullPrefix() {
    return this._fullPrefix;
  }

  /**
   * Creates an singleton instance of Riba.
   */
  constructor() {
    this.binderService = new BindersService(this.binders);
    this.componentService = new ComponentService(this.components);
    this.formatterService = new FormatterService(this.formatters);
    if (Riba.instance) {
      return Riba.instance;
    }
    Riba.instance = this;
  }

  /**
   * Merges an object literal into the corresponding global options.
   * @param options
   */
  public configure(options: any) {
    if (!options) {
      return;
    }

    Object.keys(options).forEach( (option) => {
      const value = options[option];
      switch (option) {
        case 'binders':
          this.binders = Utils.concat(false, this.binders, value);
          break;
        case 'formatters':
          this.formatters = Utils.concat(false, this.formatters, value);
          break;
        case 'components':
          this.components = Utils.concat(false, this.components, value);
          break;
        case 'adapters':
          this.adapters = Utils.concat(false, this.adapters, value);
          break;
        case 'adapter':
          this.adapters = Utils.concat(false, this.adapters, value);
          break;
        case 'prefix':
          this.prefix = value;
          break;
        case 'parseTemplate':
          this.parseTemplate = value;
          break;
        case 'parseType':
          this.parseType = value;
          break;
        case 'templateDelimiters':
          this.templateDelimiters = value;
          break;
        case 'rootInterface':
          this.rootInterface = value;
          break;
        case 'preloadData':
          this.preloadData = value;
          break;
        default:
          console.warn('Option not supported', option, value);
          break;
      }
    });
  }

  /**
   * Initializes a new instance of a component on the specified element and
   * returns a riba.View instance.
   */
  public init(componentKey: string, el: HTMLElement, data = {}) {
    if (!el) {
      el = document.createElement('div');
    }

    // Component is depricated component
    if (this.components[componentKey].hasOwnProperty('initialize') && this.components[componentKey].hasOwnProperty('template')) {
      const component = (this.components[componentKey] as IClassicComponent<any>);
      const template = component.template.call(this, el);
      if (template !== null) {
        el.innerHTML = template;
      }
      const scope = component.initialize.call(this, el, data);

      const view = this.bind(el, scope);
      view.bind();
      return view;
    }
  }

  public getViewOptions(options?: IOptionsParam) {
    const viewOptions: IOptionsParam = {
      // EXTENSIONS
      adapters: <IAdapters> {},
      binders: <IBinders<any>> {},
      components: <IComponents> {},
      formatters: <IFormatters> {},

      // other
      starBinders: {},

      // sightglass
      rootInterface: <Root> {},

      // Remove binder attributes after binding
      removeBinderAttributes: true, // TODO fixme on false: Maximum call stack size exceeded

      // Execute functions in bindings. Defaultis false since rivets 0.9. Set to true to be backward compatible with rivets 0.8.
      executeFunctions: false,
    };

    if (options) {
      viewOptions.binders = Utils.concat(false, viewOptions.binders, options.binders);
      viewOptions.formatters = Utils.concat(false, viewOptions.formatters, options.formatters);
      viewOptions.components = Utils.concat(false, viewOptions.components, options.components);
      viewOptions.adapters = Utils.concat(false, viewOptions.adapters, options.adapters);
    }

    viewOptions.prefix = options && options.prefix ? options.prefix : this.prefix;
    viewOptions.fullPrefix = viewOptions.prefix ? viewOptions.prefix + '-' : this.fullPrefix;
    viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : this.templateDelimiters;
    viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : this.rootInterface;
    viewOptions.preloadData = options && options.preloadData ? options.preloadData : this.preloadData;
    viewOptions.handler = options && options.handler ? options.handler : Riba.handler;

    // merge extensions
    viewOptions.binders = Utils.concat(false, this.binders, viewOptions.binders);
    viewOptions.formatters = Utils.concat(false, this.formatters, viewOptions.formatters);
    viewOptions.components = Utils.concat(false, this.components, viewOptions.components);
    viewOptions.adapters = Utils.concat(false, this.adapters, viewOptions.adapters);

    // get all starBinders from available binders
    if (viewOptions.binders) {
      viewOptions.starBinders = Object.keys(viewOptions.binders).filter((key) => {
        return key.indexOf('*') >= 1; // Should ot start with *
      });
    }

    return (viewOptions as IViewOptions);
  }

  /**
   * Binds some data to a template / element. Returns a riba.View instance.
   */
  public bind(el: HTMLElement, models: any, options?: IOptionsParam) {
    const viewOptions: IViewOptions = this.getViewOptions(options);

    models = models || new Object(null);
    Observer.updateOptions(viewOptions);

    const view = new View(el, models, viewOptions);
    view.bind();
    return view;
  }
}
