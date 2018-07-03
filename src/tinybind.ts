import { mergeObject } from './utils';
import { parseTemplate, parseType, ITokens } from './parsers';
import { IFormatters, FormatterService } from './formatter.service';
import { compareFormatters, mathFormatters, propertyFormatters, specialFormatters, stringFormatters } from './formatters';
import { Binding } from './binding';
import { adapter } from './adapter';

import { basicBinders, routerBinders } from './binders';
import { IBinders, BindersService } from './binder.service';
import { View } from './view';
import { IAdapters } from './adapter';
import { Observer, Root } from './observer';
import { IComponents, ComponentService } from './component.service';

interface IExtensions {
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
  templateDelimiters?: Array<string>

  /** Augment the event handler of the on-* binder */
  handler?: Function;
}

export declare interface IOptionsParam extends IExtensions, IOptions {}

export declare interface IViewOptions extends IOptionsParam {
  starBinders: any;
  // sightglass
  rootInterface: Root;
}

export class Tinybind {

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
  public adapters: IAdapters = {
    '.': adapter,
  };
 
  /** Default attribute prefix. */
  private _prefix = 'rv';

  /** Default attribute full prefix. */
  private _fullPrefix = 'rv-';

  get prefix() {
    return this._prefix;
  };

  get fullPrefix() {
    return this._fullPrefix;
  };

  set prefix(value) {
    this._prefix = value;
    this._fullPrefix = value + '-';
  };

  public parseTemplate = parseTemplate;

  public parseType = parseType;

  /** Default template delimiters. */
  public templateDelimiters = ['{', '}'];

  /** Default sightglass root interface. */
  public rootInterface = '.';


  /** Preload data by default. */
  public preloadData = true;

  constructor() {
    this.binderService = new BindersService(this.binders);
    this.componentService = new ComponentService(this.components);
    this.formatterService = new FormatterService(this.formatters);
  }

  /**
   * Default event handler.
   */
  public static handler(this: any, context: any, ev: Event, binding: Binding) {
    this.call(context, ev, binding.view.models);
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

  /**
   * Merges an object literal into the corresponding global options.
   * @param options 
   */
  public configure(options: any) {
    if (!options) {
      return;
    }

    Object.keys(options).forEach(option => {
      let value = options[option];
      switch(option) {
        case 'binders':
          mergeObject(this.binders, value);
        break;
        case 'formatters':
          mergeObject(this.formatters, value);
        break;
        case 'components':
          mergeObject(this.components, value);
        break;
        case 'adapters':
          mergeObject(this.adapters, value);
        break;
        case 'adapter':
          mergeObject(this.adapters, value);
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
    let scope = component.initialize.call(this, el, data);

    let view = this.bind(el, scope);
    view.bind();
    return view;
  }

  /**
   * Binds some data to a template / element. Returns a tinybind.View instance.
   */
  bind(el: HTMLElement, models: any, options?: IOptionsParam) {
    let viewOptions: IViewOptions = {
      // EXTENSIONS
      binders: <IBinders<any>> Object.create(null),
      formatters: <IFormatters> Object.create(null),
      components: <IComponents> Object.create(null),
      adapters: <IAdapters> Object.create(null),
      // other
      starBinders: Object.create(null),
      // sightglass
      rootInterface: <Root> Object.create(null),
    };
    models = models || Object.create(null);
    // options = options || {};

    if(options) {
      mergeObject(viewOptions.binders, options.binders);
      mergeObject(viewOptions.formatters, options.formatters);
      mergeObject(viewOptions.components, options.components);
      mergeObject(viewOptions.adapters, options.adapters);
    }

    viewOptions.prefix = options && options.prefix ? options.prefix : tinybind.prefix
    viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : tinybind.templateDelimiters
    viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : tinybind.rootInterface
    viewOptions.preloadData = options && options.preloadData ? options.preloadData : tinybind.preloadData
    viewOptions.handler = options && options.handler ? options.handler : Tinybind.handler

    // merge extensions
    mergeObject(viewOptions.binders, tinybind.binders);
    mergeObject(viewOptions.formatters, tinybind.formatters);
    mergeObject(viewOptions.components, tinybind.components);
    mergeObject(viewOptions.adapters, tinybind.adapters);

    // get all starBinders from available binders
    viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
      return key.indexOf('*') > 0;
    });

    Observer.updateOptions(viewOptions);

    let view = new View(el, models, viewOptions);
    view.bind();
    return view;
  }
};

// Global tinybind object
const tinybind = new Tinybind();

// regist binders
tinybind.binderService.regists(basicBinders);
tinybind.binderService.regists(routerBinders);

// regist formatters
tinybind.formatterService.regists(compareFormatters);
tinybind.formatterService.regists(mathFormatters);
tinybind.formatterService.regists(propertyFormatters);
tinybind.formatterService.regists(specialFormatters);
tinybind.formatterService.regists(stringFormatters);

export { tinybind };
export default tinybind;
