import {
  Formatters,
  Binders,
  Adapters,
  Root,
  Components,
  Options
} from "./interfaces";
import { Utils } from "./services/utils";
import { parseTemplate, parseType } from "./parsers";
import { Binding } from "./binding";
import { starBinder } from "./binders/attribute.binder";

import { View } from "./view";
import { Observer } from "./observer";
import { ModulesService } from "./services/module.service";

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
  public static handler(
    this: any,
    context: any,
    ev: Event,
    binding: Binding,
    el: HTMLElement
  ) {
    this.call(context, ev, binding.view.models, el);
  }

  /** singleton instance */
  private static instance: Riba;

  public module: ModulesService;

  /** Global binders */
  public binders: Binders<any> = {};

  /** Global components. */
  public components: Components = {};

  /** Global formatters. */
  public formatters: Formatters = {};

  /** Global (sightglass) adapters. */
  public adapters: Adapters = {};

  public parseTemplate = parseTemplate;

  public parseType = parseType;

  /** Default template delimiters. */
  public templateDelimiters = ["{", "}"];

  /** Default sightglass root interface. */
  public rootInterface = ".";

  /** Preload data by default. */
  public preloadData = true;

  /** Remove binder attributes after binding */
  public removeBinderAttributes = true; // TODO fixme on false: Maximum call stack size exceeded

  /** Stop binding on this node types */
  public blockNodeNames = ["SCRIPT", "STYLE", "TEMPLATE", "CODE"];

  /** Default attribute prefix. */
  private _prefix = "rv";

  /** Default attribute full prefix. */
  private _fullPrefix = "rv-";

  set prefix(value) {
    this._prefix = value;
    this._fullPrefix = value + "-";
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
    this.module = new ModulesService(
      this.binders,
      this.components,
      this.formatters,
      this.adapters
    );
    if (Riba.instance) {
      return Riba.instance;
    }
    Riba.instance = this;
  }

  /**
   * Merges an object literal into the corresponding global options.
   * @param options
   */
  public configure(options: Partial<Options>) {
    if (!options) {
      return;
    }

    Object.keys(options).forEach(option => {
      const value = (options as any)[option];
      switch (option) {
        case "binders":
          this.binders = Utils.concat(false, this.binders, value);
          break;
        case "formatters":
          this.formatters = Utils.concat(false, this.formatters, value);
          break;
        case "components":
          this.components = Utils.concat(false, this.components, value);
          break;
        case "adapters":
          this.adapters = Utils.concat(false, this.adapters, value);
          break;
        case "prefix":
          this.prefix = value;
          break;
        case "parseTemplate":
          this.parseTemplate = value;
          break;
        case "parseType":
          this.parseType = value;
          break;
        case "templateDelimiters":
          this.templateDelimiters = value;
          break;
        case "rootInterface":
          this.rootInterface = value;
          break;
        case "preloadData":
          this.preloadData = value;
          break;
        case "blockNodeNames":
          this.blockNodeNames = value;
          break;
        default:
          console.warn("Option not supported", option, value);
          break;
      }
    });
  }

  public getViewOptions(options?: Partial<Options>) {
    const viewOptions: Partial<Options> = {
      // EXTENSIONS
      adapters: {} as Adapters,
      binders: {} as Binders<any>,
      components: {} as Components,
      formatters: {} as Formatters,

      // other
      starBinders: {},

      // sightglass
      rootInterface: {} as Root
    };

    if (options) {
      viewOptions.binders = Utils.concat(
        false,
        viewOptions.binders,
        options.binders
      );
      viewOptions.formatters = Utils.concat(
        false,
        viewOptions.formatters,
        options.formatters
      );
      viewOptions.components = Utils.concat(
        false,
        viewOptions.components,
        options.components
      );
      viewOptions.adapters = Utils.concat(
        false,
        viewOptions.adapters,
        options.adapters
      );
    }

    viewOptions.prefix =
      options && options.prefix ? options.prefix : this.prefix;
    viewOptions.fullPrefix = viewOptions.prefix
      ? viewOptions.prefix + "-"
      : this.fullPrefix;

    viewOptions.templateDelimiters =
      options && options.templateDelimiters
        ? options.templateDelimiters
        : this.templateDelimiters;
    viewOptions.rootInterface =
      options && options.rootInterface
        ? options.rootInterface
        : this.rootInterface;
    viewOptions.removeBinderAttributes =
      options && typeof options.removeBinderAttributes === "boolean"
        ? options.removeBinderAttributes
        : this.removeBinderAttributes;
    viewOptions.blockNodeNames =
      options && options.blockNodeNames
        ? options.blockNodeNames
        : this.blockNodeNames;
    viewOptions.preloadData =
      options && typeof options.preloadData === "boolean"
        ? options.preloadData
        : this.preloadData;
    viewOptions.handler =
      options && options.handler ? options.handler : Riba.handler;

    // merge extensions
    viewOptions.binders = Utils.concat(
      false,
      this.binders,
      viewOptions.binders
    );
    viewOptions.formatters = Utils.concat(
      false,
      this.formatters,
      viewOptions.formatters
    );
    viewOptions.components = Utils.concat(
      false,
      this.components,
      viewOptions.components
    );
    viewOptions.adapters = Utils.concat(
      false,
      this.adapters,
      viewOptions.adapters
    );

    // get all starBinders from available binders
    if (viewOptions.binders) {
      viewOptions.starBinders = Object.keys(viewOptions.binders).filter(key => {
        return key.indexOf("*") >= 1; // Should start with *
      });
    }

    return viewOptions as Options;
  }

  /**
   * Binds some data to a template / element. Returns a riba.View instance.
   */
  public bind(
    el: HTMLElement | DocumentFragment | HTMLUnknownElement[],
    models: any,
    options?: Options
  ) {
    const viewOptions: Options = this.getViewOptions(options);

    models = models || new Object(null);
    Observer.updateOptions(viewOptions);

    const view = new View(el, models, viewOptions);
    view.bind();
    return view;
  }
}

(window as any).Riba = Riba;
