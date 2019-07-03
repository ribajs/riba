import {
  IModuleFormatters,
  IModuleBinders,
  IBinder,
  IAdapters,
  Root,
  IComponents,
  IOptionsParam,
  IViewOptions,
} from './interfaces';
import { Utils } from './services/utils';
import { parseTemplate, parseType } from './parsers';
import { Binding } from './binding';
import { adapter } from './adapter';
import { starBinder } from './binders/star.binder';

import { View } from './view';
import { Observer } from './observer';
import { ModulesService } from './services/module.service';

export class Riba {

  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
  public static fallbackBinder = starBinder;

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

  public module: ModulesService;

  /** Global binders */
  public binders: IModuleBinders<any> = {};

  /** Global components. */
  public components: IComponents = {};

  /** Global formatters. */
  public formatters: IModuleFormatters = {};

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
    this.module = new ModulesService(this.binders, this.components, this.formatters);
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

  public getViewOptions(options?: IOptionsParam) {
    const viewOptions: IOptionsParam = {
      // EXTENSIONS
      adapters: <IAdapters> {},
      binders: <IModuleBinders<any>> {},
      components: <IComponents> {},
      formatters: <IModuleFormatters> {},

      // other
      starBinders: {},

      // sightglass
      rootInterface: <Root> {},

      // Remove binder attributes after binding
      removeBinderAttributes: true, // TODO fixme on false: Maximum call stack size exceeded

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
  public bind(el: HTMLElement | DocumentFragment | HTMLUnknownElement[], models: any, options?: IOptionsParam) {
    const viewOptions: IViewOptions = this.getViewOptions(options);

    models = models || new Object(null);
    Observer.updateOptions(viewOptions);

    const view = new View(el, models, viewOptions);
    view.bind();
    return view;
  }
}
