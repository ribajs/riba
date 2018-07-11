import { Utils } from './utils';
import { parseTemplate, parseType } from './parsers';
import { IFormatters, FormatterService } from './formatter.service';
import { Binding, IBindable } from './binding';
import { adapter } from './adapter';

import { IBinders, BindersService } from './binder.service';
import { View } from './view';
import { IAdapters } from './adapter';
import { Observer, Root } from './observer';
import { IComponents, ComponentService } from './component.service';

export interface IExtensions {
  binders: IBinders<any>;
  formatters: IFormatters;
  components: IComponents;
  adapters: IAdapters;
}

export interface IOptions {
  /** Attribute prefix in templates */
  prefix?: string;

  /** Preload templates with initial data on bind */
  preloadData?: boolean;

  /** Root sightglass interface for keypaths */
  rootInterface?: string;

  /** Template delimiters for text bindings */
  templateDelimiters?: Array<string>;

  /** Augment the event handler of the on-* binder */
  handler?: (this: any, context: any, ev: Event, binding: Binding, el: HTMLElement) => void;
}

export declare interface IOptionsParam extends IExtensions, IOptions {}

export declare interface IViewOptions extends IOptionsParam {
  starBinders: any;
  // sightglass
  rootInterface: Root;
}

export class Tinybind {

  /**
   * Default event handler, calles the function defined in his binder
   * @see Binding.eventHandler
   * @param el The element the event was triggered from
   */
  public static handler(this: any, context: any, ev: Event, binding: Binding, el: HTMLElement) {
    this.call(context, ev, binding.view.models, el);
  }

  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
  public static fallbackBinder(this: Binding, el: HTMLElement, value: any) {
    if (!this.type) {
      throw new Error('Can\'t set atttribute of ' + this.type);
    }
    if (value != null) {
      el.setAttribute(this.type, value);
    } else {
      el.removeAttribute(this.type);
    }
  }

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

  constructor() {
    this.binderService = new BindersService(this.binders);
    this.componentService = new ComponentService(this.components);
    this.formatterService = new FormatterService(this.formatters);
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
        case 'prefix':
          this.prefix = value;
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
   * returns a tinybind.View instance.
   */
  public init(componentKey: string, el: HTMLElement, data = {}) {
    if (!el) {
      el = document.createElement('div');
    }

    const component = this.components[componentKey];
    el.innerHTML = component.template.call(this, el);
    const scope = component.initialize.call(this, el, data);

    const view = this.bind(el, scope);
    view.bind();
    return view;
  }

  public getViewOptions(options?: IOptionsParam) {
    const viewOptions: IViewOptions = {
      // EXTENSIONS
      adapters: <IAdapters> Object.create(null),
      binders: <IBinders<any>> Object.create(null),
      components: <IComponents> Object.create(null),
      formatters: <IFormatters> Object.create(null),

      // other
      starBinders: Object.create(null),

      // sightglass
      rootInterface: <Root> Object.create(null),
    };

    if (options) {
      viewOptions.binders = Utils.concat(false, viewOptions.binders, options.binders);
      viewOptions.formatters = Utils.concat(false, viewOptions.formatters, options.formatters);
      viewOptions.components = Utils.concat(false, viewOptions.components, options.components);
      viewOptions.adapters = Utils.concat(false, viewOptions.adapters, options.adapters);
    }

    viewOptions.prefix = options && options.prefix ? options.prefix : this.prefix;
    viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : this.templateDelimiters;
    viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : this.rootInterface;
    viewOptions.preloadData = options && options.preloadData ? options.preloadData : this.preloadData;
    viewOptions.handler = options && options.handler ? options.handler : Tinybind.handler;

    // merge extensions
    viewOptions.binders = Utils.concat(false, viewOptions.binders, this.binders);
    viewOptions.formatters = Utils.concat(false, viewOptions.formatters, this.formatters);
    viewOptions.components = Utils.concat(false, viewOptions.components, this.components);
    viewOptions.adapters = Utils.concat(false, viewOptions.adapters, this.adapters);

    // get all starBinders from available binders
    viewOptions.starBinders = Object.keys(viewOptions.binders).filter((key) => {
      return key.indexOf('*') > 0;
    });

    return viewOptions;
  }

  /**
   * Binds some data to a template / element. Returns a tinybind.View instance.
   */
  public bind(el: HTMLElement, models: any, options?: IOptionsParam) {
    const viewOptions: IViewOptions = this.getViewOptions(options);

    models = models || Object.create(null);
    Observer.updateOptions(viewOptions);

    const view = new View(el, models, viewOptions);
    view.bind();
    return view;
  }
}
