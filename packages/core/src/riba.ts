import {
  Formatters,
  Binders,
  Adapters,
  Root,
  Components,
  Options,
} from "./types";
import { parseTemplate, parseType } from "./parsers";
import { Binding } from "./binding";
import { attributeBinder } from "./binders/attribute.binder";

import { View } from "./view";
import { Observer } from "./observer";
import { ModulesService } from "./services/module.service";
import { LifecycleService } from "./services/lifecycle.service";

export class Riba {
  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
  public static fallbackBinder = attributeBinder;

  /**
   * Default event handler, calls the function defined in his binder
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
    if (!this || !this.call) {
      const error = new Error(
        `[rv-${binding.type}="${binding.keypath}"] Event handler "${binding.keypath}" not found!"`
      );
      console.error(error, binding, el, binding.view.models);
      throw error;
    }
    this.call(context, ev, binding.view.models, el);
  }

  /** singleton instance */
  private static instance: Riba;

  public module: ModulesService;

  public lifecycle = LifecycleService.getInstance();

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

  public blockUnknownCustomElements = true;

  /** Default attribute prefix. */
  private _prefix: string[] = ["rv"];

  /** Default attribute full prefix. */
  private _fullPrefix: string[] = ["rv-"];

  set prefix(value: string[]) {
    if (Array.isArray(value)) {
      this._prefix = [];
      this._fullPrefix = [];
      for (const val of value) {
        this._prefix.push(val);
        this._fullPrefix.push(val + "-");
      }
    }
  }

  get prefix(): string[] {
    return this._prefix;
  }

  get fullPrefix(): string[] {
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

    for (const [option, value] of Object.entries(options)) {
      switch (option) {
        case "binders":
          this.binders = { ...this.binders, ...value };
          break;
        case "formatters":
          this.formatters = { ...this.formatters, ...value };
          break;
        case "components":
          this.components = { ...this.components, ...value };
          break;
        case "adapters":
          this.adapters = { ...this.adapters, ...value };
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
        case "blockUnknownCustomElements":
          this.blockUnknownCustomElements = Boolean(value);
          break;
        default:
          console.warn("Option not supported", option, value);
          break;
      }
    }
  }

  public getViewOptions(options?: Partial<Options>) {
    const viewOptions: Partial<Options> = {
      // EXTENSIONS
      adapters: {} as Adapters,
      binders: {} as Binders<any>,
      components: {} as Components,
      formatters: {} as Formatters,

      // other
      attributeBinders: {},

      // sightglass
      rootInterface: {} as Root,
    };

    if (options) {
      viewOptions.binders = { ...viewOptions.binders, ...options.binders };
      viewOptions.formatters = {
        ...viewOptions.formatters,
        ...options.formatters,
      };
      viewOptions.components = {
        ...viewOptions.components,
        ...options.components,
      };
      viewOptions.adapters = {
        ...viewOptions.adapters,
        ...options.adapters,
      };
    }

    // Prefix
    if (options?.prefix && Array.isArray(options?.prefix)) {
      viewOptions.prefix = [];
      viewOptions.fullPrefix = [];
      for (const prefix of options.prefix) {
        viewOptions.prefix.push(prefix);
        viewOptions.fullPrefix.push(prefix + "-");
      }
    } else {
      viewOptions.prefix = this.prefix;
      viewOptions.fullPrefix = this.fullPrefix;
    }

    viewOptions.templateDelimiters =
      options?.templateDelimiters || this.templateDelimiters;
    viewOptions.rootInterface = options?.rootInterface || this.rootInterface;
    viewOptions.removeBinderAttributes =
      typeof options?.removeBinderAttributes === "boolean"
        ? options.removeBinderAttributes
        : this.removeBinderAttributes;
    viewOptions.blockNodeNames = options?.blockNodeNames || this.blockNodeNames;
    viewOptions.preloadData =
      typeof options?.preloadData === "boolean"
        ? options.preloadData
        : this.preloadData;
    viewOptions.handler = options?.handler || Riba.handler;

    // merge extensions
    viewOptions.binders = { ...this.binders, ...viewOptions.binders };
    viewOptions.formatters = { ...this.formatters, ...viewOptions.formatters };
    viewOptions.components = { ...this.components, ...viewOptions.components };
    viewOptions.adapters = { ...this.adapters, ...viewOptions.adapters };

    // get all attributeBinders from available binders
    if (viewOptions.binders) {
      viewOptions.attributeBinders = Object.keys(viewOptions.binders).filter(
        (key) => key.indexOf("*") >= 1 // Should contain, but not start with, *
      );
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

    models = models || Object.create(null);
    Observer.updateOptions(viewOptions);

    const view = new View(el, models, viewOptions);
    view.bind();
    return view;
  }
}

(window as any).Riba = Riba;
