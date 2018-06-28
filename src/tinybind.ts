import { EXTENSIONS } from './constants';
import { parseTemplate, parseType } from './parsers';
import { IFormatters, formatters } from './formatters';
import { Binding } from './binding';
import adapter from './adapter';
import binders from './binders';
import { View } from './view';
import { IAdapters } from './adapter';
import { IBinders } from './binders';
import { Observer, Root } from './observer';
import { IComponents } from './components';

export interface IOptions {
  // Attribute prefix in templates
  prefix?: string;

  //Preload templates with initial data on bind
  preloadData?: boolean;

  //Root sightglass interface for keypaths
  rootInterface?: string;

  // Template delimiters for text bindings
  templateDelimiters?: Array<string>

  // Augment the event handler of the on-* binder
  handler?: Function;
}

export interface IExtensions {
  binders: IBinders<any>;
  formatters: IFormatters;
  components: IComponents;
  adapters: IAdapters;
}

export interface IOptionsParam extends IExtensions, IOptions {}

export interface IViewOptions extends IOptionsParam {
  starBinders: any;
  // sightglass
  rootInterface: Root;
}

// TODO move to uitils
const mergeObject = (target: any, obj: any) => {
  Object.keys(obj).forEach(key => {
    if (!target[key] || target[key] === {}) {
      target[key] = obj[key];
    }
  });
  return target; 
};

const tinybind = {
  // Global binders.
  binders: binders,

  // Global components.
  components: {},

  // Global formatters.
  formatters: <IFormatters> formatters,

  // Global sightglass adapters.
  adapters: {
    '.': adapter,
  },

  // Default attribute prefix.
  _prefix: 'rv',

  _fullPrefix: 'rv-',

  get prefix () {
    return this._prefix;
  },

  set prefix (value) {
    this._prefix = value;
    this._fullPrefix = value + '-';
  },

  parseTemplate: parseTemplate,

  parseType: parseType,

  // Default template delimiters.
  templateDelimiters: ['{', '}'],

  // Default sightglass root interface.
  rootInterface: '.',

  // Preload data by default.
  preloadData: true,

  /**
   * Default event handler.
   * TODO is this used?
   */
  handler(context: any, ev: Event, binding: Binding) {
    // console.warn('yes it is used');
    this.call(context, ev, binding.view.models);
  },

  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
  fallbackBinder(el: HTMLElement, value) {
    if (value != null) {
      el.setAttribute(this.type, value);
    } else {
      el.removeAttribute(this.type);
    }  
  },

  // Merges an object literal into the corresponding global options.
  configure(options) {
    if (!options) {
      return;
    }

    // mergeObject(this.binders, options.binders);
    // mergeObject(this.formatters, options.formatters);
    // mergeObject(this.components, options.components);
    // mergeObject(this.adapters, options.adapters);

    Object.keys(options).forEach(option => {
      let value = options[option];

      if (EXTENSIONS.indexOf(option) > -1) {
        Object.keys(value).forEach(key => {
          this[option][key] = value[key];
        });
      } else {
        this[option] = value;
      }
    });
  },

  // Initializes a new instance of a component on the specified element and
  // returns a tinybind.View instance.	
  init: (componentKey: string, el: HTMLElement, data = {}) => {
    if (!el) {
      el = document.createElement('div');
    }

    const component = tinybind.components[componentKey];
    el.innerHTML = component.template.call(tinybind, el);
    let scope = component.initialize.call(tinybind, el, data);

    let view = tinybind.bind(el, scope);
    view.bind();
    return view;
  },

  // Binds some data to a template / element. Returns a tinybind.View instance.
  bind: (el: HTMLElement, models: any, options?: IOptionsParam) => {
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
    viewOptions.handler = options && options.handler ? options.handler : tinybind.handler

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
  },
};

export default tinybind;
